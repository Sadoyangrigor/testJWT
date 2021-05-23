const jwt = require('jsonwebtoken');

authenticateToken = (req, res, next) =>  {

    const authHeader = req.headers['authorization']

    if (authHeader == null) return res.sendStatus(401)

    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        console.log(user)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

generateAccessToken = (username) => {
    let c = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    console.log('c',c)
    return c
}

module.exports.authenticateToken = authenticateToken;
module.exports.generateAccessToken = generateAccessToken;