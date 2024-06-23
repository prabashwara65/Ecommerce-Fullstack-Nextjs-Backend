import multiparty from 'multiparty'
import { BucketType, PutObjectAclCommand, S3Client } from '@aws-sdk/client-s3';
import { mongooseConnect } from '@/lib/mongoose';
import fs from 'fs';
import mime from 'mime-types';

export default async function handle(req, res) {
    // await mongooseConnect();
    // await isAdminRequest(req, res);

    const bucketName = 'ecommerce-next-osla';

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
    })

    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop()
        const newFilename = Date.now() + '.' + ext;
        console.log({ext , file})
        console.log({newFilename})
        console.log(file.path)
        await client.send(new PutObjectAclCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path) || 'application/octet-stream',
        }))
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link)
    }

    console.log(fields)
    return res.json({links})

}

export const config = {
    api: { bodyParser: false },
}
