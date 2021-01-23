const User = require('../models/user');
const { sendResponse } = require('../common/utils');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

module.exports.signup = async function (req, res) {
    try {
        if(!req.body.password || !req.body.mobile || !req.body.email) {
            let msg = !req.body.mobile ? `Mobile number is required.`: (!req.body.email? `Email Id is required.` : `Password is required.`);
            sendResponse(res, true, 404, 6000, msg);
        } 
        req.body.password = bcrypt.hashSync(req.body.password);
        let userDeatails = await User.findOne({ mobile: req.body.mobile });
        if (!userDeatails) {
            let signedup = await User.insertMany(req.body);
            if (signedup && signedup.length) {
                let sessionId = await createSession({ mobile: req.body.mobile });
                let result = { sessionId: sessionId }
                sendResponse(res, false, 200, 3001, result);
            } else {
                sendResponse(res, true, 200, 6001);
            }
        } else {
            sendResponse(res, false, 200, 3002);
        }
    } catch (err) {
        sendResponse(res, true, 400, 6000, err.message);
    }
};

module.exports.login = async function (req, res) {
    try {
        if(!req.body.password || !req.body.mobile) {
            let msg = !req.body.mobile ? `Mobile number is required.`: `Password is required.`;
            sendResponse(res, true, 404, 6000, msg);
        } 
        let password = req.body.password;
        let userDeatails = await User.findOne({ mobile: req.body.mobile });
        if (userDeatails) {
            let hashPass = await bcrypt.compare(password, userDeatails.password);
            if (hashPass) {
                let sessionId = await createSession({ mobile: req.body.mobile });
                let result = { sessionId: sessionId }
                sendResponse(res, false, 200, 3003, result);
            } else {
                sendResponse(res, false, 200, 3004);
            }
        } else {
            sendResponse(res, false, 200, 3005);
        }
    } catch (err) {
        sendResponse(res, true, 400, 6000, err.message);
    }
}

/**
 * @body {mobile_no : '0987654321'}
*/
function createSession(body){
    return  jwt.sign(body, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE });
}