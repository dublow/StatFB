QUnit.test('Facebook_when_init', function (assert) {
    var done = assert.async();
    var f = Facebook.init(function (response) {
        assert.equal(response.action, 'Init', 'Action: Init');
        assert.equal(response.message, 'Ok', 'Message: Ok');
        done();
    });
    
});

