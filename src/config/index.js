module.exports = {
    server:{
        port: process.env.PORT || 3000
    },
    bodyParser:{
        limit: '100kb'
    },
    cors:{
        origin: "*",
        headers: 'Origin, X-Requested-With, Content-Type, Authorization',
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"
    },
    db:{
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dialect:  process.env.DB_TYPE || "mysql"
    }
}