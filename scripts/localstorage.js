//localstorage.js


function  LocalStorage_LoadHistory(selected_user){
  
      msg_history=JSON.parse(localStorage.getItem(selected_user));

      if(msg_history){
      var msg_hist_data=Object.keys(msg_history).map(function(key){return msg_history[key];});
      msg_hist_data.sort(function(a,b){return a.ts - b.ts;});

      var previous_date=0;

      for (var i=0;i<msg_hist_data.length;i++){

        var msg_data = msg_hist_data[i];
        previous_date =createDateHeader(msg_data,previous_date);

        if(msg_data['flag'] == 0)
          createSentBubble(msg_data); 
        else
          createRecievedBubble(msg_data);
        }

    }
}

//m is the message object

function LocalStorage_UpdateItemSent(m){
  var retrievedMsgList = localStorage.getItem(m.peer); 
  //MsgList Entry Will always exist if msg sent.No need to check
  var jsonMsgList=JSON.parse(retrievedMsgList );
      
  jsonMsgList[m.id]['params']=m;
  jsonMsgList[m.id]['status']=m.status;

  localStorage.setItem(m.peer,JSON.stringify(jsonMsgList));

}

function LocalStorage_UpdateItemRecieved(m,string){
  var retrievedMsgList  = localStorage.getItem(m.peer);
  var jsonMsgList = {};

    if(retrievedMsgList)
      var jsonMsgList=JSON.parse(retrievedMsgList );
   
    jsonMsgList[m.id]={'id':m.id,'peer':m.peer,'params':m,'data':string,'groupid':0,'ts':+ new Date,'flag':m.flag};

    localStorage.setItem(m.peer,JSON.stringify(jsonMsgList));
}

function LocalStorage_NewItemSent(id,peer,msg_payload){
  var retrievedMsgList = localStorage.getItem(peer);
      
  if(retrievedMsgList)
    var msg_hash=JSON.parse(retrievedMsgList);
  else
    msg_hash={};

  msg_hash[id]=msg_payload;
  localStorage.setItem(peer,JSON.stringify(msg_hash));
  retrievedMsgList  = localStorage.getItem(peer);
  console.log(retrievedMsgList);
}
