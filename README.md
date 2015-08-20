# Messaging
System for handling site group connections and app communication. 

### Setup
Using socket.io and socket.io-redis to run multiple nodes backed by redis pub/sub. This will sit on the event bus (code name greyhound? Thoughts?). Greyhound is responsible for all activity logging, and eventual write out to HDFS.

##### Quick start and hacking practice
- Run local redis
- Host public folder however
- Run two instances of `npm run watch`, change port with `PORT` environment.

Will run babel node with nodemon so changes are automaticly update on both instances. The reason for multiple instances is to insure durning development nothing will break being able to run multiple in production.

### Reason
Any client needing to push data will connect to messaging. Hooks into messaging can be made by other servies to push data to clients. More on this spec later.

### Usage Externally
The easiest way to use the room emiters is with socket.io-emitter. Connect to the redis backend and it will take care of the message layout. But if you must publish from another language, you can look at the socket.io-emitter source which will tell you to use msgpack with `data` and `room` as the two keys. Then publish that message to `socket.io#emitter`.
