'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (params) {
    var appName = params.name;

    if (!appName.match(APP_NAME_PATTERN)) {
        throw new Error('App name should match ' + APP_NAME_PATTERN.toString());
    }

    var appPath = _path2.default.join(process.cwd(), appName);

    _fsPromise2.default.mkdir(appPath).catch(function (err) {
        return Promise.reject('Failed to create directory, does it already exist?');
    }).then(function () {
        return _fsPromise2.default.copy(TEMPLATES_DIR, appPath);
    }).then(function () {
        return console.log('Project created! Now run `cd ' + appName + ' && npm i`.');
    }).catch(function (err) {
        return console.error('Error:', err);
    });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_NAME_PATTERN = /\w+/;
var TEMPLATES_DIR = _path2.default.resolve(__dirname, '../../templates/app');