class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


class OnlineUser
{
    constructor(user_id, socket) {
        this.user_id = user_id;
        this.socket = socket;
    }

}

class Message{
    constructor(format, from, to, message, time) {
        this.format = format;
        this.from = from;
        this.to = to;
        this.message = message;
        this.time = time;
    }
}

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


var MessageFormat = {
    TEXT: 0,
    IMAGE: 1
};


module.exports.MessageFormat = MessageFormat;
module.exports.Message = Message;
module.exports.User = User;
module.exports.OnlineUser = OnlineUser;


