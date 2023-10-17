import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import conectDB from "@/utils/conectDB";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {

    if (req.method !== "POST") return;


    //conect db
    try {

        await conectDB();
    }
    catch (error) {

        console.log(error);
        return res.status(500).json({ status: false, message: "problem in conenct to db" })
    }


    //check Data
    const { email, password } = req.body;
    if (!email, !password) return res.status(422).json({ status: false, message: "invalid Data" });


    //check user exist or not
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ status: false, message: "user not exist! Please signUp" });


    //check pass in correct or not
    const isValidPass = await verifyPassword(password, user.password);
    console.log(isValidPass);

    if (!isValidPass) return res.status(422).json({ status: false, message: "userName or passWord in not true" })

    //create token
    const token = sign({ email: email}, process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 });

    const serialized = serialize("token" , token , {httpOnly : true , maxAge : 24 * 60 * 60 , path : "/"}) ;

    res.status(200).setHeader("Set-Cookie" , serialized ).json({ status: true, message: "signin succsessFully", data: user.email });


}


