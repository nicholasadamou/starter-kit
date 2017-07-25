'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequestToRegistry;

var _url;

function _load_url() {
  return _url = _interopRequireDefault(require('url'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isRequestToRegistry(requestUrl, registry, customHostSuffix) {
  const requestParsed = (_url || _load_url()).default.parse(requestUrl);
  const registryParsed = (_url || _load_url()).default.parse(registry);
  const requestHost = requestParsed.hostname || '';
  const registryHost = registryParsed.hostname || '';
  const requestPort = getPortOrDefaultPort(requestParsed.port, requestParsed.protocol);
  const registryPort = getPortOrDefaultPort(registryParsed.port, registryParsed.protocol);
  const requestPath = requestParsed.path || '';
  const registryPath = registryParsed.path || '';

  return requestHost === registryHost && requestPort === registryPort && (requestPath.startsWith(registryPath) ||
  // For some registries, the package path does not prefix with the registry path
  !!customHostSuffix && customHostSuffix.length > 0 && requestHost.endsWith(customHostSuffix));
}

function getPortOrDefaultPort(port, protocol) {
  if (protocol === 'https:' && port === '443') {
    return null;
  }
  if (protocol === 'http:' && port === '80') {
    return null;
  }
  return port;
}