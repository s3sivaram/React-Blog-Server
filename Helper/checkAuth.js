// This function is used to check if the user is authenticated or not.
const { verify } = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const auth = req.header("token");
  console.log("reg.header", req.header);
  if (auth == "none" || auth == undefined) {
    console.log("auth not found");
    return res.send({ message: "Not Logged in", auth: "none" });
  }
  try {
    const decoded = verify(auth, "jwtsecret");
    console.log("decoded", decoded);
    req.user = decoded.username;
    next();
  } catch (error) {
    console.log("error", error);
    return res.json({ message: "Not Authorized in", auth: "none" });
  }
};
module.exports = checkAuth;
