import Layout from '@/Components/Layout';
import axios from 'axios';
import React, { useState } from 'react';

const New = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };
        try {
            const response = await axios.post('/api/product', data);
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>

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
        </Layout>
    );
};

export default New;
