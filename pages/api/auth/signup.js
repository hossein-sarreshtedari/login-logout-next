import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import conectDB from "@/utils/conectDB";

export default async function handler(req , res){

    if(req.method !== "POST") return ;


    //conect db
    try{

        await conectDB();
    }
    catch(error){

        console.log(error);
        return res.status(500).json({status : false , message : "problem in conenct to db"})
    }


    //check Data
    const {email , password} = req.body;

    if(!email , !password) return res.status(422).json({status : false , message : "invalid Data"});


    //chekc user is in database or not
    const existingUser = await User.findOne({email : email});
    if(existingUser) return res.status(422).json({status : false , message : "user signup in past"});

    //hash pass
    const hashPass = await hashPassword(password);


    //save in data base
    const newUser = await User.create({email : email , password : hashPass});
    console.log(newUser);


    res.status(201).json({status : true , message : "SignUp SuccsessFull"}) ;



}