import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/Components/Nav";
import Logo from "./Logo";

export default function Layout({ children }) {



    const { data: session } = useSession()

    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="">
                    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg"> Login with google</button>
                </div>
            </div>
        );
    }

    return (

        <div className="bg-bgGray min-h-screen">

            <div className="block md:hidden items-center p-4">
                <button onClick={() => setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>

                <div className="flex glow justify-center ">
                    <Logo />
                </div>

            </div>



            <div className=" flex">
                <Nav show={showNav} />
                <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
                    {children}
                </div>
            </div>
        </div>



    )
}
