=============================================
iMessagingServer | Build date: 22 March 2018 
=============================================

iMessagingServer provides websocket interface to send and recived messages to/from the users that are registered on server. For connected/login user message will be sent instantly, if the user is offline to whome message is being sent then will received message upon login.

Server listens on websocket port: 6700 
example  ws://ServerIP:6700 
Data: Server uses JSON for data manipulation  

MessageFormat:
==============
Server requires formated JSOM message of key/value pair, keys ("type" and "data") are required
"type" defines message type i.e (login, send, recived etc). for this need to use integer from the "MessageTypes" Enum give below.
"data" it contains relevent data for the message type inside.


Sample
{"type":1,"data":"{\"user_id\":1001}"}  
this message contains login request along with user id 1001


Steps
=====

1. First user need to connect to websocket.

2. Need to send login message with message type:1 and with 'user_id' inside the "data" value 
{"type":1,"data":"{\"user_id\":1001}"}  

upon successfull login, login successfull message will received. with messagetype :2 and description like this
{"type":2,"data":"Login Success"}


3. After the login user will be able to send/receive messages


For Sending Message
===================
MessageType:5 , "data" contains message (message can be refer from message class at end or from the sample message below )

{"type":5,"data":"{\"format\":\"text\",\"from\":\"1001\",\"to\":\"1002\",\"message\":\"Message goes here\",\"time\":\"12:00\"}"}

{"type":5,"data":"{\"format\":\"text\",\"from\":\"1001\",\"to\":\"1002\",\"message\":\"Hello, How are you\",\"time\":\"12:00\"}"}

"format" defines the format of message inside the "message", currently "text" only
"from" defines the sender's id.
"to" defines the receiver's id/
"message" defines the actual message that was sent.
"time" defines the timestamp of the message sent.


For Receiving/Listen Message 
============================
"type": 6 (means message is received)

sample message
 
{"type":6,"data":{"format":"text","from":"1001","to":"1002","message":"Hello, How are you","time":"12:00"}}
fields can be refer from sending message



Users
=====
Currently we have added only users from from user_id:1001 to user_id: 1004
 


MessageTypes
============
Here is Enum for the message types

var MessageType = {
    CONNECTED: 0,
    LOGIN: 1,
    LOGIN_RESPONSE: 2,
    SIGNUP: 3,
    SIGNUP_RESPONSE: 4,
    SEND: 5,
    RECIEVED: 6,
    READ: 7,
    READ_RESPONSE: 8,
    BROADCAST: 9,
    ERROR: 10
};

Message
=======
Properties can be refer from Message class

class Message{
    constructor(format, from, to, message, time) {
        this.format = format;
        this.from = from;
        this.to = to;
        this.message = message;
        this.time = time;
    }
}


