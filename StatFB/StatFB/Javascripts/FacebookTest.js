var fb = new Facebook(Factory.get('init'),  Factory.get('connect'));
QUnit.test('Facebook_when_init_success', function (assert) {
    var done = assert.async();
    fb.init(function (response) {
        assert.equal(response.action, 'Init', 'Action: Init');
        assert.equal(response.message, 'Ok', 'Message: Ok');
        assert.equal(response.data === null, true, 'No data');
        assert.equal($('#facebook-jssdk').attr('src'), '//connect.facebook.net/en_US/sdk.js', 'Script source');
        assert.equal($('#fb-root').length, 1, 'Div fb-root');
        done();
    });
});

QUnit.test('Facebook_when_init_fail', function (assert) {
    fb.setInit(Factory.get('initthrow'))
    var done = assert.async();
    fb.init(function (response) {
        assert.equal(response.httpCode, 500, 'Http code 500');
        assert.equal(response.statusText, 'Impossible de charger le SDK Facebook.', 'Message d\'erreur');
        done();
    });

});
$(document).ready(function() {
    $("#fb-root").on("facebook:init", function () {
        QUnit.test('Facebook_when_connect_success', function (assert) {
            var done = assert.async();
            fb.connect('fblogin', function (response) {
                assert.equal(response !== null, true, JSON.stringify(response));
                assert.equal(response.action, 'Connect', 'Action: Connect');
                assert.equal(response.message, 'Ok', 'Message: Ok');
                assert.equal(response.data.login.authResponse.userID, '911882122170286', 'userID: 911882122170286');
                done();
            });

            $('#fblogin').trigger('click');
        });
    });
});


