'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
    var source = _ref.source,
        _ref$port = _ref.port,
        port = _ref$port === undefined ? DEFAULT_PORT : _ref$port;

    var webpackConfig = (0, _convertArgv2.default)(_yargs2.default, _extends({
        env: { dev: true }
    }, _yargs2.default.argv, {
        _: '',
        $0: ''
    }));
    var publicPath = webpackConfig.output.publicPath;
    var publicPathAbsolute = _path2.default.join(source, publicPath);
    var compiler = (0, _webpack2.default)(webpackConfig);
    var localIp = _ip2.default.address();

    (0, _express2.default)().use((0, _webpackDevMiddleware2.default)(compiler, { publicPath: '/src', stats: { colors: true } })).use((0, _webpackHotMiddleware2.default)(compiler)).use(publicPath, _express2.default.static(publicPathAbsolute)).use(_express2.default.static(STAGING_PATH)).listen(port, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n\nYour mo \uD83D\uDC0D  server is ready. Ctrl+click => http://' + localIp + ':' + port + ' !\n\n');
        }
    });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _convertArgv = require('webpack/bin/convert-argv');

var _convertArgv2 = _interopRequireDefault(_convertArgv);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STAGING_PATH = _path2.default.resolve(__dirname, '../../staging/');
var DEFAULT_PORT = 7777;