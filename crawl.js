function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostName = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostName.length > 0 && hostName.slice(-1) === "/") {
    return hostName.slice(0, -1);
  }
  return hostName
  
}

module.exports = {
  normalizeURL,
};
