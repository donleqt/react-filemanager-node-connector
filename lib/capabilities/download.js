'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _notifications = require('../utils/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _download = require('../utils/download');

var _onFailError = require('../utils/onFailError');

var _onFailError2 = _interopRequireDefault(_onFailError);

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = _iconsSvg2.default.fileDownload;
var label = 'download';

function _handler(apiOptions, _ref) {
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

  var notificationId = label;
  var notificationChildId = (0, _nanoid2.default)();

  var onStart = function onStart(_ref2) {
    var archiveName = _ref2.archiveName,
        quantity = _ref2.quantity;

    var notifications = getNotifications();
    var notification = _notifications2.default.getNotification(notifications, notificationId);

    var childElement = {
      elementType: 'NotificationProgressItem',
      elementProps: {
        title: getMessage('creating') + ' ' + archiveName + '...',
        progress: 0
      }
    };

    var newChildren = _notifications2.default.addChild(notification && notification.children || [], notificationChildId, childElement);
    var newNotification = {
      title: 'getMessage(\'zipping\') ' + quantity + ' ' + (quantity > 1 ? getMessage('items') : getMessage('item')),
      children: newChildren
    };

    var newNotifications = notification ? _notifications2.default.updateNotification(notifications, notificationId, newNotification) : _notifications2.default.addNotification(notifications, notificationId, newNotification);

    updateNotifications(newNotifications);
  };

  var onSuccess = function onSuccess(_) {
    var notifications = getNotifications();
    var notification = _notifications2.default.getNotification(notifications, notificationId);
    var notificationChildrenCount = notification.children.length;
    var newNotifications = void 0;

    if (notificationChildrenCount > 1) {
      newNotifications = _notifications2.default.updateNotification(notifications, notificationId, {
        children: _notifications2.default.removeChild(notification.children, notificationChildId)
      });
    } else {
      newNotifications = _notifications2.default.removeNotification(notifications, notificationId);
    }
    updateNotifications(newNotifications);
  };

  var onFail = function onFail(_) {
    return (0, _onFailError2.default)({
      getNotifications: getNotifications,
      label: getMessage(label),
      // label,
      notificationId: notificationId,
      updateNotifications: updateNotifications
    });
  };

  var onProgress = function onProgress(progress) {
    var notifications = getNotifications();
    var notification = _notifications2.default.getNotification(notifications, notificationId);
    var child = _notifications2.default.getChild(notification.children, notificationChildId);

    var newChild = (0, _extends3.default)({}, child, {
      element: (0, _extends3.default)({}, child.element, {
        elementProps: (0, _extends3.default)({}, child.element.elementProps, {
          progress: progress
        })
      })
    });
    var newChildren = _notifications2.default.updateChild(notification.children, notificationChildId, newChild);
    var newNotifications = _notifications2.default.updateNotification(notifications, notificationId, { children: newChildren });
    updateNotifications(newNotifications);
  };

  return _api2.default.downloadResources({
    resources: getSelectedResources(),
    apiOptions: apiOptions,
    trackers: {
      onStart: onStart,
      onSuccess: onSuccess,
      onFail: onFail,
      onProgress: onProgress
    }
  }).then(function (_ref3) {
    var downloadUrl = _ref3.downloadUrl,
        content = _ref3.file,
        name = _ref3.name;
    return (0, _download.promptToSaveBlob)({ content: content, name: name, downloadUrl: downloadUrl });
  }).catch(function (err) {
    return console.error(err);
  });
}

exports.default = function (apiOptions, _ref4) {
  var showDialog = _ref4.showDialog,
      hideDialog = _ref4.hideDialog,
      navigateToDir = _ref4.navigateToDir,
      updateNotifications = _ref4.updateNotifications,
      getSelection = _ref4.getSelection,
      getSelectedResources = _ref4.getSelectedResources,
      getResource = _ref4.getResource,
      getResourceChildren = _ref4.getResourceChildren,
      getResourceLocation = _ref4.getResourceLocation,
      getNotifications = _ref4.getNotifications;

  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: label,
    icon: { svg: icon },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      var selectedResources = getSelectedResources();

      return selectedResources.length > 0 && !selectedResources.some(function (r) {
        return r.type === 'dir';
      }) && selectedResources.every(function (r) {
        return r.capabilities.canDownload;
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