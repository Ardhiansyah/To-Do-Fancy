const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generate: (data) => {
        return bcrypt.hashSync(data, bcrypt.genSaltSync(saltRounds));
    },

    compare: (data, password) => {
        return bcrypt.compareSync(data, password);
    }
}