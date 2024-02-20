const jwt = require("jsonwebtoken");

// set a secret
const secret = process.env.SECRET_PASS; 

function Auth(roles=["USER", "ADMIN"]) {

    return function (req, res, next) {
        try {
            const token = req.cookies.token;

            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    return res.redirect("/auth/login");

                req.user = decoded;

                if (roles.includes(decoded.role))
                    next();
                else
                    return res.redirect("/auth/login"); 
            });
        }
        catch(err) {
            return res.redirect("/auth/login");
        }

    }
}



module.exports = Auth;