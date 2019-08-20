//utils.js      
      const MESIBO_READFLAG_READRECEIPT = 1;
      const MESIBO_READFLAG_SENDLAST = 2;
      const MESIBO_READFLAG_FIFO = 4;
      const MESIBO_READFLAG_SUMMARY = 0x10;
      const MESIBO_READFLAG_SENDEOR = 0x20;
      const MESIBO_READFLAG_WITHFILES = 0x80;

      const MESIBO_MSGSTATUS_OUTBOX         =0
      const MESIBO_MSGSTATUS_SENT           =1
      const MESIBO_MSGSTATUS_DELIVERED      =2
      const MESIBO_MSGSTATUS_READ           =3
      const MESIBO_MSGSTATUS_RECEIVEDNEW    =0x12
      const MESIBO_MSGSTATUS_RECEIVEDREAD   =0x13
      const MESIBO_MSGSTATUS_CALLMISSED     =0x15
      const MESIBO_MSGSTATUS_CALLINCOMING   =0x16
      const MESIBO_MSGSTATUS_CALLOUTGOING   =0x17
      const MESIBO_MSGSTATUS_CUSTOM         =0x20

      const MESIBO_MSGSTATUS_FAIL           =0x80
      const MESIBO_MSGSTATUS_USEROFFLINE    =0x81
      const MESIBO_MSGSTATUS_INBOXFULL      =0x82
      const MESIBO_MSGSTATUS_INVALIDDEST    =0x83
      const MESIBO_MSGSTATUS_EXPIRED        =0x84
      const MESIBO_MSGSTATUS_BLOCKED        =0x88


      const MESIBO_ORIGIN_REALTIME = 0;
      const MESIBO_ORIGIN_DBMESSAGE = 1;
      const MESIBO_ORIGIN_DBSUMMARY = 2;
      const MESIBO_ORIGIN_DBPENDING = 3;
      const MESIBO_ORIGIN_FILTER = 4;

    

      function timeNow() {
        
        var d = new Date();
        h = (d.getHours()<10?'0':'') + d.getHours();
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
        return  h + ':' + m;
      }

      function timeNow2(ts){
        var theDate = new Date(ts);
        dateString = theDate.toLocaleTimeString();
        return dateString.slice(0,5);
      }

      function dateNow(ts){
        var theDate = new Date(ts);
        dateString = theDate.toString();
        return dateString.slice(0,4)+', '+dateString.slice(4,10);
      }

      function dateYesterday(ts){
        var today = new Date(ts);
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        yesterdayString = yesterday.toString();

        return yesterdayString.slice(0,4)+', '+ yesterdayString.slice(4,10);
      }


function createRecievedBubble(msg_data){
  var msgBodyDiv = document.createElement('div');
  msgBodyDiv.className = "row message-body";
  var topReceiverDiv = document.createElement('div');
  topReceiverDiv.className = 'col-sm-12 message-main-receiver'; //top receiver-div-class
  var receiverDiv = document.createElement('div');
  receiverDiv.className = 'receiver';
  var textDiv = document.createElement('div');
  textDiv.className= 'message-text';
  var timeSpan = document.createElement('span');
  timeSpan.className = 'message-time pull-right';
  
  var msgcontent=document.createTextNode(msg_data['data']);
  var timecontent=document.createTextNode(timeNow2(msg_data['ts']));

  textDiv.append(msgcontent);
  timeSpan.append(timecontent);
  receiverDiv.append(textDiv);
  receiverDiv.append(timeSpan);
  topReceiverDiv.appendChild(receiverDiv);
  msgBodyDiv.appendChild(topReceiverDiv);

  var mylist = document.getElementById("conversation");
  mylist.appendChild(msgBodyDiv);

  }

function createSentBubble(msg_data){

  var msgBodyDiv = document.createElement('div');
  msgBodyDiv.className = "row message-body";
  var topSenderDiv = document.createElement('div');
  topSenderDiv.className = 'col-sm-12 message-main-sender'; //top sender-div-class
  var senderDiv = document.createElement('div');
  senderDiv.className = 'sender';
  var textDiv = document.createElement('div');
  textDiv.className= 'message-text';
  var timeSpan = document.createElement('span');
  timeSpan.className = 'message-time pull-right';

  var statusTick = document.createElement('img');
  statusTick.className = 'status_msg_img';
  updateStatusTick(statusTick,msg_data['status']);
  statusTick.setAttribute("id",msg_data['id']);
  
  var msgcontent=document.createTextNode(msg_data['data']);
  var timecontent=document.createTextNode(timeNow2(msg_data['ts']));

  textDiv.append(msgcontent);
  timeSpan.append(timecontent);
  timeSpan.append(statusTick);
  senderDiv.append(textDiv);
  senderDiv.append(timeSpan);
  topSenderDiv.appendChild(senderDiv);
  msgBodyDiv.appendChild(topSenderDiv);

  var mylist = document.getElementById("conversation");
  mylist.appendChild(msgBodyDiv);
      
}


function createDateHeader_forHistory(msg_data,previous_date){
        var current_date=dateNow(msg_data['ts']);

        if(previous_date==0){
          previous_date = current_date;
          // createDateHeaderBlock(current_date);
          console.log("Making header for date"); 
            
            if(current_date == dateNow(new Date()))
              createDateHeaderBlock("Today");
            else if(current_date == dateYesterday(new Date()))
              createDateHeaderBlock("Yesterday");
            else
              createDateHeaderBlock(current_date);
          }
          
        return previous_date;
}

function createDateHeaderBlock(date_value){
          var iDiv=document.createElement('div');
          iDiv.className="row message-previous";
          var innerDiv=document.createElement('div');
          innerDiv.className="col-sm-12 previous";
          var headerDiv=document.createElement('div');
          headerDiv.className='date_header';
          var datetext=document.createTextNode(date_value);
          
          headerDiv.append(datetext);
          innerDiv.append(headerDiv);
          iDiv.append(innerDiv);

          var mylist = document.getElementById("conversation")
          mylist.appendChild(iDiv);
}

function getUserFromPhone(phone_number,phone_book){
        console.log(phone_number,phone_book);
        user_list = Object.keys(phone_book);
       

        for (var i = 0 ;i< user_list.length;i++){
        console.log(phone_book[user_list[i]]['phone'] == phone_number)          
          if(phone_book[user_list[i]]['phone'] == phone_number)
            return user_list[i];
        }

        console.log("User does not exist with phone phone number",phone_number);
        return -1;
      }


function updateStatusTick(statusTick,status){
    if(statusTick){

    switch(status){

    case MESIBO_MSGSTATUS_SENT:
      statusTick.setAttribute("src","images/whatsapp_single_tick.png");
      break;

    case MESIBO_MSGSTATUS_DELIVERED:
      statusTick.setAttribute("src","images/whatsapp_double_tick.png");
      break;

    
    case MESIBO_MSGSTATUS_READ:
      statusTick.setAttribute("src","images/whatsapp_double_tick_coloured.png");
      break;

    default:
      statusTick.setAttribute("src","images/ic_av_timer.png");

    }
  }

}

function updateScroll(){
  var objDiv = document.getElementById("conversation");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function updateProfilePic(user_name,file_path){
  document.getElementById(user_name).setAttribute("src",file_path);
}

function updateLastMsg(selected_user_name,selected_user_id){
  var lastMsgId = String(selected_user_name)+"_LastMsg";
  var lastMsgDateId = String(selected_user_name)+"_LastDate";
  var lastMsgStatusId = String(selected_user_name)+"_LastStatus";

  var lastMsgArea=document.getElementById(lastMsgId);
  $(lastMsgId).text('');
  var lastMsgDateArea=document.getElementById(lastMsgDateId);
  $(lastMsgDateId).text('');
  var lastMsgStatusArea=document.getElementById(lastMsgStatusId);
  // console.log(lastMsgStatusArea);

  var retrievedMsgArray = localStorage.getItem(selected_user_id);
  retrievedMsgArray=JSON.parse(retrievedMsgArray);

  console.log("Last Message",retrievedMsgArray);
  if(retrievedMsgArray){
  console.log("Last Message",retrievedMsgArray);

  var lastMsgContent=retrievedMsgArray[retrievedMsgArray.length -1];
  if(lastMsgContent['data'].length > 20)
      lastMsgArea.innerHTML=lastMsgContent['data'].slice(0,20) + " ...";
  else
      lastMsgArea.innerHTML=lastMsgContent['data'];
  
  lastMsgDateArea.innerHTML=timeNow2(lastMsgContent['ts']);


  if(lastMsgContent['flag']==3){ //Message Recieved, Don't show status tick
    lastMsgStatusArea.style.display = "none";
  }
  else {
    lastMsgStatusArea.style.display = "inline";
    updateStatusTick(lastMsgStatusArea,lastMsgContent['status']);
    }
  }

}

function getLastTs(selected_user_id){
  var retrievedMsgArray = localStorage.getItem(selected_user_id);

  retrievedMsgArray=JSON.parse(retrievedMsgArray);
  if(retrievedMsgArray){
  console.log(retrievedMsgArray);
  var lastMsgContent=retrievedMsgArray[retrievedMsgArray.length - 1];
  return lastMsgContent['ts'];
  }
  else
    return 0 ;
}

function updateUserListOrder(phone_book){
  var $divs = $("#UserList .row.sideBar-body");
  var TimeOrderedDivs = $divs.sort(function(a,b){
        return getLastTs(phone_book[b.id]['phone']) - getLastTs((phone_book[a.id]['phone']));
    });
    $("#UserList").html(TimeOrderedDivs);
}

Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}

