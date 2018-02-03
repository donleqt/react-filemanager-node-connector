'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options.onInitSuccess();
            options.onSignInSuccess();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getCapabilitiesForResource = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options, resource) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', resource.capabilities || []);

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCapabilitiesForResource(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getResourceById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options, id) {
    var route, method, response, resource;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            route = options.apiRoot + '/files/' + id;
            method = 'GET';
            _context3.next = 4;
            return (0, _superagent2.default)(method, route).catch(function (error) {
              console.error('Filemanager. getResourceById(' + id + ')', error);
            });

          case 4:
            response = _context3.sent;
            resource = response.body;
            return _context3.abrupt('return', normalizeResource(resource));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getResourceById(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getChildrenForId = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(options, _ref5) {
    var _this = this;

    var id = _ref5.id,
        _ref5$sortBy = _ref5.sortBy,
        sortBy = _ref5$sortBy === undefined ? 'name' : _ref5$sortBy,
        _ref5$sortDirection = _ref5.sortDirection,
        sortDirection = _ref5$sortDirection === undefined ? 'ASC' : _ref5$sortDirection,
        onFail = _ref5.onFail;
    var route, method, response, rawResourceChildren, resourceChildren;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = options.apiRoot + '/files/' + id + '/children?orderBy=' + sortBy + '&orderDirection=' + sortDirection;
            method = 'GET';
            _context5.next = 4;
            return (0, _superagent2.default)(method, route).catch(function (error) {
              console.error('Filemanager. getChildrenForId(' + id + ')', error);
              if (onFail) {
                onFail({ message: (0, _translations2.default)(options.locale, 'unableReadDir') }); // TODO doesn't intercept for some reason
                // onFail({ message: 'Unable to read a directory.' }) // TODO doesn't intercept for some reason
              }
            });

          case 4:
            response = _context5.sent;
            rawResourceChildren = response.body.items;
            _context5.next = 8;
            return Promise.all(rawResourceChildren.map(function () {
              var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(o) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt('return', normalizeResource(o));

                      case 1:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this);
              }));

              return function (_x8) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 8:
            resourceChildren = _context5.sent;
            return _context5.abrupt('return', { resourceChildren: resourceChildren });

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getChildrenForId(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getParentsForId = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(options, id) {
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var resource, parentId, parent;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (id) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', result);

          case 2:
            _context6.next = 4;
            return getResourceById(options, id);

          case 4:
            resource = _context6.sent;

            if (resource) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt('return', result);

          case 7:
            parentId = resource.parentId;

            if (parentId) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt('return', result);

          case 10:
            _context6.next = 12;
            return getResourceById(options, parentId);

          case 12:
            parent = _context6.sent;
            _context6.next = 15;
            return getParentsForId(options, resource.parentId, [parent].concat(result));

          case 15:
            return _context6.abrupt('return', _context6.sent);

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getParentsForId(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getBaseResource = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(options) {
    var route, response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            route = options.apiRoot + '/files';
            _context7.next = 3;
            return _superagent2.default.get(route).catch(function (error) {
              console.error('Filemanager. getBaseResource()', error);
            });

          case 3:
            response = _context7.sent;
            return _context7.abrupt('return', normalizeResource(response.body));

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getBaseResource(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

var getRootId = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(options) {
    var resource;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getBaseResource(options);

          case 2:
            resource = _context8.sent;
            return _context8.abrupt('return', resource.id);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getRootId(_x13) {
    return _ref9.apply(this, arguments);
  };
}();

var getIdForPartPath = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(options, currId, pathArr) {
    var _ref11, resourceChildren, i, resource;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getChildrenForId(options, { id: currId });

          case 2:
            _ref11 = _context9.sent;
            resourceChildren = _ref11.resourceChildren;
            i = 0;

          case 5:
            if (!(i < resourceChildren.length)) {
              _context9.next = 18;
              break;
            }

            resource = resourceChildren[i];

            if (!(resource.name === pathArr[0])) {
              _context9.next = 15;
              break;
            }

            if (!(pathArr.length === 1)) {
              _context9.next = 12;
              break;
            }

            return _context9.abrupt('return', resource.id);

          case 12:
            _context9.next = 14;
            return getIdForPartPath(options, resource.id, pathArr.slice(1));

          case 14:
            return _context9.abrupt('return', _context9.sent);

          case 15:
            i++;
            _context9.next = 5;
            break;

          case 18:
            return _context9.abrupt('return', null);

          case 19:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function getIdForPartPath(_x14, _x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();

var getIdForPath = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(options, path) {
    var resource, pathArr;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getBaseResource(options);

          case 2:
            resource = _context10.sent;
            pathArr = path.split('/');

            if (!(pathArr.length === 0 || pathArr.length === 1 || pathArr[0] !== '')) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt('return', null);

          case 6:
            if (!(pathArr.length === 2 && pathArr[1] === '')) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt('return', resource.id);

          case 8:
            _context10.next = 10;
            return getIdForPartPath(options, resource.id, pathArr.slice(1));

          case 10:
            return _context10.abrupt('return', _context10.sent);

          case 11:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function getIdForPath(_x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var getParentIdForResource = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(options, resource) {
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt('return', resource.parentId);

          case 1:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function getParentIdForResource(_x19, _x20) {
    return _ref13.apply(this, arguments);
  };
}();

var readLocalFile = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt('return', new Promise(function (resolve, reject) {
              var uploadInput = document.createElement("input");
              var reader = new FileReader();

              uploadInput.addEventListener('change', function (e) {
                var file = uploadInput.files[0];
                resolve({
                  type: file.type,
                  name: file.name,
                  file: file
                });
              });

              uploadInput.type = "file";
              document.body.appendChild(uploadInput);
              uploadInput.click();
              document.body.removeChild(uploadInput);
            }));

          case 1:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function readLocalFile() {
    return _ref14.apply(this, arguments);
  };
}();

var uploadFileToId = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(options, parentId, _ref16) {
    var onStart = _ref16.onStart,
        onSuccess = _ref16.onSuccess,
        onFail = _ref16.onFail,
        onProgress = _ref16.onProgress;
    var file, route;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return readLocalFile(true);

          case 2:
            file = _context13.sent;
            route = options.apiRoot + '/files';

            onStart({ name: file.name, size: file.file.size });
            _superagent2.default.post(route).field('type', 'file').field('parentId', parentId).attach('files', file.file, file.name).on('progress', function (event) {
              onProgress(event.percent);
            }).end(function (error, response) {
              if (error) {
                console.log('Filemanager. uploadFileToId(' + parentId + ')', error);
                onFail();
              } else {
                var newResource = normalizeResource(response.body[0]);
                onSuccess(newResource.id);
              }
            });

          case 6:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function uploadFileToId(_x21, _x22, _x23) {
    return _ref15.apply(this, arguments);
  };
}();

var downloadResource = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(_ref18) {
    var apiOptions = _ref18.apiOptions,
        resource = _ref18.resource,
        onProgress = _ref18.onProgress,
        i = _ref18.i,
        l = _ref18.l,
        onFail = _ref18.onFail;
    var downloadUrl;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            downloadUrl = apiOptions.apiRoot + '/download?items=' + resource.id;
            return _context14.abrupt('return', _superagent2.default.get(downloadUrl).responseType('blob').on('progress', function (event) {
              onProgress((i * 100 + event.percent) / l);
            }).then(function (res) {
              return {
                file: res.body,
                name: resource.name
              };
            }, function (err) {
              console.error(err);
              onFail();
            }));

          case 2:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function downloadResource(_x24) {
    return _ref17.apply(this, arguments);
  };
}();

var downloadResources = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(_ref20) {
    var apiOptions = _ref20.apiOptions,
        resources = _ref20.resources,
        _ref20$trackers = _ref20.trackers,
        onStart = _ref20$trackers.onStart,
        onSuccess = _ref20$trackers.onSuccess,
        onFail = _ref20$trackers.onFail,
        onProgress = _ref20$trackers.onProgress;

    var _resources$, _id, name, archiveName, files, zip, blob;

    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!(resources.length === 1)) {
              _context15.next = 3;
              break;
            }

            _resources$ = resources[0], _id = _resources$.id, name = _resources$.name;
            return _context15.abrupt('return', {
              direct: true,
              downloadUrl: apiOptions.apiRoot + '/download?items=' + _id,
              name: name
            });

          case 3:

            // multiple resources -> download one by one

            archiveName = apiOptions.archiveName || 'archive.zip';


            onStart({ archiveName: archiveName, quantity: resources.length });

            _context15.next = 7;
            return (0, _common.serializePromises)({
              series: resources.map(function (resource) {
                return function (_ref21) {
                  var onProgress = _ref21.onProgress,
                      i = _ref21.i,
                      l = _ref21.l,
                      onFail = _ref21.onFail;
                  return downloadResource({
                    resource: resource, apiOptions: apiOptions, onProgress: onProgress, i: i, l: l, onFail: onFail
                  });
                };
              }),
              onProgress: onProgress,
              onFail: onFail
            });

          case 7:
            files = _context15.sent;


            onProgress(100);

            zip = new _jszip2.default();

            files.forEach(function (_ref22) {
              var name = _ref22.name,
                  file = _ref22.file;
              return zip.file(name, file);
            });
            _context15.next = 13;
            return zip.generateAsync({ type: 'blob' });

          case 13:
            blob = _context15.sent;


            setTimeout(onSuccess, 1000);

            return _context15.abrupt('return', {
              direct: false,
              file: blob,
              name: archiveName
            });

          case 16:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function downloadResources(_x25) {
    return _ref19.apply(this, arguments);
  };
}();

var createFolder = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(options, parentId, folderName, _ref24) {
    var onFail = _ref24.onFail;
    var route, method, params, response;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            route = options.apiRoot + '/files';
            method = 'POST';
            params = {
              parentId: parentId,
              name: folderName,
              type: 'dir'
            };
            _context16.next = 5;
            return (0, _superagent2.default)(method, route).send(params).catch(function (error) {
              console.error('Filemanager. createFolder(' + id + ')', error);
              onFail();
            });

          case 5:
            response = _context16.sent;
            return _context16.abrupt('return', response);

          case 7:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function createFolder(_x26, _x27, _x28, _x29) {
    return _ref23.apply(this, arguments);
  };
}();

var renameResource = function () {
  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(options, id, newName, _ref26) {
    var onFail = _ref26.onFail;
    var route, method, response;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            route = options.apiRoot + '/files/' + id;
            method = 'PATCH';
            _context17.next = 4;
            return (0, _superagent2.default)(method, route).type('application/json').send({ name: newName }).catch(function (error) {
              console.error('Filemanager. renameResource(' + id + ')', error);
              onFail();
            });

          case 4:
            response = _context17.sent;
            return _context17.abrupt('return', response);

          case 6:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function renameResource(_x30, _x31, _x32, _x33) {
    return _ref25.apply(this, arguments);
  };
}();

var removeResource = function () {
  var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(options, resource) {
    var route, method, response;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            route = options.apiRoot + '/files/' + resource.id;
            method = 'DELETE';
            _context18.next = 4;
            return (0, _superagent2.default)(method, route).catch(function (error) {
              throw error;
            });

          case 4:
            response = _context18.sent;
            return _context18.abrupt('return', response);

          case 6:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function removeResource(_x34, _x35) {
    return _ref27.apply(this, arguments);
  };
}();

var removeResources = function () {
  var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(options, selectedResources, _ref29) {
    var _this2 = this;

    var onSuccess = _ref29.onSuccess,
        onFail = _ref29.onFail;
    var success;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return Promise.all(selectedResources.map(function () {
              var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(resource) {
                return _regenerator2.default.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return removeResource(options, resource);

                      case 2:
                        return _context19.abrupt('return', _context19.sent);

                      case 3:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, _callee19, _this2);
              }));

              return function (_x39) {
                return _ref30.apply(this, arguments);
              };
            }())).catch(function (error) {
              console.error('Filemanager. removeResources', error);
              onFail();
            });

          case 2:
            success = _context20.sent;

            onSuccess();

          case 4:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function removeResources(_x36, _x37, _x38) {
    return _ref28.apply(this, arguments);
  };
}();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _common = require('./utils/common');

var _translations = require('../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeResource(resource) {
  if (resource) {
    return {
      capabilities: resource.capabilities,
      createdTime: Date.parse(resource.createdTime),
      id: resource.id,
      modifiedTime: Date.parse(resource.modifiedTime),
      name: resource.name,
      type: resource.type,
      size: resource.size,
      parentId: resource.parentId ? resource.parentId : null
    };
  } else {
    return {};
  }
}

function getResourceName(apiOptions, resource) {
  return resource.name;
}

exports.default = {
  init: init,
  getIdForPath: getIdForPath,
  getResourceById: getResourceById,
  getCapabilitiesForResource: getCapabilitiesForResource,
  getChildrenForId: getChildrenForId,
  getRootId: getRootId,
  getParentsForId: getParentsForId,
  getParentIdForResource: getParentIdForResource,
  getResourceName: getResourceName,
  createFolder: createFolder,
  downloadResources: downloadResources,
  renameResource: renameResource,
  removeResources: removeResources,
  uploadFileToId: uploadFileToId
};