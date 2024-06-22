import Layout from "@/Components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function DeleteProductPage() {

    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/product?id=' + id).then(response => {
            console.log(response.data)
            setProductInfo(response.data);
        })

    }, [id])
    function goBack() {
        router.push('/products')
    }

    async function deleteProducts(){
         await axios.delete('/api/product?id='+id)
        goBack();
    }

    // if (!productInfo) {
    //     return (
    //         <Layout>
    //             <div>Loading...</div>
    //         </Layout>
    //     );
    // }
    return (
        <Layout>


            <h1>Do you really want to delete &nbsp; "{productInfo?.title}?"</h1>

            <div className="flex gap-2">
                <button className="btn-red" onClick={deleteProducts}>YES</button>
                <button className=" btn-default" onClick={goBack}>NO</button>
            </div>


        </Layout>
    )
}