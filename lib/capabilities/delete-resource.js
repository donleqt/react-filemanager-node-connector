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

var _onFailError = require('../utils/onFailError');

var _onFailError2 = _interopRequireDefault(_onFailError);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = _iconsSvg2.default.delete;
var label = 'remove';

function _handler(apiOptions, _ref) {
  var _this = this;

  var id = _ref.id,
      showDialog = _ref.showDialog,
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

  var onSuccess = function onSuccess() {
    var resource = getResource();
    navigateToDir(resource.id, null, false);
  };

  var onFail = function onFail(_) {
    return (0, _onFailError2.default)({
      getNotifications: getNotifications,
      label: getMessage(label),
      notificationId: 'delete',
      updateNotifications: updateNotifications
    });
  };

  var selectedResources = getSelectedResources();

  var dialogNameText = getMessage('reallyRemove');
  var dialogFilesText = selectedResources.length > 1 ? selectedResources.length + ' ' + getMessage('files') + ' ?' : '"' + selectedResources[0].name + '" ?';

  var rawDialogElement = {
    elementType: 'ConfirmDialog',
    elementProps: {
      onHide: hideDialog,
      onSubmit: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  hideDialog();
                  _api2.default.removeResources(apiOptions, selectedResources, { onSuccess: onSuccess, onFail: onFail });

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function onSubmit() {
          return _ref2.apply(this, arguments);
        };
      }(),
      headerText: dialogNameText + dialogFilesText,
      cancelButtonText: getMessage('cancel'),
      submitButtonText: getMessage('confirm')
    }
  };

  showDialog(rawDialogElement);
}

exports.default = function (apiOptions, _ref3) {
  var showDialog = _ref3.showDialog,
      hideDialog = _ref3.hideDialog,
      navigateToDir = _ref3.navigateToDir,
      updateNotifications = _ref3.updateNotifications,
      getSelection = _ref3.getSelection,
      getSelectedResources = _ref3.getSelectedResources,
      getResource = _ref3.getResource,
      getResourceChildren = _ref3.getResourceChildren,
      getResourceLocation = _ref3.getResourceLocation,
      getNotifications = _ref3.getNotifications;

  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: 'delete',
    icon: { svg: icon },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      var selectedResources = getSelectedResources();

      if (!selectedResources.length) {
        return false;
      }

      return selectedResources.every(function (resource) {
        return resource.capabilities.canDelete;
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