import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(pass){

    const hashedPass = await hash(pass , 12);
    console.log(hashedPass);
    return hashedPass;
}


async function verifyPassword(password , hashedPass){

    const isValid = await compare(password , hashedPass);

    return isValid;
}

function verifyToken(token , sercretkey){

    try{

        const result = verify(token , sercretkey);
        return result;
    }
    catch(error){

        return false ;
    }
}


export {hashPassword , verifyPassword , verifyToken} ;