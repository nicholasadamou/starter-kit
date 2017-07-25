'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('../../package-request.js'));
}

var _baseResolver;

function _load_baseResolver() {
  return _baseResolver = _interopRequireDefault(require('../base-resolver.js'));
}

var _workspaceLayout;

function _load_workspaceLayout() {
  return _workspaceLayout = _interopRequireDefault(require('../../workspace-layout.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const invariant = require('invariant');

class WorkspaceResolver extends (_baseResolver || _load_baseResolver()).default {
  static isWorkspace(pattern, workspaceLayout) {
    return !!workspaceLayout && !!workspaceLayout.getManifestByPattern(pattern);
  }

  constructor(request, fragment, workspaceLayout) {
    super(request, fragment);
    this.workspaceLayout = workspaceLayout;
  }

  resolve() {
    const workspace = this.workspaceLayout.getManifestByPattern(this.request.pattern);
    invariant(workspace, 'expected workspace');
    const manifest = workspace.manifest,
          loc = workspace.loc;

    const registry = manifest._registry;
    invariant(registry, 'expected reference');

    manifest._remote = {
      type: 'workspace',
      registry,
      hash: '',
      reference: loc
    };

    manifest._uid = manifest.version;

    return Promise.resolve(manifest);
  }
}
exports.default = WorkspaceResolver;