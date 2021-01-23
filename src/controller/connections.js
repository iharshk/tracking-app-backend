const User = require('../models/user');
const Connection = require('../models/connection');
const { sendResponse } = require('../common/utils');

module.exports.reqSend = async function (req, res) {
    try {
        let user_id = req.headers.id;
        if(!req.body.mobile || !user_id) {
            let msg = !req.body.mobile ? `Mobile number is required.`: `Unauthorize Access`;
            sendResponse(res, true, 404, 6000, msg);
        } 
        let userDeatails = await User.findOne({ mobile: req.body.mobile });
        if (userDeatails) {
            let sent = await Connection.updateOne({ user_id : user_id }, { $addToSet: { "req_sent" : userDeatails._id } }, { upsert: true });
            if(sent.ok) {
                let rcvd = await Connection.updateOne({ user_id : userDeatails._id }, { $addToSet: { "req_recieved" : user_id } }, { upsert: true });
                if(rcvd.ok) sendResponse(res, false, 200, 3007);
                else sendResponse(res, true, 404, 6000, rcvd);

            } else sendResponse(res, true, 404, 6000, sent);

        } else {
            sendResponse(res, false, 200, 3008);
        }
    } catch (err) {
        console.log('error', err)
        sendResponse(res, true, 400, 6000, err.message);
    }
}

module.exports.reqAccept = async function (req, res) {
    try {
        let user_id = req.headers.id;
        if(!req.body.mobile || !user_id) {
            let msg = !req.body.mobile ? `Mobile number is required.`: `Unauthorize Access`;
            sendResponse(res, true, 404, 6000, msg);
        };
        let userDeatails = await User.findOne({ mobile: req.body.mobile });
        if (userDeatails) {
            let query = { $pull: { req_recieved: userDeatails._id }, $addToSet:{ friendsList: userDeatails._id } } 
            let added = await Connection.updateOne({ user_id : user_id }, query, { upsert: true });
            if(added.ok) {
                let subquery = { $pull: { req_sent: user_id }, $addToSet:{ friendsList: user_id } };
                let add = await Connection.updateOne({ user_id : userDeatails._id }, subquery, { upsert: true });
                if(add.ok) sendResponse(res, false, 200, 3009 );
                else sendResponse(res, true, 404, 6000, added);
                
            } else sendResponse(res, true, 404, 6000, added);
            
        } else {
            sendResponse(res, false, 200, 3008);
        }
    } catch (err) {
        console.log('error', err)
        sendResponse(res, true, 400, 6000, err.message);
    }
}

module.exports.reqReject = async function (req, res) {
    try {
        let user_id = req.headers.id;
        if(!req.body.mobile || !user_id) {
            let msg = !req.body.mobile ? `Mobile number is required.`: `Unauthorize Access`;
            sendResponse(res, true, 404, 6000, msg);
        };
        let userDeatails = await User.findOne({ mobile: req.body.mobile });
        if (userDeatails) {
            let result = await User.updateOne({ _id : user_id }, { $pull: { req_recieved: userDeatails._id } });
            if(result.ok) sendResponse(res, false, 200, 3010 );
            else sendResponse(res, true, 404, 6000, result);
        } else {
            sendResponse(res, false, 200, 3008);
        }
    } catch (err) {
        console.log('error', err)
        sendResponse(res, true, 400, 6000, err.message);
    }
}