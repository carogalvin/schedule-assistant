const React = require('react');
const _ = require('lodash');

module.exports = React.createClass({
    handleClick: function() {
        this.props.whenItemClicked(this.props.showName); 
    },
    
    handleDelete: function() {
        console.log('hit the button!');
    },
    
    render: function() {
        var currName = this.props.showName;
        return <li className={this.props.className}>
                    <a style={{display:"inline"}} onClick={this.handleClick}>{currName}</a>
            <a style={{display:"inline"}} onClick={this.handleDelete}><span className="glyphicon glyphicon-remove"></span></a>            
        </li> 
    }
}); 