const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
const token = req.headers.authorization;

console.log("token",token);
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, 'your-secret-key');
 req.userId = decoded.userId;
 console.log(req.userId)
 next();

 } catch (error) {
 res.status(401).json({ error: 'Invalid token1' });
 }
 };
module.exports = verifyToken;