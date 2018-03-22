

'use strict';
const obj = require('./objects');

const conn = require('./connection');
const ip = require('ip');
console.log('IP Address: ' + ip.address('public'));
//var userList = obj.userList;
conn.startHttpServer();
conn.startP2PServer();

conn.UserList.push(new obj.User('1001', 'John'));
conn.UserList.push(new obj.User('1002', 'Asad'));
conn.UserList.push(new obj.User('1003', 'Saad'));
conn.UserList.push(new obj.User('1004', 'Noman'));


//console.log('before debugger');
//debugger;
//console.log('after debugger');



