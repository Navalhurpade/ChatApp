const jwt = require("jsonwebtoken");

export default function isAutheticaticated(req, res, next) {
  const token = req.headers("x-auth-token");

  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const payload = jwt.verify(token, process.env.APP_SECRETE);
    req.user = payload;
    console.log("\nLogin Sucsess !");
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token." });
  }
}
