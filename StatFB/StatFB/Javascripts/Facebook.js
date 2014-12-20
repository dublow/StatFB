var Facebook = (function () {
    var facebook = function (initBehavior, connectBehavior) {
        this.initBehavior = initBehavior;
        this.connectBehavior = connectBehavior;
        this.config = {};
    };

    facebook.prototype = {        
        init: function(callback) {
            this.initBehavior.init(this, callback);
        },
        setInit: function (initBehavior) {
            this.initBehavior = initBehavior;
        },
        connect: function(selectorId, callback) {
            this.connectBehavior.connect(this, selectorId, callback);
        }
    };

    return facebook
})()