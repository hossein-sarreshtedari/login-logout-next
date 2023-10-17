import { verifyToken } from '@/utils/auth';
import axios from 'axios';
import React, { useState }  from 'react';

const Dashboard = ({result}) => {

    

    const [name , setName] = useState("");
    const [lastName , setLastName] = useState("");
    const [password , setPassword] = useState("");


    const updateHandler = () => {

        axios
            .post("/api/auth/update-info" , {name , lastName , password})
            .then(res => {

                if(res.data.status){

                    console.log(res.data)
                }
                else{

                    console.log(res.data)
                }
            })
            .catch(error =>{

                console.log(error)
            })

    }

    
    return (

        <>

            <h1>Dtaa for User {result.email}</h1>

            <h2>Complate or Edite your Data:</h2>

            <input type="text" placeholder={result.name === undefined ? "Name" : result.name} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={result.lastName === undefined ? "LastName" : result.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={updateHandler}>Update</button>
            
        </>
    );
};

export default Dashboard;


export async function getServerSideProps(context){

    const {token} = context.req.cookies;
    const secretKy = process.env.SECRET_KEY;
    
    if(!token) return {redirect : {destination : "/signin" , permanent : false }}
    
    const result = verifyToken(token , secretKy );

    

    if(!result) return {redirect : {destination : "/signin" , permanent : false }}


    return{props : { result }}
}