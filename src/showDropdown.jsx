const React = require('react');
const CreateShow = require('./createShow');
const ListItem = require('./listItem');

module.exports = React.createClass({
    componentWillMount: function() {
        this.props.db.on('child_added', this.handleNewShow);
    },
    
    getInitialState: function() {
        return {open: false, shows: [], currSelected: ''};
    },
    
    handleNewShow: function(snap) {
        var shows = this.state.shows;
        shows.push(snap.val());
        this.setState({shows: shows});
    },
    
    handleClick: function() {
        this.setState({open: !this.state.open});
    },
    
    handleItemClick: function(name) {
        //this.setState({currSelected: name});
        //this.props.setShow(name);
    },
    
    addShow: function(name) {
        this.props.db.push(name);
    },
    
    render: function() {
        var shows = this.state.shows;
        var list = [];
        if(_.isEmpty(shows)) {
            list = <li className="li-empty">No shows currently</li>
        } else {
            list = shows.map(function(item) {
               return <ListItem 
                        showName={item} 
                        whenItemClicked={this.handleItemClick}
                        className = {this.state.currSelected === item ? "active" : ""}
                      /> 
                }.bind(this));
        }
        
        return <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" onClick={this.handleClick}>
              {this.state.currSelected ? this.state.currSelected : 'Select Your Show'} <span className="caret"></span>
          </button>
            <ul className={"dropdown-menu " + (this.state.open ? "show" : "")}>
                {list}
                <li role="separator" className="divider"></li>
                <CreateShow db={this.props.db} addShow={this.addShow}/>
            </ul>
            
        </div>
    } 
});  