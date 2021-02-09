const formFields = require('../assests/form_fields.json');
const Fields = require('../models/form_fields')
const { sendResponse } = require('../common/utils');

module.exports.signupFields = async (req, res, next) => {
    try {
        console.log("heu", formFields.signup)
        sendResponse(res, false, 200, 5001, formFields.signup);

    } catch (error) {
        res.send(error)
    }
}