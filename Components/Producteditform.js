import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';

export default function ProductEditForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,

}) {

    
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProduct, setGoToProduct] = useState('');
    const router = useRouter();

    console.log(existingTitle)

    async function createProduct(ev) {
        ev.preventDefault();

        const data = { title, description, price };

        if (_id) {

            //Upadate
            await axios.put('/api/product', {...data,_id})

        } else {

            //Create
            
            const response = await axios.post('/api/product', data);
        }
        setGoToProduct(true);

    }

    if (goToProduct) {
        router.push('/products')
    }

    return (

        <form onSubmit={createProduct}>


            <label>Product Name</label>
            <input
                type='text'
                placeholder='product name'
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />

            <label>Description</label>
            <textarea
                placeholder='description'
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />

            <label>Price</label>
            <input
                type='text'
                placeholder='price'
                value={price}
                onChange={ev => setPrice(ev.target.value)}
            />

            <button type='submit' className='btn-primary'>Save</button>
        </form>
    )
}

