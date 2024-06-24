import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { mongooseConenct } from '@/lib/mongoose';
const bucketName = 'ecommerce-next-osla';

export default async function handle(req, res) {
    await mongooseConenct();
    
    await isAdminRequest(req , res)

    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    console.log('length:', files.file.length);
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const links = [];
    try {
        for (const file of files.file) {
            const ext = file.originalFilename.split('.').pop();
            const newFilename = Date.now() + '.' + ext;
            console.log({ ext, file });
            console.log({ newFilename });
            console.log(file.path);

            const fileStream = fs.createReadStream(file.path);
            const uploadParams = {
                Bucket: bucketName,
                Key: newFilename,
                Body: fileStream,
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            };

            await client.send(new PutObjectCommand(uploadParams));

            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }

        console.log(fields);
        return res.status(200).json({ links });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Error uploading file' });
    }
}

export const config = {
    api: { bodyParser: false },
};
