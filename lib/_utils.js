"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase = require("camelcase");
var pgk = require("../package.json");
var getPluginName = function () {
    var name = camelCase(pgk.name);
    return name.charAt(0).toUpperCase() + name.slice(1);
};
exports.getPluginName = getPluginName;
var tap = function (tappable, hook, name, plugin) { return (tappable.hooks
    ? tappable.hooks[camelCase(hook)] && tappable.hooks[camelCase(hook)].tap(name, plugin)
    : tappable.plugin(hook, plugin)); };
exports.tap = tap;
var tapHtml = function (tappable, name, plugin) {
    try {
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        return HtmlWebpackPlugin.getHooks
            ? HtmlWebpackPlugin.getHooks(tappable).afterTemplateExecution.tapAsync(name, plugin)
            : module.exports.tap(tappable, 'html-webpack-plugin-before-html-processing', name, plugin);
    }
    catch (_) {
    }
};
exports.tapHtml = tapHtml;
var getHtmlWebpackOptions = function (pluginArgs) { return (pluginArgs && pluginArgs.plugin && pluginArgs.plugin.options)
    ? pluginArgs.plugin.options
    : {}; };
exports.getHtmlWebpackOptions = getHtmlWebpackOptions;
var mergeCustomOptions = function (pluginArgs, options) {
    if (pluginArgs === void 0) { pluginArgs = []; }
    if (options === void 0) { options = []; }
    var tempArr = pluginArgs.slice();
    debugger;
    options.forEach(function (item) {
        if (typeof item === 'string') {
            !tempArr.includes(item) && tempArr.push(item);
        }
        else {
            var findArr = tempArr.find(function (n) { return n.url === item.url; });
            findArr ? Object.assign(findArr, item) : tempArr.push(item);
        }
    });
    return tempArr;
};
exports.mergeCustomOptions = mergeCustomOptions;
