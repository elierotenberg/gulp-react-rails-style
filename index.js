var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var File = gutil.File;
var _ = require("lodash");
var R = require("react-rails");

var PLUGIN_NAME = "gulp-react-rails-style";

module.exports = function(processors) {
    processors = processors || [];
    _.each(processors, function(process) {
        R.Style.registerCSSProcessor(process);
    });
    return function() {
        var stylesheets = {};
        var components = [];

        var bufferComponent = function bufferComponent(file, enc, cb) {
            if(file.isNull()) {
                cb(null, file);
                return;
            }
            if(file.isStream()) {
                cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
                return;
            }
            try {
                components.push(require(file.path));
            }
            catch(err) {
                cb(err);
                return;
            }
            cb(null);
        };

        var endStream = function endStream(cb) {
            try {
                _.each(components, function(Component, componentName) {
                    if(Component.getStylesheetRules) {
                        _.each(Component.getStylesheetRules(), function(rules, stylesheetName) {
                            if(!stylesheets[stylesheetName]) {
                                stylesheets[stylesheetName] = new R.Stylesheet();
                            }
                            try {
                                _.each(rules, function(style, selector) {
                                    try {
                                        stylesheets[stylesheetName].registerRule(selector, style);
                                    }
                                    catch(err) {
                                        throw R.Debug.extendError(err, "Error while parsing '" + selector + "'");
                                    }
                                });
                            }
                            catch(err) {
                                throw R.Debug.extendError(err, "Error while parsing '" + componentName + "'");
                            }
                        });
                    }
                });
                _.each(stylesheets, R.scope(function(stylesheet, stylesheetName) {
                    var css = stylesheet.getProcessedCSS();
                    var file = new File({
                        path: stylesheetName + ".css",
                        contents: new Buffer(css),
                    });
                    this.push(file);
                }, this));
            }
            catch(err) {
                cb(new PluginError(PLUGIN_NAME, err.message));
                return;
            }
            cb(null);
        };

        return through.obj(bufferComponent, endStream);
    };
};
