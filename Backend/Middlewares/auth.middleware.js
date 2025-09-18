import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { aToken } = req.headers;
        if (!aToken) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }
        const Token_decoded = jwt.verify(aToken, process.env.JWT_SECRET);
        if (Token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

export default authAdmin