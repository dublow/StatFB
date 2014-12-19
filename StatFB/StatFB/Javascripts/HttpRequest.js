var HttpRequest = (function ($) {
    var isProdContext = false,
        httpRequest = function (isProd) {
            this.isProd = isProd;
             isProdContext = isProd;
        },
        response = function (httpCode, statusText, statusCode, data) {
            this.httpCode = httpCode;
            this.statusText = statusText;
            this.statusCode = statusCode;
            this.data = data;
        };

    httpRequest.prototype.get = function (url) {
        return request('get', url, null);
    };

    httpRequest.prototype.post = function(url, data) {
        return request('post', url, data);
    };

    var request = function (type, url, data) {
        var storedPending,
            isPending = true,
            ajax = $.ajax({ url: url, type: type, dataType: 'json', data: data });

        return {
            isProd: isProdContext,
            pending: function (fcn) {
                storedPending = fcn;
                if(storedPending)
                    storedPending(isPending);
                return this;
            },
            done: function (fcn) {
                var that = this;
                ajax.done(function (result, statusCode, message) {
                    fcn(new response(message.status, statusCode, message.statusText, result));
                    isPending = false;
                    that.pending(storedPending);
                    return that;
                });
            },
            fail: function (fcn) {
                var that = this;
                ajax.fail(function (obj, statusCode, statusText) {
                    fcn(new response(obj.status, statusCode, statusText, isProdContext ? null : { stackTrace: obj.responseText }));
                    isPending = false;
                    that.pending(storedPending);
                    return that;
                });
            }
        };
    };
    
    return httpRequest;
})(jQuery);