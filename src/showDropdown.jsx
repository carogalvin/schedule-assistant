const React = require('react');
const CreateShow = require('./createShow');
const ShowList = require('./showList');

module.exports = React.createClass({
    getInitialState: function() {
        return {open: false, shows: []};
    },
    
    handleClick: function() {
        this.setState({open: !this.state.open});
    },
    
    handleItemClick: function() {
        this.props.setShow(name);
    },
    
    addShow: function(name) {
        console.log(name);
        var showNames = this.state.shows;
        showNames.push(name);
        this.setState({shows: showNames});
    },
    
    render: function() {
        return <div className="dropdown">
          <button type="button" className="btn btn-default dropdown-toggle" onClick={this.handleClick}>
            Select Your Show <span className="caret"></span>
          </button>
            <ul className={"dropdown-menu " + (this.state.open ? "show" : "")}>
                <ShowList showNames={this.state.shows}/>
                <li role="separator" className="divider"></li>
                <CreateShow db={this.props.db} addShow={this.addShow}/>
            </ul>
            
        </div>
    }
});