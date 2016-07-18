const React = require('react');
const _ = require('lodash');

module.exports = React.createClass({
    handleClick: function(name) {
        this.props.whenItemClicked(name)   
    },
    
    render: function() {
        var currName = this.props.showName;
        console.log(currName);
        if(_.isEmpty(currName)) {
            return <li className="li-empty">No shows currently</li>
        } else {
            return <li className={this.props.className}><a onClick={this.handleClick(currName)}>{currName}</a></li>
        }
    }
}); 