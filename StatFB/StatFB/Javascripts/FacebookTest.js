QUnit.test('Facebook_when_init_success', function (assert) {
    var done = assert.async();
    Facebook.init(function (response) {
        assert.equal(response.action, 'Init', 'Action: Init');
        assert.equal(response.message, 'Ok', 'Message: Ok');
        assert.equal($('#facebook-jssdk').attr('src'), '//connect.facebook.net/en_US/sdk.js', 'Script source');
        assert.equal($('#fb-root').length, 1, 'Div fb-root');
        done();
    });
});

//QUnit.test('Facebook_when_init_fail', function (assert) {
//    var done = assert.async();
//    Facebook.init(function (response) {
//        assert.equal(response.httpCode, 500, 'Http code 500');
//        assert.equal(response.statusText, 'Impossible de charger le SDK Facebook.', 'Message d\'erreur');
//        done();
//    });

//});

