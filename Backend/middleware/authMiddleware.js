import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const protect = async (req , res , next) => {
    // console.log("User Middleware")
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "User not authenticate",
                success : false
            })
        }
        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        };
        req.user = await User.findById(decode.id);
        if(!req.user) {
            return res.status(401).json({
                message : "User not Found",
                success : false
            })
        }
        // req.id = decode.userId;
        next();

    } catch (error) {
        console.log("Authenticate error",error)
        return res.status(401).json({
            message: "Invalid Token",
            success: false,
        });
    }
}
