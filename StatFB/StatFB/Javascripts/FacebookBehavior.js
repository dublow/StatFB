var http = new HttpRequest(false);

var Factory = {
    get: function (classname) {
        switch (classname) {
            case 'init':
                return new Init();
            case 'initthrow':
                return new InitThrow();
            case 'connect':
                return new Connect();
            default:
                return null;
        }
    }
};

var Status = function (action, message, data) {
    this.action = action;
    this.message = message;
    this.data = data;
};

var InitThrow = function () {
    this.init = function (context, callback) {
        http.post('/Home/Configthrow', {})
            .done(function (response) {
                
            })
            .fail(function (response) {
                response.statusText = "Impossible de charger le SDK Facebook.";
                if (callback)
                    callback(response);
            });
    };
};

var Init = function () {
    this.init = function (context, callback) {
        http.post('/Home/Config', {})
            .done(function (response) {
                context.config = response.data;

                window.fbAsyncInit = function () {

                    FB.init({
                        appId: context.config.appId,
                        xfbml: true,
                        version: 'v2.1'
                    });

                    if (callback)
                        callback(new Status('Init', 'Ok', null));

                    $('#fb-root').trigger('facebook:init');

                };

                (function (d, s, id) {
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

var Connect = function () {
    this.connect = function (context, selectorId, callback) {
        $('#' + selectorId).on('click', function () {
            var forCallback = new Status('Connect', 'Init', {});
            FB.login(function (response) {
                forCallback.data.login = response;
                if (response.authResponse) {
                    forCallback.message = 'Ok';
                    FB.api('/me', function (me) {
                        forCallback.data.me = me;
                        callback(forCallback);
                    });
                } else {
                    forCallback.message = "Cancel or not fully authorize";
                    callback(forCallback);
                }
            }, { scope: context.config.scope });
        });
    };
};