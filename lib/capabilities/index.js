'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createFolder = require('./create-folder');

var _createFolder2 = _interopRequireDefault(_createFolder);

var _deleteResource = require('./delete-resource');

var _deleteResource2 = _interopRequireDefault(_deleteResource);

var _download = require('./download');

var _download2 = _interopRequireDefault(_download);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _rename = require('./rename');

var _rename2 = _interopRequireDefault(_rename);

var _sort = require('./sort');

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (apiOptions, _ref) {
  var showDialog = _ref.showDialog,
      hideDialog = _ref.hideDialog,
      navigateToDir = _ref.navigateToDir,
      updateNotifications = _ref.updateNotifications,
      getSelection = _ref.getSelection,
      getSelectedResources = _ref.getSelectedResources,
      getResource = _ref.getResource,
      getResourceChildren = _ref.getResourceChildren,
      getResourceLocation = _ref.getResourceLocation,
      getNotifications = _ref.getNotifications;
  return [(0, _createFolder2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  }), (0, _rename2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  }), (0, _download2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  }), (0, _upload2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  }), (0, _deleteResource2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  }), (0, _sort2.default)(apiOptions, {
    showDialog: showDialog,
    hideDialog: hideDialog,
    navigateToDir: navigateToDir,
    updateNotifications: updateNotifications,
    getSelection: getSelection,
    getSelectedResources: getSelectedResources,
    getResource: getResource,
    getResourceChildren: getResourceChildren,
    getResourceLocation: getResourceLocation,
    getNotifications: getNotifications
  })];
};