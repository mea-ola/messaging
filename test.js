var jwt = require('jsonwebtoken');

var token = jwt.sign({
	user_id: 0
}, 'secret');
console.log(token)

var token = jwt.sign({
	user_id: 1
}, 'secret');
console.log(token)

var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
setInterval(function(){
  io.in('user1').emit('message', new Date);
}, 5000);

// 0 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjowLCJpYXQiOjE0NDAwNDM1Njh9.W4lfi3CjEFkeFsrMaVToEKrfY9slJ5V5fmi35n4ZQmU
// 1 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE0NDAwNDM1Njh9.vbwctfyljKNeiMsEIaCrn6D6JMyElm7lwlaa_xHzvjc
