const bcrypt = require("bcrypt");
const saltRounds = 10;
const bcryptfunc = async (password) => {
  return (hashedPassword = await bcrypt.hash(password, saltRounds));
};
module.exports = bcryptfunc;
