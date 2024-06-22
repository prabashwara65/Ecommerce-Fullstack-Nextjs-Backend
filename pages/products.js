import Layout from '@/Components/Layout'
import Link from 'next/link'
import React from 'react'

const Products = () => {
  return (
    <Layout>
        <Link className=" bg-blue-900 rounded-md text-white py-1 px-2" href={'./products/new'}>Add New Product</Link>
    </Layout>

  )
}

export default Products
