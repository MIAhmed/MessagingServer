'use strict';
//var CryptoJS = require("crypto-js");
var express = require("express");
var bodyParser = require('body-parser');
var WebSocket = require("ws");

this.http_port = process.env.HTTP_PORT || 6900;
this.p2p_port = process.env.P2P_PORT || 6700;
//this.initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []; //"ws://127.0.0.1:6800"

const obj = require('./objects');


this.onlineUsers = [];

this.UserList = [];
this.AllMessages = [];
this.MessageQueue = [];



this.startHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });

    
    app.get('/peers', (req, res) => res.send(this.sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort)));
    app.get('/getMessageTypes', (req, res) => res.send(JSON.stringify(MessageType)));
    app.listen(this.http_port, () => console.log('Listening HTTP on port: ' + this.http_port));
};


this.startP2PServer = () => {
    var server = new WebSocket.Server({ port: this.p2p_port });
    server.on('connection', ws => initalizeConnection(ws));
    console.log('Listening Websocket P2P Port on: ' + this.p2p_port);

};

var initalizeConnection = (ws) => {
    this.onlineUsers.push(ws);
    wsMessageHandler(ws);
    wsErrorHandler(ws);
    this.wsSendMessage(ws, { 'type': MessageType.CONNECTED, 'data': ws._socket.remoteAddress + ':' + ws._socket.remotePort });
};

var MessageType = {
    CONNECTED: 0,
    LOGIN: 1,
    LOGIN_RESPONSE: 2,
    SIGNUP: 3,
    SIGNUP_RESPONSE: 4,
    SEND: 1,
    RECIEVED: 2,
    READ: 3,
    READ_RESPONSE: 4,
    BROADCAST: 5
    
};

var wsMessageHandler = (ws) => {
    ws.on('message', (data) => {
        var msg = JSON.parse(data);
        console.log("Message Recived: " + data);
        switch (msg.type) {
            case MessageType.LOGIN:
                onLoginHandler(ws, msg);
                //this.wsSendMessage(ws, { 'type': MessageType.LOGIN_RESPONSE, 'data': 'Login Success' });
                break;
            case MessageType.SIGNUP:
                this.wsSendMessage(ws, { 'type': MessageType.SIGNUP_RESPONSE, 'data': 'Signup Success' });
                break;
            case MessageType.SEND:
                onSendHandler(ws, msg);
                //this.wsSendMessage(ws, { 'type': MessageType.RECIEVED, 'data': msg.data });
                break;
            case MessageType.READ:
                this.wsSendMessage(ws, { 'type': MessageType.READ_RESPONSE, 'data': 'Specific Message of user' });
                break;
            case MessageType.READ_RESPONSE:
                break;
           
        }

    })
};



function onSendHandler(ws, msg) {
    var sendTo = msg.to;
    var tmpOnlineUserIndx = -1;
    for (var i = 0; i < this.onlineUsers.length; i++) {
        if (this.onlineUsers[i].user_id == sendTo) {
            tmpOnlineUserIndx = i;
            break;
        }
    }


}

function onLoginHandler(ws, msg) {

    for (var i = 0; i < this.onlineUsers.length; i++) {
        if (this.onlineUsers[i].user_id == msg.user_id) {
            this.onlineUsers[i].splice(i, 1);
        }
    }
    
    this.onlineUsers.push(new obj.OnlineUser(msg.user_id, ws));
    this.wsSendMessage(ws, { 'type': MessageType.LOGIN_RESPONSE, 'data': 'Login Success' });

    console.log("OnLogin ws: " + ws + " data:" + msg);
    console.log("OnLogin ws: " + ws._socket.remoteAddress + ':' + ws._socket.remotePort );

}

function onLogoutHandler(ws, msg)
{
    for (var i = 0; i < this.onlineUsers.length; i++) {
        if (this.onlineUsers[i].socket == ws)
        {
            this.onlineUsers[i].splice(i, 1);// not breaking as per multiple connections
        }
    }  
}


var wsErrorHandler = (ws) => {
    var closeConnection = (ws) => {
        console.log('connection failed to peer: ' + ws.url);
        onLogoutHandler(ws);
        
    };
    
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};


//this.wsConnectToPeers = (_Peers) => {
//    _Peers.forEach((peer) => {
//        var ws = new WebSocket(peer);
//        ws.on('open', () => initalizeConnection(ws));
//        ws.on('error', () => {
//            console.log('connection failed')
//        });
//    });
//};


this.wsSendMessage = (ws, message) => ws.send(JSON.stringify(message));
this.broadcast = (message) => this.sockets.forEach(socket => this.wsSendMessage(socket, message));

module.exports = this;



