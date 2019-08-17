//localstorage.js

function LocalStorage_LoadHistory(selected_user){
  
      msg_history=JSON.parse(localStorage.getItem(selected_user));

      if(msg_history){

      var msg_hist_data=Object.keys(msg_history).map(function(key){return msg_history[key];});
      // msg_hist_data.sort(function(a,b){return a.ts - b.ts;});

      var previous_date=0;

      for (var i=0;i<msg_hist_data.length;i++){

        var msg_data = msg_hist_data[i];
        previous_date =createDateHeader(msg_data,previous_date);

        if(msg_data['flag'] == 0)
          createSentBubble(msg_data); 
        else
          createRecievedBubble(msg_data);
        }
        updateLastMsg(selected_user);

    }
}

//m is the message object

function LocalStorage_UpdateItemSent(m){
  // console.log(m);
  console.log("===>LocalStorage_UpdateItemSent called");
  var retrievedMsgArray = localStorage.getItem(m.peer); 
  //MsgList Entry Will always exist if msg sent.No need to check
  var jsonMsgArray=JSON.parse(retrievedMsgArray);
  // console.log(jsonMsgArray);

  for (var i=jsonMsgArray.length-1;i>=0;i--){
    if(jsonMsgArray[i]['id']== m.id){
      jsonMsgArray[i]['params']=m;
      jsonMsgArray[i]['status']=m.status;
      }
    }
        
  localStorage.setItem(m.peer,JSON.stringify(jsonMsgArray));

}

function LocalStorage_UpdateItemRecieved(m,string){
  console.log("===>LocalStorage_UpdateItemRecieved called");
  var retrievedMsgArray  = localStorage.getItem(m.peer);
  var jsonMsgArray = [];

    if(retrievedMsgArray)
      jsonMsgArray=JSON.parse(retrievedMsgArray);
   
    jsonMsgArray.push({'id':m.id,'peer':m.peer,'params':m,'data':string,'groupid':0,'ts':+ new Date,'flag':m.flag});
    localStorage.setItem(m.peer,JSON.stringify(jsonMsgArray));
}

function LocalStorage_NewItemSent(id,peer,msg_payload){
  console.log("===>LocalStorage_NewItemSent called");
  var retrievedMsgArray = localStorage.getItem(peer);
      
  if(retrievedMsgArray)
    retrievedMsgArray=JSON.parse(retrievedMsgArray);
  else
    retrievedMsgArray=[];

  retrievedMsgArray.push(msg_payload);
  localStorage.setItem(peer,JSON.stringify(retrievedMsgArray));

  // console.log(JSON.parse(localStorage.getItem(peer)));
}


function LocalSorage_MsgPeerHash(msgId,peer){
  var retrievedMsgHash = localStorage.getItem("Mesibo_MsgUsr_Hash");
  if(retrievedMsgHash)
    retrievedMsgHash = JSON.parse(retrievedMsgHash);
  else
    retrievedMsgHash = {};

    retrievedMsgHash[msgId]=peer;
    localStorage.setItem("Mesibo_MsgUsr_Hash",JSON.stringify(retrievedMsgHash));

  
}

function LocalStorage_GetPeerFromId(msgId){

  var retrievedMsgHash = localStorage.getItem("Mesibo_MsgUsr_Hash");
  if(retrievedMsgHash)
    retrievedMsgHash = JSON.parse(retrievedMsgHash);
  else {
    console.log("Error: Invalid message ID");
    return -1;
  }

  return retrievedMsgHash[msgId];

}

