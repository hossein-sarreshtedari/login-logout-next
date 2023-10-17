import { verifyToken } from '@/utils/auth';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Home = ({isLogIn}) => {


  const router = useRouter() ;


  const logoutHandler = () => {

    axios
      .get("/api/auth/signout")
      .then(res => {

        if (res.data.status) {

          router.replace("/signin")
        }
        else {


        }
      })
      .catch(error => {

        console.log(error)
      })

  }

  return (

    <>

      {isLogIn ?

        <>

          <Link href={"/dashboard"}><button>Dashboard</button></Link>
          <button onClick={logoutHandler}>Log out</button>

        </>


        :


        <>

          <Link href={"/signup"}><button>SignUp</button></Link>
          <Link href={"/signin"}><button>SignIn</button></Link>

        </>

      }








    </>
  );
};

export default Home;


export async function getServerSideProps(context){

  const {token} = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  let isLogIn = false ;

  if(!token) return {redirect : {destination : "/signin" , permanent : false }}
  else isLogIn = true ;

  const result = verifyToken(token , secretKey);

  if(!result) return {redirect : {destination : "/signin" , permanent : false }}
  else isLogIn = true ;

  return{props : {isLogIn}}
}