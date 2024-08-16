import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded:", decoded);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach the user ID to the request object
        req.id = decoded.userId;
        next();

    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export default isAuthenticated;
