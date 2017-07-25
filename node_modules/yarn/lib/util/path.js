'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosixPath = getPosixPath;
exports.expandPath = expandPath;
const userHome = require('./user-home-dir').default;

function getPosixPath(path) {
  return path.replace(/\\/g, '/');
}

function expandPath(path) {
  if (process.platform !== 'win32') {
    path = path.replace(/^\s*~(?=$|\/|\\)/, userHome);
  }

  return path;
}