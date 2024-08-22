'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (resourceType, params) {
    var resourceName = _lodash2.default.lowerFirst(params.name);

    if (!resourceName.match(RESOURCE_NAME_PATTERN)) {
        throw new Error('Resource name should match ' + RESOURCE_NAME_PATTERN.toString());
    }

    var appPath = _path2.default.join(process.cwd(), 'src/app');
    var templatesPath = _path2.default.resolve(__dirname, '../../templates/' + resourceType);

    var ResourceType = _lodash2.default.upperFirst(resourceType);
    var ResourceName = _lodash2.default.upperFirst(resourceName);
    var re = {
        name: new RegExp(resourceType + 'Name', 'g'),
        capitalName: new RegExp(ResourceType + 'Name', 'g'),
        placeholder: new RegExp('{{' + resourceType + 'Name}}', 'g'),
        capitalPlaceholder: new RegExp('{{' + ResourceType + 'Name}}', 'g')
    };
    var options = {
        overwrite: params.options.force,
        rename: function rename(filePath) {
            return filePath.replace(re.name, resourceName).replace(re.capitalName, ResourceName);
        },
        transform: function transform() {
            return (0, _through2.default)(function (chunk, enc, done) {
                done(null, chunk.toString().replace(re.placeholder, resourceName).replace(re.capitalPlaceholder, ResourceName));
            });
        }
    };

    return _fsPromise2.default.exists(appPath).then(function (exists) {
        return !exists && Promise.reject('There is no `src/app` folder. Seems we are not in mo project directory.');
    }).then(function () {
        return (0, _recursiveCopy2.default)(templatesPath, appPath, options);
    }).catch(function (err) {
        return Promise.reject(err && err.code == 'EEXIST' ? 'Files exist. Run with `--force` to overwrite.' : err);
    });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _recursiveCopy = require('recursive-copy');

var _recursiveCopy2 = _interopRequireDefault(_recursiveCopy);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESOURCE_NAME_PATTERN = /[a-z][A-Za-z]+/;