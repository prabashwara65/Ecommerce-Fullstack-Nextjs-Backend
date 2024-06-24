import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function ProductEditForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignCategory,
    properties: assignProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [productProperties, setProductProperties] = useState(assignProperties || {})
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignCategory || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProduct, setGoToProduct] = useState(false);
    const [isuploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }, [])

    async function createProduct(ev) {
        ev.preventDefault();
        const data = {
            title, description, price, images, category,
            properties: productProperties,
        };

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
            setIsUploading(true)
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

                setImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });

                console.log('Upload response:', res.data);
                // Handle response as needed (e.g., update state with uploaded file links)
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
        setIsUploading(false)
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    const propertiesToFill = [];
    const visitedCategories = new Set();

    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        while (catInfo && !visitedCategories.has(catInfo._id)) {
            propertiesToFill.push(...catInfo.properties);
            visitedCategories.add(catInfo._id);
            catInfo = categories.find(({ _id }) => _id === catInfo?.parent?._id);
        }
    }

    console.log({ propertiesToFill });


    return (
        <form onSubmit={createProduct}>
            <label>Product Name</label>
            <input
                type='text'
                placeholder='product name'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />

            <label>Category</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value="" >Uncatogories</option>

                {categories.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                ))}

            </select>

            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div key={p.name} className=''>
                    <label>{p.name}</label>

                    <div>
                        <select
                            value={productProperties[p.name] || ''}
                            onChange={ev => setProductProp(p.name, ev.target.value)}
                        >
                            {p.values.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>

                </div>
            ))}


            <label>Photos</label>
            <div className='mb-2 flex flex-wrap gap-1'>
                {!!images?.length && images.map(link => (
                    <div key={link} className='h-24 bg-white p-4 shadown-sm rounded-sm border border-gray-200'>
                        <img src={link} alt='' className='rounded-lg' />
                    </div>
                ))}

                {isuploading && (
                    <div className='h-24 items-center'>
                        <Spinner />
                    </div>
                )}

                <label htmlFor="file-upload" className='w-24 h-24 border text-center cursor-pointer flex items-center justify-center flex-col rounded-lg'>
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
                </label>
                <input id="file-upload" type='file' className='hidden' onChange={uploadImages} />
            </div>

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
