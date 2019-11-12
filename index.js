var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var connected = 0
io.on('connection', function(socket){
  connected++
  console.log("connected", connected)
  socket.name = "Anonymous";
  socket.Namespace = "/room"
  
  if (connected <= 2) {
    socket.room = "123"
    console.log("socket.room", socket.room)
    socket.join(socket.room)
  } 

  console.log('a user connected ==>', socket.Namespace, "name: ", socket.name );

  socket.on('send message', (data) => {
    console.log(data)
    // io.sockets.emit('new message', {msg: data});
    socket.broadcast.to(socket.room).emit('new message', { msg: data })
  });

  socket.on('disconnect', (data) => {
    console.log("data is ==>", data);
  });

  socket.emit("time", new Date());
  
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
