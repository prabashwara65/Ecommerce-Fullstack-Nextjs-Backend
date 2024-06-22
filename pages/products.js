import Layout from '@/Components/Layout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Products = () => {

  const [products , setProducts] = useState([])

  useEffect(() =>{
    axios.get('/api/product').then(response =>{
      setProducts(response.data)
    })
  },[])

  return (
    <Layout>
        <Link className=" bg-blue-900 rounded-md text-white py-1 px-2" href={'./products/new'}>Add New Product</Link>
        <table>
          <thead>
            <tr>
              <td>Product Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product =>(
              <tr>
                <td>{product.title}</td>
                <td>
                  buttons
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>

  )
}

export default Products
