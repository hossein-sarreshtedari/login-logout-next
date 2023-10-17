import User from "@/models/User";
import { verifyPassword, verifyToken } from "@/utils/auth";
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


    //get data of body
    const { name, lastName, password } = req.body;


    //check token
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!token) return res.status(401).json({ status: false, message: "you are not login!" });

    const result = verifyToken(token, secretKey);

    if (!result) return res.status(401).json({ status: false, message: "you are not Authorized!" });


    //check user
    const user = await User.findOne({ email: result.email })
    if (!user) return res.status(404).json({ status: false, message: "user Not Exist!" });


    //check pass
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return res.status(422).json({ status: false, message: "your pass in incorrect" });

    //updateuser and save
    user.name = name;
    user.lastName = lastName;
    user.save();



    //create token again
    const newToken = sign({ email: result.email, name: name, lastName: lastName }, process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 });
    const serialized = serialize("token", newToken, { httpOnly: true, maxAge: 24 * 60 * 60, path: "/" });
    return res.status(200).setHeader("Set-Cookie", serialized).json({ status: true, message: "user Updated", data: { name: name, lastName: lastName, email: result.email } });







}