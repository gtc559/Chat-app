const express = require('express');
const { Socket } = require('socket.io');

const app = express();

const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html' )
})
app.use(express.static(__dirname+'/public'));

http.listen(PORT, ()=>{
    console.log(`listning in Port: ${PORT}`)
})

// socket 
// import socket
const io = require('socket.io')(http);

// io.on => connection client or browser then call this function
io.on('connection', (socket)=>{
    console.log("connected....")

    socket.on('message',(msg)=>{
        // console.log(msg)// only terminal
        socket.broadcast.emit('message', msg);

       
    })
})


