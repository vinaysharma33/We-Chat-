const socket=io('http://localhost:8000');

//Get DOM elements 
const form=document.getElementById('form');
const messageInput=document.getElementById('message');
const messageContainer=document.querySelector(".container");

//Audio that will play on receiving message
var audio=new Audio('ting.mp3');

// function which will append event info to the container
const append= (message,position)=>{
      const messageElement=document.createElement('div');
      messageElement.innerText=message;
      messageElement.classList.add('message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement);
      if(position=='left'){
          audio.play()
      }
}

//Ask new user for his/her name and let the server know
const name=prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//If a new user joins,receive his/her name from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});

//If the server sends message,receive it
socket.on('receive',data=>{
    append(data.name+':'+ data.message,'left')
});

//If someone leaves the chat,append it to container
socket.on('left',name=>{
    append(name +' left the chat','right');
});

//Submit the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append('you:'+message,'right');
    socket.emit('send',message);
    messageInput.value=''
});
