QUnit.test('HttpRequest_When_Start_Pending', function (assert) {
    new HttpRequest(false).post('/home/index', { t: 1 })
        .pending(function(isPending) {
            assert.equal(isPending, true, "Is in pending");
        });
});

QUnit.test('HttpRequest_When_End_Pending', function (assert) {
    var isFirstPending = true;
    var done = assert.async();
    new HttpRequest(false).post('/home/index', { t: 1 })
        .pending(function (isPending) {
            if (isFirstPending) {
                isFirstPending = false;
            } else {
                assert.equal(isPending, false, "Is out pending");
                done();
            }
        })
        .done(function() {
        });
});

QUnit.test('HttpRequest_When_404_Preprod', function (assert) {
    var done = assert.async();
    new HttpRequest(false).post('/home/notfound', { t: 1 })
        .fail(function(response) {
            assert.equal(typeof response, 'object', JSON.stringify(response));
            assert.equal(response.httpCode, 404, "Http code 404");
            assert.equal(response.data !== null, true, "Is not null data preprod");
            done();
        });
});

QUnit.test('HttpRequest_When_404_Prod', function (assert) {
    var done = assert.async();
    new HttpRequest(true).post('/home/notfound', { t: 1 })
        .fail(function (response) {
            assert.equal(typeof response, 'object', JSON.stringify(response));
            assert.equal(response.httpCode, 404, "Http Code 404");
            assert.equal(response.data === null, true, "Is null data prod");
            done();
        });
});

//QUnit.test('HttpRequest_When_500_Preprod', function (assert) {
//    var done = assert.async();
//    new HttpRequest(false).post('/home/indexthrow', { t: 1 })
//        .fail(function (response) {
//            assert.equal(typeof response, 'object', JSON.stringify(response));
//            assert.equal(response.httpCode, 500, "Http code 500");
//            assert.equal(response.data !== null, true, "Is not null data preprod");
//            done();
//        });
//});

//QUnit.test('HttpRequest_When_500_Prod', function (assert) {
//    var done = assert.async();
//    new HttpRequest(true).post('/home/indexthrow', { t: 1 })
//        .fail(function (response) {
//            assert.equal(typeof response, 'object', JSON.stringify(response));
//            assert.equal(response.httpCode, 500, "Http code 500");
//            assert.equal(response.data === null, true, "Is null data prod");
//            done();
//        });
//});

QUnit.test('HttpRequest_When_200', function (assert) {
    var done = assert.async();
    new HttpRequest(true).post('/home/index', { t: 1 })
        .done(function (response) {
            assert.equal(typeof response, 'object', JSON.stringify(response));
            assert.equal(response.httpCode, 200, "Http code 200");
            assert.equal(response.data.t, 2, "returned value t:2");
            done();
        });
});