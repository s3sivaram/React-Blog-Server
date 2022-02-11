const bcrypt = require("bcrypt");
const saltRounds = 10;
const bcryptcomparefunc = async (password, hashedPassword) => {
  return (hashedresult = await bcrypt.compare(
    password,
    hashedPassword,
    (err, result) => {
      return result;
    }
  ));
};
module.exports = bcryptcomparefunc;
