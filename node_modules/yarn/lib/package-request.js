'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2;

function _load_asyncToGenerator() {
  return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _slicedToArray2;

function _load_slicedToArray() {
  return _slicedToArray2 = _interopRequireDefault(require('babel-runtime/helpers/slicedToArray'));
}

var _validate;

function _load_validate() {
  return _validate = require('./util/normalize-manifest/validate.js');
}

var _wrapper;

function _load_wrapper() {
  return _wrapper = _interopRequireDefault(require('./lockfile/wrapper.js'));
}

var _packageReference;

function _load_packageReference() {
  return _packageReference = _interopRequireDefault(require('./package-reference.js'));
}

var _index;

function _load_index() {
  return _index = _interopRequireWildcard(require('./resolvers/index.js'));
}

var _index2;

function _load_index2() {
  return _index2 = require('./resolvers/index.js');
}

var _errors;

function _load_errors() {
  return _errors = require('./errors.js');
}

var _misc;

function _load_misc() {
  return _misc = require('./util/misc.js');
}

var _constants;

function _load_constants() {
  return _constants = _interopRequireWildcard(require('./constants.js'));
}

var _version;

function _load_version() {
  return _version = _interopRequireWildcard(require('./util/version.js'));
}

var _workspaceResolver;

function _load_workspaceResolver() {
  return _workspaceResolver = _interopRequireDefault(require('./resolvers/contextual/workspace-resolver.js'));
}

var _fs;

function _load_fs() {
  return _fs = _interopRequireWildcard(require('./util/fs.js'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');
const invariant = require('invariant');
const semver = require('semver');

class PackageRequest {
  constructor(req, resolver) {
    this.parentRequest = req.parentRequest;
    this.lockfile = resolver.lockfile;
    this.registry = req.registry;
    this.reporter = resolver.reporter;
    this.resolver = resolver;
    this.optional = req.optional;
    this.pattern = req.pattern;
    this.config = resolver.config;
    this.foundInfo = null;

    resolver.usedRegistries.add(req.registry);
  }

  static getExoticResolver(pattern) {
    // TODO make this type more refined
    for (const _ref of (0, (_misc || _load_misc()).entries)((_index || _load_index()).exotics)) {
      var _ref2 = (0, (_slicedToArray2 || _load_slicedToArray()).default)(_ref, 2);

      const Resolver = _ref2[1];

      if (Resolver.isVersion(pattern)) {
        return Resolver;
      }
    }
    return null;
  }

  getParentNames() {
    const chain = [];

    let request = this.parentRequest;
    while (request) {
      const info = this.resolver.getStrictResolvedPattern(request.pattern);
      chain.unshift(info.name);

      request = request.parentRequest;
    }

    return chain;
  }

  getLocked(remoteType) {
    // always prioritise root lockfile
    const shrunk = this.lockfile.getLocked(this.pattern);

    if (shrunk && shrunk.resolved) {
      const resolvedParts = (_version || _load_version()).explodeHashedUrl(shrunk.resolved);
      // If it's a private git url set remote to 'git'.
      const preferredRemoteType = resolvedParts.url.startsWith('git+ssh://') ? 'git' : remoteType;

      return {
        name: shrunk.name,
        version: shrunk.version,
        _uid: shrunk.uid,
        _remote: {
          resolved: shrunk.resolved,
          type: preferredRemoteType,
          reference: resolvedParts.url,
          hash: resolvedParts.hash,
          registry: shrunk.registry
        },
        optionalDependencies: shrunk.optionalDependencies,
        dependencies: shrunk.dependencies
      };
    } else {
      return null;
    }
  }

  /**
   * If the input pattern matches a registry one then attempt to find it on the registry.
   * Otherwise fork off to an exotic resolver if one matches.
   */

  findVersionOnRegistry(pattern) {
    var _this = this;

    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      var _ref3 = yield _this.normalize(pattern);

      const range = _ref3.range,
            name = _ref3.name;


      const exoticResolver = PackageRequest.getExoticResolver(range);

      if (exoticResolver) {
        let data = yield _this.findExoticVersionInfo(exoticResolver, range);

        // clone data as we're manipulating it in place and this could be resolved multiple
        // times
        data = Object.assign({}, data);

        // this is so the returned package response uses the overridden name. ie. if the
        // package's actual name is `bar`, but it's been specified in the manifest like:
        //   "foo": "http://foo.com/bar.tar.gz"
        // then we use the foo name
        data.name = name;

        return data;
      }

      const Resolver = _this.getRegistryResolver();
      const resolver = new Resolver(_this, name, range);
      return resolver.resolve();
    })();
  }

  /**
   * Get the registry resolver associated with this package request.
   */

  getRegistryResolver() {
    const Resolver = (_index2 || _load_index2()).registries[this.registry];
    if (Resolver) {
      return Resolver;
    } else {
      throw new (_errors || _load_errors()).MessageError(this.reporter.lang('unknownRegistryResolver', this.registry));
    }
  }

  normalizeRange(pattern) {
    var _this2 = this;

    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      if (pattern.includes(':') || pattern.includes('@') || PackageRequest.getExoticResolver(pattern)) {
        return Promise.resolve(pattern);
      }

      if (yield (_fs || _load_fs()).exists(path.join(_this2.config.cwd, pattern))) {
        return Promise.resolve(`file:${pattern}`);
      }

      return Promise.resolve(pattern);
    })();
  }

  normalize(pattern) {
    var _this3 = this;

    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      var _PackageRequest$norma = PackageRequest.normalizePattern(pattern);

      const name = _PackageRequest$norma.name,
            range = _PackageRequest$norma.range,
            hasVersion = _PackageRequest$norma.hasVersion;

      const newRange = yield _this3.normalizeRange(range);
      return { name, range: newRange, hasVersion };
    })();
  }

  /**
   * Explode and normalize a pattern into it's name and range.
   */

  static normalizePattern(pattern) {
    let hasVersion = false;
    let range = 'latest';
    let name = pattern;

    // if we're a scope then remove the @ and add it back later
    let isScoped = false;
    if (name[0] === '@') {
      isScoped = true;
      name = name.slice(1);
    }

    // take first part as the name
    const parts = name.split('@');
    if (parts.length > 1) {
      name = parts.shift();
      range = parts.join('@');

      if (range) {
        hasVersion = true;
      } else {
        range = '*';
      }
    }

    // add back @ scope suffix
    if (isScoped) {
      name = `@${name}`;
    }

    return { name, range, hasVersion };
  }

  /**
   * Construct an exotic resolver instance with the input `ExoticResolver` and `range`.
   */

  findExoticVersionInfo(ExoticResolver, range) {
    const resolver = new ExoticResolver(this, range);
    return resolver.resolve();
  }

  /**
   * If the current pattern matches an exotic resolver then delegate to it or else try
   * the registry.
   */

  findVersionInfo() {
    const exoticResolver = PackageRequest.getExoticResolver(this.pattern);

    if (exoticResolver) {
      return this.findExoticVersionInfo(exoticResolver, this.pattern);
    } else if ((_workspaceResolver || _load_workspaceResolver()).default.isWorkspace(this.pattern, this.resolver.workspaceLayout)) {
      invariant(this.resolver.workspaceLayout, 'expected workspaceLayout');
      const resolver = new (_workspaceResolver || _load_workspaceResolver()).default(this, this.pattern, this.resolver.workspaceLayout);
      return resolver.resolve();
    } else {
      return this.findVersionOnRegistry(this.pattern);
    }
  }

  reportResolvedRangeMatch(info, resolved) {}

  /**
   * Do the final resolve of a package that had a match with an existing version.
   * After all unique versions have been discovered, so the best available version
   * is found.
   */
  resolveToExistingVersion(info) {
    // get final resolved version
    var _PackageRequest$norma2 = PackageRequest.normalizePattern(this.pattern);

    const range = _PackageRequest$norma2.range,
          name = _PackageRequest$norma2.name;

    const solvedRange = semver.validRange(range) ? info.version : range;
    const resolved = this.resolver.getHighestRangeVersionMatch(name, solvedRange);
    invariant(resolved, 'should have a resolved reference');

    this.reportResolvedRangeMatch(info, resolved);
    const ref = resolved._reference;
    invariant(ref, 'Resolved package info has no package reference');
    ref.addRequest(this);
    ref.addPattern(this.pattern, resolved);
  }

  /**
   * TODO description
   */
  find(_ref4) {
    var _this4 = this;

    let fresh = _ref4.fresh,
        frozen = _ref4.frozen;
    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      // find version info for this package pattern
      const info = yield _this4.findVersionInfo();

      info.fresh = fresh;
      (0, (_validate || _load_validate()).cleanDependencies)(info, false, _this4.reporter, function () {
        // swallow warnings
      });

      // check if while we were resolving this dep we've already resolved one that satisfies
      // the same range

      var _PackageRequest$norma3 = PackageRequest.normalizePattern(_this4.pattern);

      const range = _PackageRequest$norma3.range,
            name = _PackageRequest$norma3.name;

      const solvedRange = semver.validRange(range) ? info.version : range;
      const resolved = !info.fresh || frozen ? _this4.resolver.getExactVersionMatch(name, solvedRange) : _this4.resolver.getHighestRangeVersionMatch(name, solvedRange);
      if (resolved) {
        _this4.resolver.reportPackageWithExistingVersion(_this4, info);
        return;
      }

      if (info.flat && !_this4.resolver.flat) {
        throw new (_errors || _load_errors()).MessageError(_this4.reporter.lang('flatGlobalError'));
      }

      // validate version info
      PackageRequest.validateVersionInfo(info, _this4.reporter);

      //
      const remote = info._remote;
      invariant(remote, 'Missing remote');

      // set package reference
      const ref = new (_packageReference || _load_packageReference()).default(_this4, info, remote);
      ref.addPattern(_this4.pattern, info);
      ref.addOptional(_this4.optional);
      ref.setFresh(fresh);
      info._reference = ref;
      info._remote = remote;

      // start installation of dependencies
      const promises = [];
      const deps = [];

      // normal deps
      for (const depName in info.dependencies) {
        const depPattern = depName + '@' + info.dependencies[depName];
        deps.push(depPattern);
        promises.push(_this4.resolver.find({
          pattern: depPattern,
          registry: remote.registry,
          // dependencies of optional dependencies should themselves be optional
          optional: _this4.optional,
          parentRequest: _this4
        }));
      }

      // optional deps
      for (const depName in info.optionalDependencies) {
        const depPattern = depName + '@' + info.optionalDependencies[depName];
        deps.push(depPattern);
        promises.push(_this4.resolver.find({
          pattern: depPattern,
          registry: remote.registry,
          optional: true,
          parentRequest: _this4
        }));
      }
      if (remote.type === 'workspace' && !_this4.config.production) {
        // workspaces support dev dependencies
        for (const depName in info.devDependencies) {
          const depPattern = depName + '@' + info.devDependencies[depName];
          deps.push(depPattern);
          promises.push(_this4.resolver.find({
            pattern: depPattern,
            registry: remote.registry,
            optional: false,
            parentRequest: _this4
          }));
        }
      }

      yield Promise.all(promises);
      ref.addDependencies(deps);

      // Now that we have all dependencies, it's safe to propagate optional
      for (const otherRequest of ref.requests.slice(1)) {
        ref.addOptional(otherRequest.optional);
      }
    })();
  }

  /**
   * TODO description
   */

  static validateVersionInfo(info, reporter) {
    // human readable name to use in errors
    const human = `${info.name}@${info.version}`;

    info.version = PackageRequest.getPackageVersion(info);

    for (const key of (_constants || _load_constants()).REQUIRED_PACKAGE_KEYS) {
      if (!info[key]) {
        throw new (_errors || _load_errors()).MessageError(reporter.lang('missingRequiredPackageKey', human, key));
      }
    }
  }

  /**
   * Returns the package version if present, else defaults to the uid
   */

  static getPackageVersion(info) {
    // TODO possibly reconsider this behaviour
    return info.version === undefined ? info._uid : info.version;
  }

  /**
   * Gets all of the outdated packages and sorts them appropriately
   */

  static getOutdatedPackages(lockfile, install, config, reporter) {
    return (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
      var _ref5 = yield install.fetchRequestFromCwd();

      const depReqPatterns = _ref5.requests;


      const deps = yield Promise.all(depReqPatterns.map((() => {
        var _ref6 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (_ref7) {
          let pattern = _ref7.pattern,
              hint = _ref7.hint;

          const locked = lockfile.getLocked(pattern);
          if (!locked) {
            throw new (_errors || _load_errors()).MessageError(reporter.lang('lockfileOutdated'));
          }

          const name = locked.name,
                current = locked.version;

          let latest = '';
          let wanted = '';
          let url = '';

          const normalized = PackageRequest.normalizePattern(pattern);

          if (PackageRequest.getExoticResolver(pattern) || PackageRequest.getExoticResolver(normalized.range)) {
            latest = wanted = 'exotic';
            url = normalized.range;
          } else {
            const registry = config.registries[locked.registry];

            var _ref8 = yield registry.checkOutdated(config, name, normalized.range);

            latest = _ref8.latest;
            wanted = _ref8.wanted;
            url = _ref8.url;
          }

          return { name, current, wanted, latest, url, hint };
        });

        return function (_x) {
          return _ref6.apply(this, arguments);
        };
      })()));

      // Make sure to always output `exotic` versions to be compatible with npm
      const isDepOld = function (_ref9) {
        let current = _ref9.current,
            latest = _ref9.latest,
            wanted = _ref9.wanted;
        return latest === 'exotic' || latest !== 'exotic' && (semver.lt(current, wanted) || semver.lt(current, latest));
      };
      const orderByName = function (depA, depB) {
        return depA.name.localeCompare(depB.name);
      };

      return deps.filter(isDepOld).sort(orderByName);
    })();
  }
}
exports.default = PackageRequest;