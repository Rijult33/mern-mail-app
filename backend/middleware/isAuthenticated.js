const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      console.log("Token received from cookies:", token);
  
      if (!token) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded token payload:", decode);
  
      req.id = decode.userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  