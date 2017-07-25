'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _promise;

function _load_promise() {
  return _promise = _interopRequireDefault(require('babel-runtime/core-js/promise'));
}

var _set;

function _load_set() {
  return _set = _interopRequireDefault(require('babel-runtime/core-js/set'));
}

var _packageRequest;

function _load_packageRequest() {
  return _packageRequest = _interopRequireDefault(require('./package-request.js'));
}

var _requestManager;

function _load_requestManager() {
  return _requestManager = _interopRequireDefault(require('./util/request-manager.js'));
}

var _blockingQueue;

function _load_blockingQueue() {
  return _blockingQueue = _interopRequireDefault(require('./util/blocking-queue.js'));
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('./lockfile/wrapper.js'));
}

var _map;

function _load_map() {
  return _map = _interopRequireDefault(require('./util/map.js'));
}

var _workspaceLayout;

function _load_workspaceLayout() {
  return _workspaceLayout = _interopRequireDefault(require('./workspace-layout.js'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const invariant = require('invariant');

const semver = require('semver');

class PackageResolver {
  constructor(config, lockfile) {
    this.patternsByPackage = (0, (_map || _load_map()).default)();
    this.fetchingPatterns = (0, (_map || _load_map()).default)();
    this.fetchingQueue = new (_blockingQueue || _load_blockingQueue()).default('resolver fetching');
    this.patterns = (0, (_map || _load_map()).default)();
    this.usedRegistries = new (_set || _load_set()).default();
    this.flat = false;

    this.reporter = config.reporter;
    this.lockfile = lockfile;
    this.config = config;
    this.delayedResolveQueue = [];
  }

  // whether the dependency graph will be flattened


  // list of registries that have been used in this resolution


  // activity monitor


  // patterns we've already resolved or are in the process of resolving


  // TODO


  // manages and throttles json api http requests


  // list of patterns associated with a package


  // lockfile instance which we can use to retrieve version info


  // a map of dependency patterns to packages


  // reporter instance, abstracts out display logic


  // environment specific config methods and options


  // list of packages need to be resolved later (they found a matching version in the
  // resolver, but better matches can still arrive later in the resolve process)


  /**
   * TODO description
   */

  isNewPattern(pattern) {
    return !!this.patterns[pattern].fresh;
  }

  updateManifest(ref, newPkg) {
    // inherit fields
    const oldPkg = this.patterns[ref.patterns[0]];
    newPkg._reference = ref;
    newPkg._remote = ref.remote;
    newPkg.name = oldPkg.name;
    newPkg.fresh = oldPkg.fresh;

    // update patterns
    for (const pattern of ref.patterns) {
      this.patterns[pattern] = newPkg;
    }

    return (_promise || _load_promise()).default.resolve();
  }

  updateManifests(newPkgs) {
    for (const newPkg of newPkgs) {
      if (newPkg._reference) {
        for (const pattern of newPkg._reference.patterns) {
          this.patterns[pattern] = newPkg;
        }
      }
    }

    return (_promise || _load_promise()).default.resolve();
  }

  /**
   * Given a list of patterns, dedupe them to a list of unique patterns.
   */

  dedupePatterns(patterns) {
    const deduped = [];
    const seen = new (_set || _load_set()).default();

    for (const pattern of patterns) {
      const info = this.getResolvedPattern(pattern);
      if (seen.has(info)) {
        continue;
      }

      seen.add(info);
      deduped.push(pattern);
    }

    return deduped;
  }

  /**
   * Get a list of all manifests by topological order.
   */

  getTopologicalManifests(seedPatterns) {
    const pkgs = new (_set || _load_set()).default();
    const skip = new (_set || _load_set()).default();

    const add = seedPatterns => {
      for (const pattern of seedPatterns) {
        const pkg = this.getStrictResolvedPattern(pattern);
        if (skip.has(pkg)) {
          continue;
        }

        const ref = pkg._reference;
        invariant(ref, 'expected reference');
        skip.add(pkg);
        add(ref.dependencies);
        pkgs.add(pkg);
      }
    };

    add(seedPatterns);

    return pkgs;
  }

  /**
   * Get a list of all manifests by level sort order.
   */

  getLevelOrderManifests(seedPatterns) {
    const pkgs = new (_set || _load_set()).default();
    const skip = new (_set || _load_set()).default();

    const add = seedPatterns => {
      const refs = [];

      for (const pattern of seedPatterns) {
        const pkg = this.getStrictResolvedPattern(pattern);
        if (skip.has(pkg)) {
          continue;
        }

        const ref = pkg._reference;
        invariant(ref, 'expected reference');

        refs.push(ref);
        skip.add(pkg);
        pkgs.add(pkg);
      }

      for (const ref of refs) {
        add(ref.dependencies);
      }
    };

    add(seedPatterns);

    return pkgs;
  }

  /**
   * Get a list of all package names in the depenency graph.
   */

  getAllDependencyNamesByLevelOrder(seedPatterns) {
    const names = new (_set || _load_set()).default();
    for (const _ref of this.getLevelOrderManifests(seedPatterns)) {
      const name = _ref.name;

      names.add(name);
    }
    return names;
  }

  /**
   * Retrieve all the package info stored for this package name.
   */

  getAllInfoForPackageName(name) {
    const infos = [];
    const seen = new (_set || _load_set()).default();

    for (const pattern of this.patternsByPackage[name]) {
      const info = this.patterns[pattern];
      if (seen.has(info)) {
        continue;
      }

      seen.add(info);
      infos.push(info);
    }

    return infos;
  }

  /**
   * Get a flat list of all package info.
   */

  getManifests() {
    const infos = [];
    const seen = new (_set || _load_set()).default();

    for (const pattern in this.patterns) {
      const info = this.patterns[pattern];
      if (seen.has(info)) {
        continue;
      }

      infos.push(info);
      seen.add(info);
    }

    return infos;
  }

  /**
   * replace pattern in resolver, e.g. `name` is replaced with `name@^1.0.1`
   */
  replacePattern(pattern, newPattern) {
    const pkg = this.getResolvedPattern(pattern);
    invariant(pkg, `missing package ${pattern}`);
    const ref = pkg._reference;
    invariant(ref, 'expected package reference');
    ref.patterns = [newPattern];
    this.addPattern(newPattern, pkg);
    this.removePattern(pattern);
  }

  /**
   * Make all versions of this package resolve to it.
   */

  collapseAllVersionsOfPackage(name, version) {
    const patterns = this.dedupePatterns(this.patternsByPackage[name]);
    const human = `${name}@${version}`;

    // get manifest that matches the version we're collapsing too
    let collapseToReference;
    let collapseToManifest;
    let collapseToPattern;
    for (const pattern of patterns) {
      const _manifest = this.patterns[pattern];
      if (_manifest.version === version) {
        collapseToReference = _manifest._reference;
        collapseToManifest = _manifest;
        collapseToPattern = pattern;
        break;
      }
    }

    invariant(collapseToReference && collapseToManifest && collapseToPattern, `Couldn't find package manifest for ${human}`);

    for (const pattern of patterns) {
      // don't touch the pattern we're collapsing to
      if (pattern === collapseToPattern) {
        continue;
      }

      // remove this pattern
      const ref = this.getStrictResolvedPattern(pattern)._reference;
      invariant(ref, 'expected package reference');
      const refPatterns = ref.patterns.slice();
      ref.prune();

      // add pattern to the manifest we're collapsing to
      for (const pattern of refPatterns) {
        collapseToReference.addPattern(pattern, collapseToManifest);
      }
    }

    return collapseToPattern;
  }

  /**
   * TODO description
   */

  addPattern(pattern, info) {
    this.patterns[pattern] = info;

    const byName = this.patternsByPackage[info.name] = this.patternsByPackage[info.name] || [];
    byName.push(pattern);
  }

  /**
   * TODO description
   */

  removePattern(pattern) {
    const pkg = this.patterns[pattern];
    if (!pkg) {
      return;
    }

    const byName = this.patternsByPackage[pkg.name];
    if (!byName) {
      return;
    }

    byName.splice(byName.indexOf(pattern), 1);
    delete this.patterns[pattern];
  }

  /**
   * TODO description
   */

  getResolvedPattern(pattern) {
    return this.patterns[pattern];
  }

  /**
   * TODO description
   */

  getStrictResolvedPattern(pattern) {
    const manifest = this.getResolvedPattern(pattern);
    invariant(manifest, 'expected manifest');
    return manifest;
  }

  /**
   * TODO description
   */

  getExactVersionMatch(name, version) {
    const patterns = this.patternsByPackage[name];
    if (!patterns) {
      return null;
    }

    for (const pattern of patterns) {
      const info = this.getStrictResolvedPattern(pattern);
      if (info.version === version) {
        return info;
      }
    }

    return null;
  }

  /**
   * Get the manifest of the highest known version that satisfies a package range
   */

  getHighestRangeVersionMatch(name, range) {
    const patterns = this.patternsByPackage[name];
    if (!patterns) {
      return null;
    }

    const versionNumbers = [];
    const resolvedPatterns = patterns.map(pattern => {
      const info = this.getStrictResolvedPattern(pattern);
      versionNumbers.push(info.version);

      return info;
    });

    const maxValidRange = semver.maxSatisfying(versionNumbers, range);
    if (!maxValidRange) {
      return null;
    }

    const indexOfmaxValidRange = versionNumbers.indexOf(maxValidRange);
    const maxValidRangeManifest = resolvedPatterns[indexOfmaxValidRange];

    return maxValidRangeManifest;
  }

  /**
   * TODO description
   */

  find(req) {
    var _this = this;

    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      const fetchKey = `${req.registry}:${req.pattern}`;
      if (_this.fetchingPatterns[fetchKey]) {
        return;
      } else {
        _this.fetchingPatterns[fetchKey] = true;
      }

      if (_this.activity) {
        _this.activity.tick(req.pattern);
      }

      const lockfileEntry = _this.lockfile.getLocked(req.pattern);
      let fresh = false;
      if (lockfileEntry) {
        var _PackageRequest$norma = (_packageRequest || _load_packageRequest()).default.normalizePattern(req.pattern);

        const range = _PackageRequest$norma.range,
              hasVersion = _PackageRequest$norma.hasVersion;
        // lockfileEntry is incorrect, remove it from lockfile cache and consider the pattern as new

        if (semver.validRange(range) && semver.valid(lockfileEntry.version) && !semver.satisfies(lockfileEntry.version, range) && !(_packageRequest || _load_packageRequest()).default.getExoticResolver(range) && hasVersion) {
          _this.reporter.warn(_this.reporter.lang('incorrectLockfileEntry', req.pattern));
          _this.removePattern(req.pattern);
          _this.lockfile.removePattern(req.pattern);
          fresh = true;
        }
      } else {
        fresh = true;
      }

      const request = new (_packageRequest || _load_packageRequest()).default(req, _this);
      yield request.find({ fresh: fresh, frozen: _this.frozen });
    })();
  }

  /**
   * TODO description
   */

  init(deps) {
    var _this2 = this,
        _arguments = arguments;

    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      var _ref2 = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : { isFlat: false, isFrozen: false, workspaceLayout: undefined };

      let isFlat = _ref2.isFlat,
          isFrozen = _ref2.isFrozen,
          workspaceLayout = _ref2.workspaceLayout;

      _this2.flat = Boolean(isFlat);
      _this2.frozen = Boolean(isFrozen);
      _this2.workspaceLayout = workspaceLayout;
      const activity = _this2.activity = _this2.reporter.activity();
      yield (_promise || _load_promise()).default.all(deps.map(function (req) {
        return _this2.find(req);
      }));

      // all required package versions have been discovered, so now packages that
      // resolved to existing versions can be resolved to their best available version
      _this2.resolvePackagesWithExistingVersions();

      activity.end();
      _this2.activity = null;
    })();
  }

  /**
    * Called by the package requester for packages that this resolver already had
    * a matching version for. Delay the resolve, because better matches can still be
    * discovered.
    */

  reportPackageWithExistingVersion(req, info) {
    this.delayedResolveQueue.push({ req: req, info: info });
  }

  /**
    * Executes the resolve to existing versions for packages after the find process,
    * when all versions that are going to be used have been discovered.
    */

  resolvePackagesWithExistingVersions() {
    for (const _ref3 of this.delayedResolveQueue) {
      const req = _ref3.req;
      const info = _ref3.info;

      req.resolveToExistingVersion(info);
    }
  }
}
exports.default = PackageResolver;