import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';

export default function ProductEditForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProduct, setGoToProduct] = useState(false);
    const router = useRouter();

    async function createProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };

        try {
            if (_id) {
                await axios.put('/api/product', { ...data, _id });
            } else {
                await axios.post('/api/product', data);
            }
            setGoToProduct(true);
        } catch (error) {
            console.error('Error creating/updating product:', error);
        }
    }

    if (goToProduct) {
        router.push('/products');
    }

    async function uploadImages(ev) {
        const files = ev.target.files;
        if (files.length > 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append('file', file);
            }

            try {
                const res = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Upload response:', res.data);
                // Handle response as needed (e.g., update state with uploaded file links)
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    }

    return (
        <form onSubmit={createProduct}>
            <label>Product Name</label>
            <input
                type='text'
                placeholder='product name'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />

            <label>Photos</label>
            <div>
                {!images?.length && <div className='mb-2'>No photos in this product </div>}
            </div>

            <label className='w-24 h-24 border text-center cursor-pointer flex items-center justify-center flex-col rounded-lg'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
                    />
                </svg>
                <div>Upload</div>
                <input type='file' className='hidden' onChange={uploadImages} />
            </label>

            <label>Description</label>
            <textarea
                placeholder='description'
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            />

            <label>Price</label>
            <input
                type='text'
                placeholder='price'
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />

            <button type='submit' className='btn-primary'>
                Save
            </button>
        </form>
    );
}
