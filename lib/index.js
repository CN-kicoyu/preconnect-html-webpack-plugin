"use strict";
var assert = require("assert");
var _utils_1 = require("./_utils");
var PLUGIN_NAME = _utils_1.getPluginName();
var PreconnectHtmlWebpackPlugin = (function () {
    function PreconnectHtmlWebpackPlugin(options) {
        if (options === void 0) { options = []; }
        this.options = options.slice();
    }
    PreconnectHtmlWebpackPlugin.prototype.apply = function (compiler) {
        var _this = this;
        var run = function (_compiler) {
            _utils_1.tapHtml(_compiler, PLUGIN_NAME, _this.handlerHtmlPluginLinks.bind(_this));
        };
        _utils_1.tap(compiler, 'compilation', PLUGIN_NAME, run);
    };
    PreconnectHtmlWebpackPlugin.prototype.handlerHtmlPluginLinks = function (htmlPluginData, htmlWebpackPluginCallback) {
        var preconnect = _utils_1.getHtmlWebpackOptions(htmlPluginData).preconnect;
        preconnect = _utils_1.mergeCustomOptions(preconnect, this.options);
        preconnect && assert.equal(preconnect instanceof Array, true, new TypeError('preconnect need array'));
        if (preconnect.length) {
            var idx = (htmlPluginData.html + '</head>').search(/<\/head>/i);
            var tags = preconnect.map(function (item) {
                return "<link rel=\"preconnect\" href=\"" + (typeof item === 'string' ? item : item.url) + "\" " + (typeof item !== 'string' && item.crossorigin ? 'crossorigin' : '') + "/>";
            });
            htmlPluginData.html = [htmlPluginData.html.slice(0, idx)].concat(tags, [htmlPluginData.html.slice(idx)]).join('');
        }
        typeof htmlWebpackPluginCallback === 'function' && htmlWebpackPluginCallback();
    };
    return PreconnectHtmlWebpackPlugin;
}());
module.exports = PreconnectHtmlWebpackPlugin;
