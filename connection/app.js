var app   = require('http').createServer(handler),
    io    = require('socket.io')(app),
    redis = require('socket.io-redis'),
    debug = require('debug')('messaging:server'),
    socketioJwt = require('socketio-jwt')
;

io.adapter(redis({ host: 'localhost', port: 6379 }));

var port = process.env.PORT || 3000;
app.listen(port, () => {
  debug("Server listening on port " + port);
});

function handler (req, res) {
  res.writeHead(200);
  res.end();
}

io.on('connection', socketioJwt.authorize({
    secret: 'secret',
    timeout: 15000 // 15 seconds to send the authentication message
  }))
  .on('authenticated', socket => {
  
    debug("Client add " + socket.id);
    debug(JSON.stringify(socket.decoded_token, null, 4));
    socket.join(`user(${socket.decoded_token.user_id})`); // And use some user registration token
      
    socket.on('message', data => {
      debug(data);
      io.emit('message', {
        from: socket.id,
        data  
      });
    });
    
  });
