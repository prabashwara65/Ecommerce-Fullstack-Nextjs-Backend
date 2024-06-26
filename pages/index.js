import Layout from "@/Components/Layout";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
    const { data: session } = useSession();

    return <Layout >

        <div className="text-blue-900 flex justify-between">
            <h2>
                Hello, <b>{session?.user?.name}</b>
            </h2>
            

        </div>

    </Layout>

}
