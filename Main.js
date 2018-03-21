'use strict';

var userList = [];
const conn = require('./connection');

conn.startHttpServer();
conn.startP2PServer();

userList.push

console.log('before debugger');
debugger;
console.log('after debugger');
