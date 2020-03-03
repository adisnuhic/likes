/* eslint-disable no-param-reassign */
/**
 * Map of HTTP Status codes.
 */
const Status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500
};


/**
 * Helper for returning the appropriate HTTP string for the given status, ordered by the most used
 * response statuses
 *
 * @param status status instance
 * @returns {string}
 */
function statusMessage(status) {
    switch (status) {
        case Status.OK:
            return 'OK';
        case Status.BAD_REQUEST:
            return 'Bad Request';
        case Status.UNAUTHORIZED:
            return 'Unauthorized';
        case Status.NOT_FOUND:
            return 'Not Found';
        case Status.UNSUPPORTED_ACTION:
            return 'Unsupported Action';
        case Status.VALIDATION_FAILED:
            return 'Validation Failed';
        case Status.SERVER_ERROR:
            return 'Internal Server Error';
        default: return 'Bad Request';
    }
}


/**
 * Helper for sending JSON successful OK 200 responses
 *
 * @param res response
 * @param body json body response
 * @param options options
 */
function jsonResponse(res, body, options) {
    options = options || {};
    options.status = options.status || Status.OK;
    res.status(options.status).json({
        code: options.status,
        message: statusMessage(options.status) || statusMessage(Status.OK),
        data: body
    });
}

/**
 * Helper for sending JSON successful OK 200 reponses with paging parameters
 *
 * @param {*} res response
 * @param {*} body json body response
 * @param {*} pageVal page value
 * @param {*} sizeVal size value
 * @param {*} options options
 */
function jsonPagingResponse(res, body, pageVal, sizeVal, options) {
    options = options || {};
    options.status = options.status || Status.OK;
    res.status(options.status).json({
        code: options.status,
        message: statusMessage(options.status) || statusMessage(Status.OK),
        page: pageVal,
        size: sizeVal,
        data: body
    });
}


/**
 * Helper for sending JSON error responses
 *
 * @param res response
 * @param err error
 * @param options options
 */
function errorResponse(res, err, options) {
    options = options || {};
    let error = {}
    
    typeof err !== 'undefined' && err.errors !== 'undefined' ? error = err.errors : error = err
    
    options.status = options.status || Status.OK;
    res.status(options.status).json({
        code: options.status,
        message: statusMessage(options.status) || statusMessage(Status.OK),
        error
    });
}


/**
 * Helper for sending JSON error custom responses
 *
 * @param res response
 * @param err error
 * @param options options
 */
function errorCustomResponse(res, err, options) {
    options = options || {};
    options.status = options.status || Status.OK;
    res.status(options.status).json({
        code: options.status,
        message: (err.message || statusMessage(options.status)),
        error: err
    });
}



export default class ResponseHelper {
    /**
     * Respond with `200 OK` and JSON-encoded data
     *
     * @param res response
     * @param data JSON results
     */
    static ok(res, data) {
        jsonResponse(res, data, {
            status: Status.OK
        });
    }


    /**
     * Respond with `200 OK` and JSON-encoded data
     *
     * @param res response
     * @param data JSON results
     * @param page page value
     * @param size size value
     */
    static okWithPaging(res, data, page, size) {
        jsonPagingResponse(res, data, page, size, {
            status: Status.OK
        });
    }


    /**
     * Responds with the error status and the error message if existing, if not
     * then a `400 Bad request` is returned
     *
     * @param res response
     * @param err error
     */
    static error(res, err) {
        err = err || {};
        const options = {};
        options.status = err.status || Status.BAD_REQUEST;
        res.message = err.message || statusMessage(Status.BAD_REQUEST);
        errorResponse(res, err, options);
    }


    /**
     * Respond with `400 Bad Request` and JSON-encoded error object
     *
     * @param res response
     * @param err error
     */
    static badRequest(res, err) {
      errorResponse(res, err, {
          status: Status.BAD_REQUEST,
      });
    }

    /**
     * Respond with `400 Bad Request` and JSON-encoded error object with a custom message
     *
     * @param res response
     * @param err error
     */
    static badRequestCustom(res, err) {
        errorCustomResponse(res, err, {
            status: Status.BAD_REQUEST,
        });
    }


    /**
     * Respond with `401 Unauthorized` and JSON-encoded error object
     *
     * @param res response
     * @param err error
     */
    static unauthorized(res, err) {
       errorResponse(res, err, {
            status: Status.UNAUTHORIZED
        });
    }


    /**
     * Respond with `404 Not Found` and JSON-encoded error object
     *
     * @param res response
     * @param err error
     */
    static notFound(res, err) {
       errorResponse(res, err, {
            status: Status.NOT_FOUND
        });
    }


    /**
     * Respond with `405 Method Not Allowed`
     *
     * @param res response
     * @param err error
     */
    static unsupportedAction(res, err) {
        errorResponse(res, err, {
            status: Status.UNSUPPORTED_ACTION
        });
    }


    /**
     * Respond with `422 Unprocessable Entity` and JSON-encoded error object
     *
     * @param res response
     * @param err error
     */
    static invalid(res, err) {
        errorResponse(res, err, {
            status: Status.VALIDATION_FAILED
        });
    }


    /**
     * Respond with `500 Internal Server Error` and JSON-encoded error object
     *
     * @param res response
     * @param err error
     */
    static serverError(res, err) {
        if (err instanceof Error) {
            err = {
                message: err.message,
                // only send a stacktrace in development
                stacktrace: (res.app.get('env') === 'development') ? err.stack : {}
            };
        }
        errorResponse(res, err, {
            status: Status.SERVER_ERROR
        });
    }
}