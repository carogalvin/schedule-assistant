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
        return <li className={this.props.className} style={{width:"100%"}}>
            <div className="li-style">
                <a onClick={this.handleClick}>{currName}</a>
                <span className="glyphicon glyphicon-remove" onClick={this.handleDelete}></span>    
            </div>
        </li> 
    }
}); 