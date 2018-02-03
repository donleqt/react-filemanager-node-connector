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
      getNotifications = _ref.getNotifications,
      getSortState = _ref.getSortState;
  return {
    id: 'sort',
    handler: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
        var sortBy = _ref3.sortBy,
            sortDirection = _ref3.sortDirection;

        var onFail, id, _ref5, resourceChildren;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onFail = function onFail(_ref4) {
                  var message = _ref4.message;
                  return (0, _onFailError2.default)({
                    getNotifications: getNotifications,
                    label: label,
                    notificationId: 'rename',
                    updateNotifications: updateNotifications,
                    message: message
                  });
                };

                id = getResource().id;
                _context.next = 4;
                return _api2.default.getChildrenForId(apiOptions, { id: id, sortBy: sortBy, sortDirection: sortDirection, onFail: onFail });

              case 4:
                _ref5 = _context.sent;
                resourceChildren = _ref5.resourceChildren;
                return _context.abrupt('return', resourceChildren);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function handler(_x) {
        return _ref2.apply(this, arguments);
      };
    }()
  };
};