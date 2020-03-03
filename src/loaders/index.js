/* eslint-disable no-console */
import expressLoader from './express'

/**
 * Initialize and sets up express application
 * @expressApp an instance of express application
 */
const init = ({ expressApp }) => {
    expressLoader({app: expressApp})
    console.log("✌️  Express loaded and initialized!")
}

export default { init }