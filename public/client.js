// variable  came client libarary
const socket = io(); // server and client are conncted

// next step
// 1. prompt box enter the chat section with username
let userName;
do{
   userName =  prompt('please Enter your Name')
}while(!userName)// jab user naame nhi dega prompt repeat krna hai

// next step : write a message in textArea and send Message

let textarea = document.querySelector('#textarea');
//The keyup event is sent to an element when the user releases a key on the keyboar
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
        // text area me jo message write krenge usko send krna
    }
})

// coming message and send message
function sendMessage(message){  // message = e.target.value
    // create new variable with username and message
    let msg = {
        user:userName,
        message:message.trim()
    }

    // append message in chat sectionand show client side then server side
    appendMessage(msg, 'outgoing'); // username and message client side se bhej rhe rhe hai
    textarea.value = '';
    scrollToBottom();

    //end me message ko server per bhejna hai (send to server via web socket connection)
    // socket.emit('message',{
    //     user:userName,
    //     message:message
    // }) ya fir
    socket.emit('message', msg);

}
//ye function dekhega konse type ka message hai incoming ya outgoing
// impoort messagreArea
let messagArea = document.querySelector('.message__area');
function appendMessage(msg,type){
    // message area type of message paas krne ke liye div create krna hoga
    let mainDiv = document.createElement('div');
    let className = type; // message ka type
    mainDiv.classList.add(className, 'message') // inc or out with message 

   /* markup bnana hoga  with username and message
    ye wala  let msg = {
        user:userName,
        message:msg
    }*/
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    // insert markup created maindiv
    mainDiv.innerHTML = markup;

    // append maindiv in message area
    messagArea.appendChild(mainDiv);
}


// recieve message
socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
   scrollToBottom();
})

// message scroll
function scrollToBottom(){
    messagArea.scrollTop = messagArea.scrollHeight;
}