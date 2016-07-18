const React = require('react');

module.exports = React.createClass({
    pickText: function() {
        if(this.props.class === ' alert-success') {
            return <div className="text-center">New person successfully added!</div>;
        } else {
            return <div className="text-center">{this.props.err}</div>;
        }
    },
    
   render: function() {
       return <div className={'alert' + (this.props.class ? this.props.class : '')}>
            {this.pickText()}
       </div>
   } 
    
});