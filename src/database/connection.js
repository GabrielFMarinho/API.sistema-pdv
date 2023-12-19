const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        database: process.env.DATABASE,
    },
});

module.exports = knex;
