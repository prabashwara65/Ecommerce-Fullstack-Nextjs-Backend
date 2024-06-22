import Layout from '@/Components/Layout'
import ProductEditForm from '@/Components/ProductEditForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function EditProductPage(){
    const [ productInfo , setProductInfo] = useState(null);
    const router = useRouter();
    console.log({router})
    const {id} = router.query;
    useEffect(() => {

        if(!id){
            return;
        }
        axios.get('/api/product?id='+id).then(response => {
            

           setProductInfo(response.data)
       
        });
    },[id]);

    // if (!productInfo) {
    //     return (
    //       <Layout>
    //         <div>Loading...</div>
    //       </Layout>
    //     );
    //   }
    
  return (
    <Layout>

        <h1>Edit Product</h1>
        {productInfo && (
                <ProductEditForm {...productInfo}/>
            )}
        
        
    </Layout>
  );
}


