import { verifyToken } from "@/utils/auth";

export default async function handler(req , res){

    if(req.method !== "GET") return ;


    //check user is login or not

    const token = req.cookies.token;

    if(!token) return res.status(401).json({status : false , message : "you are not log in!"});


    //check token is valid or not

    const result = verifyToken(token , process.env.SECRET_KEY);

    if(result){

        res.status(200).json({status : true , data : result})
    }
    else{

        res.status(401).json({status : false , message : "you are unAuthorized"})
    }


}