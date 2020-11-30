export interface IDatabaseConfigAttributes {
    storage?: string;
    database?: string;
    dialect?: string;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}