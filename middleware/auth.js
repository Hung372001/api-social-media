import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if (!token) {
            return res.status(403).send('Access Deniend')
        }
        if (token.startWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft()
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify;
        next()
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

