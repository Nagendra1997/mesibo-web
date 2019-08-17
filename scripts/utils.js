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


function createDateHeader(msg_data,previous_date){
        var current_date=dateNow(msg_data['ts']);

        if(previous_date==0){
          previous_date = current_date;

          var iDiv=document.createElement('div');
          iDiv.className="row message-previous";
          var innerDiv=document.createElement('div');
          innerDiv.className="col-sm-12 previous";
          var headerDiv=document.createElement('div');
          headerDiv.className='date_header';
          var datetext=document.createTextNode(current_date);
          
          headerDiv.append(datetext);
          innerDiv.append(headerDiv);
          iDiv.append(innerDiv);

          var mylist = document.getElementById("conversation")
          mylist.appendChild(iDiv);

        }
        return previous_date;
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

function updateLastMsg(peer){
  var lastMsgId = String(peer)+"_LastMsg";
  var lastMsgDateId = String(peer)+"_LastDate";
  var lastMsgStatusId = String(peer)+"_LastStatus";

  var lastMsgArea=document.getElementById(lastMsgId);
  $(lastMsgId).text('');
  var lastMsgDateArea=document.getElementById(lastMsgDateId);
  $(lastMsgDateId).text('');
  var lastMsgStatusArea=document.getElementById(lastMsgStatusId);
  // console.log(lastMsgStatusArea);

  var retrievedMsgArray = localStorage.getItem(peer);
  retrievedMsgArray=JSON.parse(retrievedMsgArray);

  if(retrievedMsgArray){

  var lastMsgContent=retrievedMsgArray[retrievedMsgArray.length -1];
  if(lastMsgContent['data'].length > 25)
      lastMsgArea.innerHTML=lastMsgContent['data'].slice(0,25) + " ...";
  else
      lastMsgArea.innerHTML=lastMsgContent['data'];
  
  lastMsgDateArea.innerHTML=timeNow2(lastMsgContent['ts']);
  // console.log(lastMsgContent);

  if(lastMsgContent['flag']==3)
    lastMsgStatusArea.setAttribute("src","");
  else {
    // console.log("Updating",lastMsgStatusArea,lastMsgContent['status']);
    updateStatusTick(lastMsgStatusArea,lastMsgContent['status']);
    }
  }

}

function getLastTs(peer){
  var retrievedMsgArray = localStorage.getItem(peer);
  retrievedMsgArray=JSON.parse(retrievedMsgArray);
  if(retrievedMsgArray){
  var lastMsgContent=retrievedMsgArray[retrievedMsgArray.length -1];
  return lastMsgContent['ts'];
  }
  else
    return 0 ;
}

function updateUserListOrder(){
  var $divs = $("#UserList .row.sideBar-body");
  var TimeOrderedDivs = $divs.sort(function(a,b){
        return getLastTs(b.id) - getLastTs(a.id);
    });
    $("#UserList").html(TimeOrderedDivs);
}

