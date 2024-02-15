const jwt = require("jsonwebtoken");

// set a secret
const secret = process.env.SECRET_PASS; 

function Auth(roles) {

    console.log(roles);

    return function (req, res, next) {
        try {
            const token = req.cookies.token;

            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    return res.status(200).json({status: "Invalid JWT"});

                req.userId = decoded.userId;

                if (roles.includes(decoded.role))
                    next();
                else
                    return res.status(200).json({status: "Not Authorized"});
            });
        }
        catch(err) {
            console.log("hello");
            res.status(200).json({status: "Not Authorized"});
        }

    }
}



module.exports = Auth;