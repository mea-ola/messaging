var app   = require('http').createServer(handler),
    io    = require('socket.io')(app),
    redis = require('socket.io-redis'),
    debug = require('debug')('messaging:server')
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

io.on('connection', socket => {
  debug("Client add " + socket.id);
  io.emit('message', { data: 'User Connected ' + socket.id });
  
  // Do some user autorization and get current user info.
  socket.join('user1'); // And use some user registration token
  
  
  socket.on('message', data => {
    debug(data);
    io.emit('message', {
      from: socket.id,
      data  
    });
  });
  
});