#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _generators = require('../generators');

var _generators2 = _interopRequireDefault(_generators);

var _destroyers = require('../destroyers');

var _destroyers2 = _interopRequireDefault(_destroyers);

var _serve = require('../server/serve');

var _serve2 = _interopRequireDefault(_serve);

var _package = require('../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('new [name]').description('create new app').action(function (name) {
    return (0, _generators2.default)('app', { name: name });
});

_commander2.default.command('generate [target] [name]').alias('g').option('-f, --force', 'overwrite existing folders').description('run specific generator (ex. `mo g page Home`)').action(function (target, name) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return (0, _generators2.default)(target, { name: name, options: options });
});

_commander2.default.command('destroy [target] [name]').description('destroy specific targe (ex. `mo destroy page Home`)').action(function (target, name) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return (0, _destroyers2.default)(target, { name: name, options: options });
});

_commander2.default.command('serve').alias('s').option('-p, --port [port]', 'express.js port (defaults to 7777)').allowUnknownOption().description('start dev server (ex. `mo s`)').action(function (options) {
    return (0, _serve2.default)({
        source: process.cwd(),
        port: options.port
    });
});

_commander2.default.description('Run `mo [command] -h` to show command options').version(_package.version).parse(process.argv);