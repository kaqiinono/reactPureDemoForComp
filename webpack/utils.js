const loaderUtils = require('loader-utils');
const path = require('path');

const pkg = require('../package.json');

function toLine(name) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
    const fileNameOrFolder = context.resourcePath.match(/index\.(css|scss|sass)$/) ? '[folder]' : '[name]';
    const hash = loaderUtils.getHashDigest(path.posix.relative(context.rootContext, context.resourcePath) + localName, 'md5', 'base64', 5);
    const className = loaderUtils.interpolateName(
        context,
        `${pkg ? `${pkg.name}-` : ''}${toLine(fileNameOrFolder)}_${localName}__${hash}`,
        options
    );
    return className;
}

module.exports = { getCSSModuleLocalIdent };
