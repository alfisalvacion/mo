'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (resourceType, params) {
    var resourceName = params.name;

    if (!resourceName.match(RESOURCE_NAME_PATTERN)) {
        throw new Error('Resource name should match ' + RESOURCE_NAME_PATTERN.toString());
    }

    resourceName = (0, _lodash.camelCase)(resourceName);

    var appPath = _path2.default.join(process.cwd(), 'src/app');
    var templatesPath = _path2.default.resolve(__dirname, '../../templates/' + resourceType);

    var ResourceType = (0, _lodash.upperFirst)(resourceType);
    var ResourceName = (0, _lodash.upperFirst)(resourceName);
    var re = {
        name: new RegExp(resourceType + 'Name', 'g'),
        capitalName: new RegExp(ResourceType + 'Name', 'g')
    };

    return _fsPromise2.default.exists(appPath).then(function (exists) {
        return !exists && Promise.reject('There is no `src/app` folder. Seems we are not in mo project directory.');
    }).then(function () {
        return _fsPromise2.default.walk(templatesPath);
    }).then(function (templateFiles) {
        return _vow2.default.all(templateFiles.map(function (file) {
            return _path2.default.relative(templatesPath, file.path);
        }).filter(function (filepath) {
            return filepath.match(re.name) || filepath.match(re.capitalName);
        }).map(function (filepath) {
            return filepath.replace(re.name, resourceName).replace(re.capitalName, ResourceName);
        }).map(function (filepath) {
            var absolute = _path2.default.resolve(appPath, filepath);
            var relative = _path2.default.join('src/app', filepath);

            return _fsPromise2.default.exists(absolute).then(function (exists) {
                return { exists: exists, absolute: absolute, relative: relative };
            });
        }));
    }).then(function (filesInfo) {
        return _vow2.default.all(filesInfo.map(function (_ref) {
            var exists = _ref.exists,
                absolute = _ref.absolute,
                relative = _ref.relative;

            if (exists) {
                return _fsPromise2.default.remove(absolute).then(function () {
                    return console.log('Removed ' + _path2.default.join('src/app', relative));
                }).then(function () {
                    return { deleted: true };
                });
            } else {
                console.log(relative + ' does not exist');

                return { deleted: false };
            }
        }));
    }).then(function (results) {
        return (0, _lodash.some)(results, 'deleted') || Promise.reject('Nothing was deleted');
    });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _lodash = require('lodash');

var _vow = require('vow');

var _vow2 = _interopRequireDefault(_vow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESOURCE_NAME_PATTERN = /[A-Za-z]+/;