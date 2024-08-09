import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded:", decode);

        if (!decode) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default isAuthenticated;
