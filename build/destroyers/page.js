'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (params) {
    (0, _resource2.default)('page', params).then(function () {
        return console.log('Page rests in peace now');
    }).catch(function (err) {
        return console.error('Error:', err);
    });
};

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }