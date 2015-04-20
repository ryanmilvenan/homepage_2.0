var db = require('./db.js');
var server = require('../server.js')
var cookieParser = require('cookie-parser');
var FeedParser = require('feedparser');
var request = require('request'); 
var uuid = require('node-uuid');
var sessions = require('./routes.js').sessions;


module.exports = function(socket) {
    var handshakeData = socket.handshake; 
    var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
    handshakeData.sessionID = sid.split('.')[0].substring(4); 
    var session = sessions[handshakeData.sessionID];
    if(session && session.loggedIn) {
        console.log("FOUND SESSION AND LOG IN");
        socket.emit('server:log-in', {username: session.user});
    }

    socket.on('disconnect', function() {
        console.log("DISCONNECTING");
        var handshakeData = socket.handshake; 
        var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
        handshakeData.sessionID = sid.split('.')[0].substring(4); 
        var session = sessions[handshakeData.sessionID];
        db.Session.findOne(handshakeData.sessionID, function(err, doc) {
            if(err) return console.error(err);
            if(!doc) {
                console.log("NO DOC FOUND");
                session.destroy(function(err) {
                    if(err) return console.error(err);
                });
            }
        });
    });
    
    socket.on('sources:retrieve', function() {
        var handshakeData = socket.handshake; 
        var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
        handshakeData.sessionID = sid.split('.')[0].substring(4); 
        var session = sessions[handshakeData.sessionID];

        if(session && session.loggedIn) {
            console.log("LOGGED IN");
        } else if(session) {
            console.log("session but no log in");
        }

        db.NewsSource.find(function(err, docs) {
            socket.emit('sources:found', docs);
            docs.forEach(function(doc) {
                getStream(doc.url, doc.sourceID);
            });
        });
    });

    socket.on('sources:import', function(docs) {
        var docs = JSON.parse(docs);
        socket.emit('sources:found', docs);
        docs.forEach(function(doc) {
            getStream(doc.url, doc.sourceID);
        });
    });

    socket.on('sources:remove', function(sourceID) {
        var sourceID = sourceID.sourceID;
        db.NewsSource.remove({sourceID: sourceID}, function(err, doc) {
            if(err) return console.error(err);
        });
        socket.emit('update:sources');
    });

    socket.on('sources:new', function(data) {
        console.log("Heard");
        var url = data.url;
        var title = data.title;
        var verified = verifySource(url);
        if(verified) {
            var sourceID = uuid.v4();
            var NewsSource = db.NewsSource;
            var newSource = new NewsSource({url: url, title: title, sourceID: sourceID});
            newSource.save(function(err, doc) {
                if(err) return console.error(err);
                console.log("New Source: " + doc);
            });
            socket.emit('update:sources');
        }
    });

    socket.on('client:log-in', function(data) {
        var user = data.email;
        var password = data.password;

        db.User.findOne({username: user}, function(err, doc) {
            if(doc && doc.username == user) {
                if (err) return console.error(err);
                doc.comparePassword(password, function(err, isMatch) {
                    if (err) return console.err(err);
                    if(isMatch) {
                        var handshakeData = socket.handshake; 
                        var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
                        handshakeData.sessionID = sid.split('.')[0].substring(4); 
                        var session = sessions[handshakeData.sessionID];
                        if(session) {
                            session.loggedIn = true;
                            session.user = user;
                            session.save(function(err) {
                                if(err) return console.err(err);
                            });
                        }
                        db.Session.findOne(handshakeData.sessionID, function(err, doc) {
                            if(err) console.error(err);
                            if(doc) {
                                var jsonSession = JSON.parse(doc.session);
                                var sessUser = jsonSession.user;
                                socket.emit('server:log-in', {username: sessUser});
                            }
                        });
                    } else {
                        socket.emit('server:invalid-password');
                    }
                });

            }
        });
    });

    socket.on('client:log-out', function(data) {
        var handshakeData = socket.handshake; 
        var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
        handshakeData.sessionID = sid.split('.')[0].substring(4); 
        var session = sessions[handshakeData.sessionID];
        if(session) {
            session.loggedIn = false;
            session.save(function(err) {
                if(err) return console.err(err);
            });
        }
    })

    socket.on('client:create-user', function(data) {
        var user = data.email;
        var password = data.password;

        db.User.findOne({username: user}, function(err, doc) {
            if(err) console.error(err);
            if(doc && doc.username == user) {
                socket.emit('server:user-exists');
            } else {
                var handshakeData = socket.handshake;
                var sid = handshakeData.headers.cookie.replace(/.*connect.sid=(.*)?.*/, '$1');
                handshakeData.sessionID = sid.split('.')[0].substring(4); 
                var User = db.User;
                var newUser = new User({username: user, password: password});
                newUser.save(function(err, doc) {
                    if(err) return console.error(err);
                });
                socket.emit('server:create-user');
            }
        });
    });

    var verifySource = function(url) {
        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (url.match(regex)) {
            //var req = request(url);
            //req.on('error', function(error) {
            //    socket.emit('source:invalid', {error: error});
            //    return false;
            //});
            //req.on('response', function(res) {
            //});
            return true;
        } else {
            socket.emit('source:invalid', {error: "Improperly formatted URL"});
            return false;
        } 
    };

    var getStream = function(url, sourceID) {
                    
        var req = request(url),
            feedparser = new FeedParser();

        req.on('error', function(error) {

        });
        req.on('response', function(res) {
            var stream = this;

            if(res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });

        feedparser.on('error', function(error) {

        });

        feedparser.on('readable', function() {
            var stream = this,
            meta = this.meta,
            item;

            while (item = stream.read()) {
                socket.emit('stream:item', {data:item, sourceID: sourceID});
            }
        });
    };
};

