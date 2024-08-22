'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (target, params) {
    if ((0, _lodash.includes)(DESTROYERS, target)) {
        var destroy = require('./' + target).default;
        destroy(params);
    } else {
        console.error('Unknown destroyer "' + target + '"');
    }
};

var _lodash = require('lodash');

var DESTROYERS = ['app', 'page', 'modal'];

;