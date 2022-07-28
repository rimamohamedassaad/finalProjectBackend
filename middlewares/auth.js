const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
const ErrorRespond = require('../utils/errorResponse')
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorRespond("not authorized to access this route", 401))
    }
    try {
        const decoded = jwt.verfy(token, process.env.JWT_SECRET_KEY)

        const user = await User.findById(decoded.id)
        if (!user) {
            return next(new ErrorRespond("not user found with this id", 404))
        }
        req.user = user;
        return next();
    } catch (error) {
        return next(new ErrorRespond("not authorized to access this route", 401))
    }


}