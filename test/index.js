var assert = require('assert'),
    authenticated = require('../lib').authenticated,
    notauthenticated = require('../lib').notauthenticated,
    onfail = require('../lib').onfail;


describe('Authenticated', function() {

    it('should pass on passed authenticated check', function(done) {
        var mockReq = {
                isAuthenticated: function() {return true;}
            };

        // mock onfail
        require('../lib').onfail = function() {
            assert(false, 'should not be called');
        };

        // test!
        authenticated.call(null).call(null, mockReq, null, done);

    });

    it('should call failure on failed authenticated check', function(done) {
        var mockReq = {
                isAuthenticated: function() {return false;}
            },
            shouldnotcall = function() {
                assert(false, 'should not be called');
            };

        // mock onfail
        require('../lib').onfail = function() {
            done();
        };

        // test!
        authenticated.call(null).call(null, mockReq, null, shouldnotcall);
    });
});

describe('Not Authenticated', function() {

    it('should pass on successful not authenticated check', function(done) {
        var mockReq = {
                isAuthenticated: function() {return false;}
            };

        // mock onfail
        require('../lib').onfail = function() {
            assert(false, 'should not be called');
        };

        // test!
        notauthenticated.call(null).call(null, mockReq, null, done);

    });

    it('should call failure on failed not authenticated check', function(done) {
        var mockReq = {
                isAuthenticated: function() {return true;}
            },
            shouldnotcall = function() {
                assert(false, 'should not be called');
            };

        // mock onfail
        require('../lib').onfail = function() {
            done();
        };

        // test!
        notauthenticated.call(null).call(null, mockReq, null, shouldnotcall);
    });

});

describe('onFail', function() {

    before(function(done) {
        require('../lib').onfail = onfail;  // Restore onfail handler
        done();
    });

    it('should redirect', function(done) {
        var expectedUrl = 'url',
            mockRes = {
                redirect: function(url) {
                    assert.equal(url, expectedUrl);
                    done();
                }
            };
        onfail.call(null, {redirect: expectedUrl}, null, mockRes);
    });

    it('should render', function(done) {
        var expectedTemplate = 'template',
            mockReq = {
                url: 'url'
            },
            mockRes = {
                render: function(template, dictionary) {
                    assert.equal(template, expectedTemplate);
                    assert.equal(dictionary.url, mockReq.url);

                    done();
                }
            };

        onfail.call(null, {render: expectedTemplate}, mockReq, mockRes);
    });

});