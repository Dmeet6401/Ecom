"use client"

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function VerifyEmail(){
   
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            const response = await axios.post("/api/users/verifyEmail", {token});
            setVerified(true);
        } catch(error: any){
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        // const urlToken = window.location.search.split("=")[1];
        const urlToken = useSearchParams();
        setVerified(true);

    })

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    {verified ? (
                        <div>
                            <h2 className="mt-6 text-2xl font-bold text-green-600">Email Verified Successfully</h2>
                            <p className="mt-2 text-gray-600">You can now log in to your account</p>
                            <Link 
                                href="/login"
                                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Go to Login
                            </Link>
                        </div>
                    ) : error ? (
                        <div>
                            <h2 className="mt-6 text-2xl font-bold text-red-600">Verification Failed</h2>
                            <p className="mt-2 text-gray-600">Please try again or contact support</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="mt-6 text-2xl font-bold text-blue-600">Verifying your email...</h2>
                            <p className="mt-2 text-gray-600">Please wait</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )   
}
