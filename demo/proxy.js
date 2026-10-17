function simProxyUrl(url, proxy) {
  if (!proxy) return url;
  return url.replace(/^http:\/\/sylvan\.apple\.com\//, proxy.replace(/\/$/, '') + '/');
}
