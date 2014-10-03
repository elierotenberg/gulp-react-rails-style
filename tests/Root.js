/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var assert = require("assert");

var Root = React.createClass(/** @lends Root.prototype */{displayName: 'Root',
    mixins: [R.Root.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".Root": {
                        width: 980,
                        marginLeft: "auto",
                        marginRight: "auto",
                        transform: "rotate(90deg)",
                    },
                },
            };
        },
    },
    render: function render() {
        return null;
    },
});

module.exports = Root;
