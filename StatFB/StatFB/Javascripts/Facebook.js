var Facebook = (function ($, http) {
    var facebook = function (initBehavior, connectBehavior) {
        this.initBehavior = initBehavior;
        this.connectBehavior = connectBehavior;
    };

    var Status = function(action, message) {
        this.action = action;
        this.message = message;
    };

    facebook.prototype = {        
        init: function(callback) {
            this.initBehavior.init(callback);
        },
        connect: function() {
            this.connectBehavior.connect();
        }
    };

    var Init = function() {
        this.init = function(callback) {
            http.post('/home/config', {})
                .done(function(response) {
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: response.data.appId,
                            xfbml: true,
                            version: 'v2.1'
                        });

                        if (callback)
                            callback(new Status('Init', 'Ok'));
                    };

                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                })
                .fail(function (response) {
                    response.statusText = "Impossible de charger le SDK Facebook.";
                    if (callback)
                        callback(response);
                });
        };
    };
    
    
    
    var Connect = function() {
        this.connect = function() {
            console.log("FB connect");
        };
    };

    var Factory = {
        get: function(classname) {
            switch (classname) {
            case 'init':
                return new Init();
            case 'connect':
                return new Connect();
            default:
                return null;
            }
        }
    };

    var fb = new facebook(Factory.get('init'), Factory.get('connect'));
    return fb;
})(jQuery, new HttpRequest(false))