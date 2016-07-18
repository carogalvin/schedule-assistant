const React = require('react');
const _ = require('lodash');

module.exports = React.createClass({
    render: function() {
        var children = [];
        
        if(_.isEmpty(this.props.showNames)) {
            return <li className="li-empty">No shows currently</li>
        } else {
            for(i in this.props.showNames) {
                children.push(<li>{this.props.showNames[i]}</li>);
            }
            return <ul>{children}</ul>;
        }
        
    }
});