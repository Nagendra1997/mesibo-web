//core.js


function MesiboAppCore() {
	this.MesiboAppInit();
}

MesiboAppCore.prototype.MesiboAppInit = function() {

	this.accessToken;
	this.appId;
	this.mesiboApi;
	this.mesiboNotify;

	this.appStorage;
	this.phoneBook;
	this.activeUserList;
	this.selectedUser;
	this.currentSelectedUserName
	this.SelectedUserName;
}

MesiboAppCore.prototype._MesiboInit = function() {

	// fetchContacts(accessToken);
	var api = new Mesibo();
	api.setAppName(this.appId);
	api.setListener(new MesiboNotify(this));
	api.setCredentials(this.accessToken);

	this.mesiboApi = api;

	return api;
}

MesiboAppCore.prototype.setAppStorage = function(s) {
	this.appStorage = s;
}
MesiboAppCore.prototype.setPhoneBook = function(s) {
	this.phoneBook = s;
}
MesiboAppCore.prototype.setActiveUserList = function(s) {
	this.activeUserList = s;
}
MesiboAppCore.prototype.setSelectedUser = function(s) {
	this.selectedUser = s;
}
MesiboAppCore.prototype.setAccessToken = function(s) {
	this.accessToken = s;
}
MesiboAppCore.prototype.setAppId = function(s) {
	this.appId = s;
}

MesiboAppCore.prototype.getAppStorage = function() {
	return this.appStorage;
}
MesiboAppCore.prototype.getPhoneBook = function() {
	return this.phoneBook;
}
MesiboAppCore.prototype.getActiveUserList = function() {
	return this.activeUserList;
}
MesiboAppCore.prototype.getSelectedUser = function() {
	return this.selectedUser;
}
MesiboAppCore.prototype.getAccessToken = function() {
	return this.accessToken;
}
MesiboAppCore.prototype.getAppId = function() {
	return this.appId;
}
MesiboAppCore.prototype.getMesiboNotify = function() {
	return this.mesiboNotify;
}
MesiboAppCore.prototype.getMesiboInstance = function() {
	return this.mesiboApi;
}

MesiboAppCore.prototype.init = function() {
	this.mesiboModule = this._MesiboInit();
	this.appStorage = new MesiboLocalStorage()
	this.initPhoneBook();
	this.initAvailableUsers();
	this.initActiveUserList();
	
	_bindEventsToElements();

}
MesiboAppCore.prototype.start = function(s) {
	this.mesiboModule.start();
}

MesiboAppCore.prototype.initPhoneBook = function() {
	this.phoneBook = this.appStorage.getPhoneBook();
}

MesiboAppCore.prototype.initAvailableUsers = function() {
	fetchContacts(this.accessToken);
}

MesiboAppCore.prototype.initActiveUserList = function() {
	this.activeUserList = this.appStorage.getActiveUserList()
}

MesiboAppCore.prototype.updateSentMessageStatus = function(m) {
	var statustick = MesiboUIUtils.getElementById(m.id);
	MesiboUIUtils.updateStatusTick(statustick, m.status);

	if (m.status == MESIBO_MSGSTATUS_READ && this.selectedUser == m.peer) {
		MesiboUIUtils.updateReadPrevious(this.appStorage.getMsgArrayForPeer(m.peer), m.id);
	}
}

MesiboAppCore.prototype.updateLastMessageStatus = function(m) {
	MesiboUIUtils.updateLastMsg(MesiboUIUtils.getUserFromPhone(m.peer, this.phoneBook), m.peer);
}

MesiboAppCore.prototype.updateUserListOrder = function() {
	MesiboUIUtils.updateUserListOrder(this.phoneBook);
}

MesiboAppCore.prototype.initDisplay = function() {

	const phoneBook = this.getPhoneBook();
	MesiboLog(phoneBook);
	if (phoneBook.length == 0)
		MesiboLog("Error: MesiboDemoApp : PhoneBook Not loaded or No contacts");

	MesiboUIUtils.displayActiveUsers(this.activeUserList, this.phoneBook);
	MesiboUIUtils.updateUserListOrder(this.phoneBook);
}

MesiboAppCore.prototype.updateUserStatus = function(status) {
	MesiboUIUtils.getElementById("onlineStatus").textContent = status;
}

MesiboAppCore.prototype.checkAndSendReadReceipt = function(m) {
	if ((this.getSelectedUser() == m.peer) && (m.flag == MESIBO_FLAG_READRECEIPT | MESIBO_FLAG_DELIVERYRECEIPT)) {
		//Send RR
		this._sendReadReceipt(m.peer, m.id);
	}
}

MesiboAppCore.prototype.checkAndCreateDateHeader = function(m, messageTs) {
	const dateAtTs = MesiboUIUtils.dateNow(messageTs);
	const dateAtCurrentDay = MesiboUIUtils.dateNow(+new Date());
	const dateAtPreviousDay = MesiboUIUtils.dateYesterday(messageTs);
	const dateAtLastMessage = MesiboUIUtils.dateNow(
		MesiboUIUtils.getLastTs(m.peer, this.phoneBook));

	if ((dateAtTs != dateAtLastMessage)) {
		if (dateAtTs == dateAtCurrentDay) {
			MesiboUIUtils.createDateHeaderBlock("Today");

		} else if (dateAtTs == dateAtPreviousDay)
			MesiboUIUtils.createDateHeaderBlock("Yesterday");
		else
			MesiboUIUtils.createDateHeaderBlock(dateAtTs);
	}
}

MesiboAppCore.prototype.checkAndUpdateUserStatus = function(m) {
	if (m.presence == MESIBO_ACTIVITY_ONLINE)
		document.getElementById("onlineStatus").textContent = "Online";
	else if (m.presence == MESIBO_ACTIVITY_TYPING)
		document.getElementById("onlineStatus").textContent = "Typing...";
	else if (m.presence == MESIBO_ACTIVITY_LEFT)
		document.getElementById("onlineStatus").textContent = "";
}

MesiboAppCore.prototype.createRecievedBubble = function(m, data) {

	const messageText = MesiboUIUtils.decodeString(data);
	const messageTs = +new Date;
	if (m.filetype)
		MesiboUIUtils.createImageRecievedBubble({
			'fileurl': m.fileurl,
			'ts': messageTs,
			'data': messageText
		})
	else {
		MesiboUIUtils.createRecievedBubble({
			'data': messageText,
			'ts': messageTs
		});
	}
	MesiboUIUtils.updateScroll();
}

MesiboAppCore.prototype._sendFiletoPeer = function(pPeerId, pMsgId, fileURL, thumbnail, message) {
	var p = {};
	p.peer = pPeerId;
	p.flag = MESIBO_FLAG_DELIVERYRECEIPT | MESIBO_FLAG_READRECEIPT;

	var msg = {};
	msg.type = 1;
	msg.size = 0;
	msg.url = fileURL;
	MesiboLog(msg.url)
	msg.title = "Test Image";
	msg.message = message;
	msg.tn = thumbnail;
	MesiboLog("------Sending File------");
	MesiboLog(p)
	MesiboLog(msg)
	this.mesiboModule.sendFile(p, pMsgId, msg);

}

MesiboAppCore.prototype.sendFile = function() {
	var p = {};
	p.peer = this.selectedUser;

	var id = api.random();

	msg_payload = {
		'id': id,
		'peer': p.peer,
		'params': p,
		'data': MesiboUIUtils.getElementById("comment").value,
		'groupid': 0,
		'ts': +new Date,
		'flag': 0,
		'status': MESIBO_MSGSTATUS_OUTBOX,
		'origin': MESIBO_MSG_ORIGIN_SENT, // TBD
		'filetype': 1, // 1 for image
	};

	this.checkAndCreateDateHeader(msg_payload);

	this.AppStorage.newItemSent(id, p.peer, msg_payload);
	this.AppStorage.msgPeerHash(id, p.peer);

	uploadAndSendFile(msg_payload, accessToken, AppStorage);

	MesiboUIUtils.updateLastMsg(MesiboUIUtils.getUserFromPhone(p.peer, this.phoneBook), p.peer);
	MesiboUIUtils.updateScroll();
	MesiboUIUtils.updateUserListOrder(PhoneBook);

}


MesiboAppCore.prototype._sendReadReceipt = function(pPeerId, pMsgId) {
	var p = {};
	p.peer = pPeerId;
	this.mesiboModule.sendReadReceipt(p, pMsgId);
}

MesiboAppCore.prototype.sendMessage = function() {
	var p = {};
	p.peer = this.selectedUser;
	p.flag = MESIBO_FLAG_DELIVERYRECEIPT | MESIBO_FLAG_READRECEIPT;
	var id = this.mesiboModule.random();
	msgdata = document.getElementById("comment").value;
	if (msgdata) {
		msg_payload = {
			'id': id,
			'peer': p.peer,
			'params': p,
			'data': msgdata,
			'groupid': 0,
			'ts': +new Date,
			'flag': 0,
			'status': MESIBO_MSGSTATUS_OUTBOX
		};

		this.checkAndCreateDateHeader(msg_payload);

		this.appStorage.newItemSent(id, p.peer, msg_payload);
		this.appStorage.msgPeerHash(id, p.peer);

		MesiboUIUtils.createSentBubble(msg_payload);

		MesiboLog("===> Sending Message with parameters ..", p, id, msgdata);
		this.mesiboModule.sendMessage(p, id, msgdata);
		document.getElementById("comment").value = "";

		MesiboUIUtils.updateLastMsg(MesiboUIUtils.getUserFromPhone(p.peer, this.phoneBook), p.peer);
		MesiboUIUtils.updateScroll();
		this.updateUserListOrder();
	}
}

MesiboAppCore.prototype.loadChatHistory = function(selectedUserName) {

	//Hide side panel  
	$(".side-two").css({
		"left": "-100%"
	});

	MesiboLog("===>loadChatHistory called " + selectedUserName);

	if (this.currentSelectedUserName)
		document.getElementById(this.currentSelectedUserName).style.backgroundColor =
		"#fff";

	MesiboLog(this.phoneBook);
	this.selectedUser = this.phoneBook[selectedUserName]['phone'];

	if (!(this.activeUserList.includes(this.selectedUser))) {
		MesiboUIUtils.createActivePeerBlock(selectedUserName, this.phoneBook);
		this.activeUserList.push(this.selectedUser);
	}


	MesiboUIUtils.setInnerHtml('SelectedUserName',selectedUserName);
	MesiboUIUtils.setAttribute('SelectedUserPicture','src', "https://appimages.mesibo.com/" + this.phoneBook[selectedUserName]['photo']);

	document.getElementById(selectedUserName).style.backgroundColor = "#e5e5e5";
	$('#conversation').empty();
	this.appStorage.loadHistory(this.selectedUser);
	MesiboUIUtils.updateLastMsg(selectedUserName, this.selectedUser);


	const lastReceivedMsgId = this.appStorage.getLastReceived(this.selectedUser);
	if (lastReceivedMsgId) //If there is at least one recieved message
		this._sendReadReceipt(selectedUserName, lastReceivedMsgId);

	this.currentSelectedUserName = selectedUserName;
	MesiboUIUtils.updateScroll();

}

MesiboAppCore.prototype.showVideoHolder = function(){
  const v = document.getElementById('videoHolder');
  v.style.display = 'block';
  this.getMesiboInstance().setupVideoCall("localVideo", "remoteVideo", true);
  this.getMesiboInstance().call(this.getSelectedUser());
}

MesiboAppCore.prototype.closeVideoHolder= function(){
  MesiboLog("Close Video");
  const v = document.getElementById('videoHolder');
  v.style.display = 'none';
  this.getMesiboInstance().hangup(0);
  return false ;
}
