import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SignIn = () => {

    const [email , setEmail] = useState("");
    const [pass , setPass] = useState("");

    const router = useRouter();


    //check user is login or not
    useEffect(() => {

        axios.get("/api/user")
        .then(res => {

            if(res.data.status){

               
                router.replace("/dashboard");
            }
            else{

                
            }

        })
        .catch(error =>{

            console.log(error)
            
        })



    } , [])


    const SignInHandler = () => {


        axios
            .post("/api/auth/signin" , {email : email , password : pass})
            .then(res => {

                if(res.data.status){

                    window.location.href = "/dashboard";

                }
                else{

                    console.log(res.data)

                }
            })
            .catch(error => {

                console.log(error);
            })
        
    }


    return (
        
        <div>

            <input type='text' vlaue={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='text' vlaue={pass} onChange={(e) => setPass(e.target.value)} placeholder='Password' />

            <button onClick={SignInHandler}>Sign In</button>

            
        </div>
    );
};

export default SignIn;