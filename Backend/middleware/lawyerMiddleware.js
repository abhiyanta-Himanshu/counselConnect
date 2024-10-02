import jwt from "jsonwebtoken"
import Lawyer from "../models/lawyer.model.js";


export const authenticateLawyer = async (req , res , next) => {
    // console.log("Lawyer Middlewares")
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "User not authenticate",
                success : false
            })
        }
        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        // console.log(decode)
        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        };
        req.user = await Lawyer.findById(decode.id);
        if(!req.user) {
            return res.status(401).json({
                message : "User not Found",
                success : false
            })
        }
        // req.id = decode.userId;
        // console.log(req.user)
        next();

    } catch (error) {
        console.log("Authenticate error",error)
        return res.status(401).json({
            message: "Invalid Token",
            success: false,
        });
    }
}
