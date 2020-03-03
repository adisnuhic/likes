/* eslint-disable no-console */
import express from 'express'
import loaders from './loaders'
import config from './config'

// Create express application
const app = express()

// Initialize loaders
loaders.init({ expressApp: app })

// Listen on port
app.server.listen(config.server.port)

console.info('--------------------------------------------');
console.info(`       Server listening on port: ${app.server.address().port}`);
console.info('--------------------------------------------');

export default app





