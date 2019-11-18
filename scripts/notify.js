//notify.js

function MesiboNotify(o) {
	MesiboLog("Constructing MesiboNotify with context");
	MesiboLog(o);
	this.AppContext = o;
}

MesiboNotify.prototype.Mesibo_OnConnectionStatus = function(status, value) {
	MesiboLog("MesiboNotify.prototype.Mesibo_OnConnectionStatus: " + status);
}

MesiboNotify.prototype.Mesibo_OnMessageStatus = function(m) {
	MesiboLog("MesiboNotify.prototype.Mesibo_OnMessageStatus: from " + m.peer +
		" status: " + m.status);

	MesiboLog(this);
	MesiboLog(this.AppContext);
	this.AppContext.getAppStorage().updateItemSent(m);
	this.AppContext.updateSentMessageStatus(m);
	this.AppContext.updateLastMessageStatus(m);
	this.AppContext.updateUserListOrder();
}

MesiboNotify.prototype.Mesibo_OnMessage = function(m, data) {
	MesiboLog("TestNotify.prototype.Mesibo_OnMessage: from " + m.peer);

	if (m.presence)
		this.AppContext.checkAndUpdateUserStatus(m);

	if (data) {
		//Send receipt, If selected user is in current view 
		this.AppContext.checkAndSendReadReceipt(m);
		this.AppContext.checkAndCreateDateHeader(m);
		this.AppContext.createRecievedBubble(m, data);

		this.AppContext.getAppStorage().updateItemRecieved(m, data);
		this.AppContext.updateLastMessageStatus(m);
		this.AppContext.updateUserListOrder();

	}

}

MesiboNotify.prototype.Mesibo_OnCall = function(callid, from, video) {
	console.log("Mesibo_onCall: " + (video?"Video":"Voice") + " call from: " + from);
	if(video)
		this.AppContext.showVideoHolder();
	else
		this.AppContext.getMesiboInstance().setupVoiceCall("audioPlayer");

	var s = document.getElementById("ansBody");
	if(s)
		s.innerText = "Incoming " + (video?"Video":"Voice") + " call from: " + from;

	$('#answerModal').modal({ show: true });
}

MesiboNotify.prototype.Mesibo_OnCallStatus = function(callid, status) {
	console.log("Mesibo_onCallStatus: " + status);
	// var v = document.getElementById("vcstatus");
	// var a = document.getElementById("acstatus");

	// var s = "Complete"; 
	// if(status&MESIBO_CALLSTATUS_COMPLETE) {
	// 	console.log("closing");
	// 	$('#answerModal').modal("hide");
	// }

	// switch(status) {
	// 	case MESIBO_CALLSTATUS_RINGING:
	// 		s = "Ringing";
	// 		break;

	// 	case MESIBO_CALLSTATUS_ANSWER:
	// 		s = "Answered";
	// 		break;

	// 	case MESIBO_CALLSTATUS_BUSY:
	// 		s = "Busy";
	// 		break;

	// 	case MESIBO_CALLSTATUS_NOANSWER:
	// 		s = "No Answer";
	// 		break;

	// 	case MESIBO_CALLSTATUS_INVALIDDEST:
	// 		s = "Invalid Destination";
	// 		break;

	// 	case MESIBO_CALLSTATUS_UNREACHABLE:
	// 		s = "Unreachable";
	// 		break;

	// 	case MESIBO_CALLSTATUS_OFFLINE:
	// 		s = "Offline";
	// 		break;
	// }

	// v.innerText = "Call Status: " + s;
	// a.innerText = "Call Status: " + s;
}
