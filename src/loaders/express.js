import * as bodyParser from 'body-parser'
import http from 'http'
import morgan from 'morgan'

import config from '../config'
import routes from '../routes'

export default ({ app }) => {
    app.server = http.createServer(app)
    
    // setup bodyParser to parse JSON/x-www-form-urlencoded
    app.use(bodyParser.json(config.bodyParser)) 
    app.use(bodyParser.urlencoded({ extended: true })) 

    // setting up logging request
    if(process.env.NODE_ENV == 'development'){
        app.use(morgan('dev'))
    }

    // setting up CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", config.cors.origin);
        res.header("Access-Control-Allow-Headers", config.cors.headers);
        res.header("Access-Control-Allow-Methods", config.cors.methods);
        next();
    });

    // setting up router
    app.use('/api/v1',routes.v1Router)
    
}
