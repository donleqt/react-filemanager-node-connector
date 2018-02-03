'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _sanitizeFilename = require('sanitize-filename');

var _sanitizeFilename2 = _interopRequireDefault(_sanitizeFilename);

var _onFailError = require('../utils/onFailError');

var _onFailError2 = _interopRequireDefault(_onFailError);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = _iconsSvg2.default.createNewFolder;
var label = 'createFolder';

function _handler(apiOptions, _ref) {
  var _this = this;

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

  var getMessage = _translations2.default.bind(null, apiOptions.locale);

  var onFail = function onFail(_) {
    return (0, _onFailError2.default)({
      getNotifications: getNotifications,
      label: getMessage(label),
      notificationId: label,
      updateNotifications: updateNotifications
    });
  };

  var rawDialogElement = {
    elementType: 'SetNameDialog',
    elementProps: {
      onHide: hideDialog,
      onSubmit: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(folderName) {
          var resource, _ref3, resourceChildren, alreadyExists, result;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  resource = getResource();
                  _context.next = 3;
                  return _api2.default.getChildrenForId(apiOptions, { id: resource.id, onFail: onFail });

                case 3:
                  _ref3 = _context.sent;
                  resourceChildren = _ref3.resourceChildren;
                  alreadyExists = resourceChildren.some(function (o) {
                    return o.name === folderName;
                  });

                  if (!alreadyExists) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt('return', getMessage('fileExist1') + ' "' + folderName + '" ' + getMessage('fileExist2'));

                case 10:
                  hideDialog();
                  _context.next = 13;
                  return _api2.default.createFolder(apiOptions, resource.id, folderName, { onFail: onFail });

                case 13:
                  result = _context.sent;

                  navigateToDir(resource.id, result.body.id, false);

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function onSubmit(_x) {
          return _ref2.apply(this, arguments);
        };
      }(),
      onValidate: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(folderName) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (folderName) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('emptyName'));

                case 4:
                  if (!(folderName === 'CON')) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('doNotRespectBill'));

                case 8:
                  if (!(folderName.length >= 255)) {
                    _context2.next = 12;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('tooLongFolderName'));

                case 12:
                  if (!(folderName.trim() !== (0, _sanitizeFilename2.default)(folderName.trim()))) {
                    _context2.next = 14;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('folderNameNotAllowedCharacters'));

                case 14:
                  return _context2.abrupt('return', null);

                case 15:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function onValidate(_x2) {
          return _ref4.apply(this, arguments);
        };
      }(),
      headerText: getMessage('folderName'),
      submitButtonText: getMessage('create')
    }
  };

  showDialog(rawDialogElement);
}

exports.default = function (apiOptions, _ref5) {
  var showDialog = _ref5.showDialog,
      hideDialog = _ref5.hideDialog,
      navigateToDir = _ref5.navigateToDir,
      updateNotifications = _ref5.updateNotifications,
      getSelection = _ref5.getSelection,
      getSelectedResources = _ref5.getSelectedResources,
      getResource = _ref5.getResource,
      getResourceChildren = _ref5.getResourceChildren,
      getResourceLocation = _ref5.getResourceLocation,
      getNotifications = _ref5.getNotifications;

  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: label,
    icon: { svg: icon },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      var resource = getResource();

      if (!resource || !resource.capabilities) {
        return false;
      }

      return resource.capabilities.canAddChildren;
    },
    availableInContexts: ['files-view', 'new-button'],
    handler: function handler() {
      return _handler(apiOptions, {
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
      });
    },
    contextMenuRenderer: function contextMenuRenderer(apiOptions) {
      return {
        elementType: 'ContextMenuItem',
        elementProps: {
          icon: { svg: icon },
          onClick: function onClick() {
            return _handler(apiOptions, {
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
            });
          },
          children: localeLabel
        }
      };
    }
  };
};