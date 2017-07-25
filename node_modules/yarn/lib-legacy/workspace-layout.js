'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('./package-request.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const semver = require('semver');

class WorkspaceLayout {
  constructor(workspaces, config) {
    this.workspaces = workspaces;
    this.config = config;
  }

  getWorkspaceManifest(key) {
    return this.workspaces[key];
  }

  getManifestByPattern(pattern) {
    var _PackageRequest$norma = (_packageRequest || _load_packageRequest()).default.normalizePattern(pattern);

    const name = _PackageRequest$norma.name,
          range = _PackageRequest$norma.range;

    const workspace = this.getWorkspaceManifest(name);
    if (!workspace || !semver.satisfies(workspace.manifest.version, range, this.config.looseSemver)) {
      return null;
    }
    return workspace;
  }
}
exports.default = WorkspaceLayout;