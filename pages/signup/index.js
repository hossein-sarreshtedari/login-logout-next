import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react';

const Signup = () => {

    const [email , setEmail] = useState("");
    const [pass , setPass] = useState("");

    const router = useRouter();

       //check user is login or not
       useEffect(() => {

        axios.get("/api/user")
        .then(res => {

            if(res.data.status){

               
                window.location.href = "/dashboard";
            }
            else{

                
            }

        })
        .catch(error =>{

            console.log(error)
            
        })



    } , [])



    const signUpHandler = () => {


        axios
            .post("/api/auth/signup" , {email : email , password : pass})
            .then(res => {

                if(res.data.status){

                    console.log(res.data)
                    router.push("/signin")

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

            <button onClick={signUpHandler}>SignUp</button>

            
        </div>
    );
};

export default Signup;