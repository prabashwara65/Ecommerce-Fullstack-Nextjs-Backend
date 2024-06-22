import Layout from '@/Components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function editProductPage(){
    const router = useRouter()
    const {id} = router.query;
    useEffect(() => {

        if(!id){
            return;
        }
        axios.get('/api/product?id='+id).then(response => {
            console.log(response.data)
        });
    },[id])
  return (
    <Layout>
        Edite product
    </Layout>
  );
}


