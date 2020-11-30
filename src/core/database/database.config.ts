import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    
    development: {
        storage: "./db",
        database: process.env.DB_NAME_DEVELOPMENT,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        database: process.env.DB_NAME_TEST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        database: process.env.DB_NAME_PRODUCTION,
        dialect: process.env.DB_DIALECT,
    },
};
