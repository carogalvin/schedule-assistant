const React = require('react');
var _ = require('lodash');

var dayNames = ['Sunday',
                 'Monday',
                 'Tuesday',
                 'Wednesdsay',
                 'Thursday',
                 'Friday',
                 'Saturday'];

module.exports = React.createClass({
    
    renderPeople: function(i) {
         if(!(this.props.people && Object.keys(this.props.people).length === 0)) {
             var people = [];
             this.props.people.forEach( function(member) {
                 person = member.val();
                 console.log(person);
                 if(person.avail[i]){
                     people.push(<div key={member.key} name={person.name}>{person.name}</div>);
                 }
             });
             return _.sortBy(people, function(m) { 
                 return m.props.name.toLowerCase();
             });
         }
    },
    
    getColour: function() {
        var alpha = (1 - ((this.props.avail[this.props.name] / this.props.tot) / this.props.maxAvail))*.5;
        return 'rgba(0,0,0,' + alpha + ')';
    },
    
    render: function() {
        var people = this.renderPeople(this.props.name);
        return <div className="col-md-2 col-xs-14 col"> 
            <div className="panel panel-default day" style={{backgroundColor:this.getColour()}}>
                <div className="panel-heading">{dayNames[this.props.name]}</div>
                <div className="panel-body">
                    {people}
                </div>
            </div>
        </div>
    }
});