const bcrypt = require('bcrypt');

const saltRounds = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const comparePasswords = (plainTextPassword, hashedPassword) => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = { encryptPassword, comparePasswords };