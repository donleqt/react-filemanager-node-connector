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

var _icons = require('../icons');

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

var _onFailError = require('../utils/onFailError');

var _onFailError2 = _interopRequireDefault(_onFailError);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = _iconsSvg2.default.fileUpload;
var label = 'upload';

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
  var prevResourceId = getResource().id;

  var onStart = function onStart(_ref2) {
    var name = _ref2.name,
        size = _ref2.size;

    var notifications = getNotifications();
    var notification = _notifications2.default.getNotification(notifications, notificationId);
    var childElement = {
      elementType: 'NotificationProgressItem',
      elementProps: {
        title: name,
        progress: 0,
        icon: (0, _icons.getIcon)({ name: name })
      }
    };

    var newChildren = _notifications2.default.addChild(notification && notification.children || [], notificationChildId, childElement);
    var newNotification = {
      title: getMessage('uploading') + ' ' + newChildren.length + ' ' + (newChildren.length > 1 ? getMessage('items') : getMessage('item')),
      children: newChildren
    };

    var newNotifications = notification ? _notifications2.default.updateNotification(notifications, notificationId, newNotification) : _notifications2.default.addNotification(notifications, notificationId, newNotification);

    updateNotifications(newNotifications);
  };

  var onSuccess = function onSuccess(newResourceId) {
    var resource = getResource();
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

    if (prevResourceId === resource.id) {
      navigateToDir(resource.id, newResourceId, false);
    }
  };

  var onFail = function onFail(_) {
    return (0, _onFailError2.default)({
      getNotifications: getNotifications,
      label: getMessage(label),
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

  var resource = getResource();
  _api2.default.uploadFileToId(apiOptions, resource.id, { onStart: onStart, onSuccess: onSuccess, onFail: onFail, onProgress: onProgress });
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