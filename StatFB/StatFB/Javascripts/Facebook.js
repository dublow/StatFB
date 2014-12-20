var Facebook = (function () {
    var facebook = function (initBehavior, connectedBehavior, connectBehavior, friendsBehavior) {
        this.initBehavior = initBehavior;
        this.connectedBehavior = connectedBehavior;
        this.connectBehavior = connectBehavior;
        this.friendsBehavior = friendsBehavior;
        this.config = {};
    };

    facebook.prototype = {        
        init: function(callback) {
            this.initBehavior.init(this, callback);
        },
        setInit: function (initBehavior) {
            this.initBehavior = initBehavior;
        },
        connected: function (callback) {
            this.connectedBehavior.connected(this, callback);
        },
        connect: function(selectorId, callback) {
            this.connectBehavior.connect(this, selectorId, callback);
        },
        friends: function (callback) {
            this.friendsBehavior.friends(this, callback);
        }
    };

    return facebook
})()