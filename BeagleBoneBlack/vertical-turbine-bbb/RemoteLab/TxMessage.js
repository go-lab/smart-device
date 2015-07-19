/*	class: TXMsg
 *	used for convenient sending a JSON encoded string to client
 *
 *	properties
 *	-	msgType: type of message (can be anything you define)
 *	-	payload: data to be carried
 *	methods:
 *	-	transmitString: encodes the message type and payload and a timestamp 
 *						into JSON string and returns the string so that it can be transmitted
 */

var moment = require('moment');

function TxMsg(msgType, payload) {
	this.msgType = msgType;
	this.payload = payload;
}

TxMsg.prototype.setPayload = function (payload) {
	this.payload = payload;
}

TxMsg.prototype.transmitString = function () {
	var nowDate = moment().format("D-MMM-YYYY, HH:mm:ss");
	var new_txmsg = {
		messageType: this.msgType,
		dateValid: nowDate,
		payload: this.payload
	};
	return JSON.stringify(new_txmsg);
}

module.exports = TxMsg;