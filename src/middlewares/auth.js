import jwt from "jsonwebtoken";

const PrivateKey = 'CoderTokenFP';
const auth = (req, res, next) =>
{
    const a= []
    const authHeader = req.headers.authorization;

    if (!authHeader)
    {
        return res.status(401).send({ message: 'Empty authentication header!'})
    }

    const token = authHeader.split(' ')[1]; // Bearer tokenString

    jwt.verify(token, PrivateKey, (error, credentials) =>{
       if(error) return res.status(403).send({ error: 'Authentication error'});

       req.user = credentials.user;
       next();
    });
}

export default auth;