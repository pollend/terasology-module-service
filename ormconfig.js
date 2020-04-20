module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "port": process.env.DATABASE_PORT,
    "migrationsTableName": "database_migrations",
    "migrations": ["src/migration/*.ts"],
    "entities": ["src/entity/*.ts"],
    "logging": true,
    "synchronize": true,
    "cli": {
        "migrationsDir": "src/migration"
    }
}
