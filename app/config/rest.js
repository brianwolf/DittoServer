import bodyParser from 'body-parser';

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

/**
 * 
 * @param {*} app 
 */
export function configrarExpress(app) {
    app.use(urlencodedParser)
    app.use(jsonParser)
}

