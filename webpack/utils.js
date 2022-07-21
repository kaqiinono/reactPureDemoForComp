const loaderUtils = require('loader-utils');
const path = require('path');

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
    const fileNameOrFolder = context.resourcePath.match(/index\.(css|scss|sass)$/)
        ? '[folder]/index'
        : '[name]/index';
    const hash = loaderUtils.getHashDigest(
        path.posix.relative(context.rootContext, context.resourcePath) + localName,
        'md5',
        'base64',
        5
    );
    let folderName = loaderUtils.interpolateName(
        context,
        fileNameOrFolder, // `${}_${localName}__${hash}`,
        options
    );
    // eslint-disable-next-line prefer-destructuring
    folderName = folderName.match(/([a-zA-Z]{1,})\/index/)[1];
    return loaderUtils.interpolateName(context, `${folderName}-${localName}_${hash}`, options);
}

module.exports = { getCSSModuleLocalIdent };
