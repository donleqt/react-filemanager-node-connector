'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onFailErrors;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onFailErrors(_ref) {
  var getNotifications = _ref.getNotifications,
      label = _ref.label,
      notificationId = _ref.notificationId,
      updateNotifications = _ref.updateNotifications,
      message = _ref.message;

  var notifications = getNotifications();
  var newNotifications = _notifications2.default.removeNotification(notifications, notificationId);

  var newNotification = {
    title: message || label + ' error',
    minimizable: false,
    closable: true,
    children: [],
    onHide: function onHide(_) {
      return updateNotifications(_notifications2.default.removeNotification(notifications, notificationId));
    }
  };

  var notification = _notifications2.default.getNotification(notifications, notificationId);

  newNotifications = notification ? _notifications2.default.updateNotification(notifications, notificationId, newNotification) : _notifications2.default.addNotification(notifications, notificationId, newNotification);

  updateNotifications(newNotifications);
}