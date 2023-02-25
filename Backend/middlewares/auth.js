const jwt = require('jsonwebtoken')
const { User } = require('../db/Models/usersModel')

//this is a middleware function : it will verify the User if he is connected to our app  and we will get the role of the connected user to manage permissions
async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { email: decoded.email, role: decoded.role, id: decoded.id, name: decoded.name };
        //because its a middleware function we have to put next() to go and run the parent function ( which is not a middleware function )
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'TOKEN EXPIRED' });
    }
}
module.exports = { authenticateToken }