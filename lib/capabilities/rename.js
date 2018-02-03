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

var icon = _iconsSvg2.default.rename;
var label = 'rename';

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
  var localeLabel = getMessage(label);

  var onFail = function onFail(_ref2) {
    var message = _ref2.message;
    return (0, _onFailError2.default)({
      getNotifications: getNotifications,
      label: localeLabel,
      notificationId: label,
      updateNotifications: updateNotifications,
      message: message
    });
  };

  var rawDialogElement = {
    elementType: 'SetNameDialog',
    elementProps: {
      initialValue: getSelectedResources()[0].name,
      onHide: hideDialog,
      onSubmit: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
          var selectedResources, _ref4, resourceChildren, alreadyExists, result, resource;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  selectedResources = getSelectedResources();
                  _context.next = 3;
                  return _api2.default.getChildrenForId(apiOptions, { id: selectedResources[0].parentId, onFail: onFail });

                case 3:
                  _ref4 = _context.sent;
                  resourceChildren = _ref4.resourceChildren;
                  alreadyExists = resourceChildren.some(function (o) {
                    return o.name === name;
                  });

                  if (!alreadyExists) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt('return', getMessage('fileExist1') + ' "' + name + '" ' + getMessage('fileExist2'));

                case 10:
                  hideDialog();
                  _context.next = 13;
                  return _api2.default.renameResource(apiOptions, selectedResources[0].id, name, { onFail: onFail });

                case 13:
                  result = _context.sent;
                  resource = getResource();

                  navigateToDir(resource.id, result.body.id, false);

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function onSubmit(_x) {
          return _ref3.apply(this, arguments);
        };
      }(),
      onValidate: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (name) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('emptyName'));

                case 4:
                  if (!(name.length >= 255)) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('tooLongFolderName'));

                case 8:
                  if (!(name.trim() !== (0, _sanitizeFilename2.default)(name.trim()))) {
                    _context2.next = 10;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('folderNameNotAllowedCharacters'));

                case 10:
                  return _context2.abrupt('return', null);

                case 11:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function onValidate(_x2) {
          return _ref5.apply(this, arguments);
        };
      }(),
      headerText: getMessage('newName'),
      submitButtonText: localeLabel
    }
  };
  showDialog(rawDialogElement);
}

exports.default = function (apiOptions, _ref6) {
  var showDialog = _ref6.showDialog,
      hideDialog = _ref6.hideDialog,
      navigateToDir = _ref6.navigateToDir,
      updateNotifications = _ref6.updateNotifications,
      getSelection = _ref6.getSelection,
      getSelectedResources = _ref6.getSelectedResources,
      getResource = _ref6.getResource,
      getResourceChildren = _ref6.getResourceChildren,
      getResourceLocation = _ref6.getResourceLocation,
      getNotifications = _ref6.getNotifications;

  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: label,
    icon: { svg: icon },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      var selectedResources = getSelectedResources();

      return selectedResources.length === 1 && selectedResources.every(function (r) {
        return r.capabilities.canRename;
      });
    },
    availableInContexts: ['row', 'toolbar'],
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