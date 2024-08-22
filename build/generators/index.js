'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (target, params) {
    if ((0, _lodash.includes)(GENERATORS, target)) {
        var generate = require('./' + target).default;
        generate(params);
    } else {
        console.error('Unknown generator "' + target + '"');
    }
};

var _lodash = require('lodash');

var GENERATORS = ['app', 'page', 'modal'];

;