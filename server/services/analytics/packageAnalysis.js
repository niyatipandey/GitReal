function decodePackageJson(content) {
  const decoded = Buffer.from(content, 'base64').toString('utf-8');

  return JSON.parse(decoded);
}

module.exports = decodePackageJson;