const React = require('react');
const CreateShow = require('./createShow');
const ListItem = require('./listItem');
const _ = require('lodash');

module.exports = React.createClass({
    getInitialState: function() {
        return {open: false, currSelected: '', tempShows: []};
    },
    
    handleClick: function() {
        this.setState({open: !this.state.open});
    },
    
    handleItemClick: function(name) {
        this.setState({currSelected: name, open: false});
        this.props.setShow(name);
    },
    
    addShow: function(name) {
        var shows = this.state.tempShows;
        shows.push(name);
        shows = _.sortBy(shows);
        this.setState({tempShows: shows, currSelected: name, open: false});
        this.props.setShow(name);
    },
    
    render: function() {
        var shows = _.sortBy(_.uniq(this.props.showList.concat(this.state.tempShows)));
        var list = [];
        if(_.isEmpty(shows)) {
            list = [<li className="li-empty">No shows currently</li>]
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
              <span className="showname">{this.state.currSelected ? this.state.currSelected : 'Select Your Show'}</span> <span className="caret"></span>
          </button>
            <ul className={"dropdown-menu " + (this.state.open ? "show" : "")}>
                {list}
                <li role="separator" className="divider"></li>
                <CreateShow addShow={this.addShow}/>
            </ul>
            
        </div>
    } 
});  