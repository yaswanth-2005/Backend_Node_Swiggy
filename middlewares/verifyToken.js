const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config();
const secretKey = process.env.whatIsYourName

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Token is Required.." })
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor Not Found.." })
        }

        req.vendorId = vendor._id;
        next();

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Invalid Token.." })
    }
}

module.exports = verifyToken;