var Facebook = (function ($) {
    var facebook = function(init, connect) {
        this.init = init;
        this.connect = connect;
    };

    facebook.prototype = {        
        init: function() {
            this.init();
        },
        connect: function() {
            this.connect();
        }
    };
    
    //var InitPreProd = funct

    return facebook;
})(jQuery)