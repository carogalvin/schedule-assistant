const React = require('react');
const Day = require('./day');
var _ = require('lodash');

var maxAvailability = 0;
var avails = [0,0,0,0,0,0,0];
var tot = 0;

module.exports = React.createClass({
    componentWillMount: function() {
        this.props.db.child(this.props.showName).on('value', this.handleValues);    
    },
    
    getInitialState: function() {
        return {
            people: {}
        }
    },
    
    handleValues: function(snap) {
        this.calcMaxAvailability(snap);
        this.setState({people: snap});
        
    },
    
    calcMaxAvailability: function(snapshot) {
        var availsPercent = [0,0,0,0,0,0,0];
        if(!(snapshot && Object.keys(snapshot).length === 0)) {
             var people = [];
             snapshot.forEach( function(member) {
                 tot++;
                 person = member.val();
                 for(i in _.range(7)) {
                     if(person.avail[i]){
                         avails[i]++;
                     }
                 }
             });
            for(j in _.range(7)) {
                availsPercent[j] = avails[j] / tot;
            }
        } else {
            maxAvailability = 0;
            avails = [0,0,0,0,0,0,0];
            tot = 0;
        }
        maxAvailability = _.max(availsPercent);    
    },
    
    render: function() {
        return <div>
            {this.renderWeek()}
        </div>
    },
    
    renderWeek: function() {
        var days = [];

        for(d in _.range(7)) {
            days.push(
                <div key={d}>
                    <Day name={d} people={this.state.people} maxAvail={maxAvailability} avail={avails} tot={tot}/>
                </div>
            );
        }
        return days;
    }
});