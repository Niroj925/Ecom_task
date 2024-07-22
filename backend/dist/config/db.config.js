"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } = process.env;
const PORT = parseInt(MYSQL_PORT);
const databaseConfig = {
    type: 'mysql',
    host: MYSQL_HOST,
    port: PORT,
    username: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
exports.default = databaseConfig;
//# sourceMappingURL=db.config.js.map