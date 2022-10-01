const { scrypt, randomBytes } = require("crypto");
const moment = require("moment");
const { promisify } = require("util");

class Common {
  constructor() {
    this.key = "AUTH-BULK-MESSAGE";
  }
  async passwordHash(password) {
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(8).toString("hex");
    const buf = await scryptAsync(password, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  }
  async passwordCompare(hash, password) {
    const scryptAsync = promisify(scrypt);
    // split() returns array
    const [hashedPassword, salt] = hash.split(".");
    // we hash the new sign-in password
    const buf = await scryptAsync(password, salt, 64);
    // compare the new supplied password with the stored hashed password
    return buf.toString("hex") === hashedPassword;
  }
  async jwtSign(payload) {
    let jwt = require("jsonwebtoken");
    let token = jwt.sign(payload, this.key);
    return token;
  }
  async jwtVerify(token) {
    let jwt = require("jsonwebtoken");
    let data = jwt.verify(token, this.key);
    return data;
  }
}

module.exports = new Common();
