module.exports = function(url, prev) {
  return {
    file: url.replace(/~/g, 'node_modules/')
  };
}