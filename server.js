//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

'use strict';
const obj = require('./objects');

const conn = require('./connection');

var userList = obj.userList;
conn.startHttpServer();
conn.startP2PServer();

conn.userList.push(new obj.User('1001', 'John'));
conn.userList.push(new obj.User('1002', 'Asad'));
conn.userList.push(new obj.User('1003', 'Saad'));

console.log('before debugger');
debugger;
console.log('after debugger');



