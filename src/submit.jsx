const React = require('react');
const Alert = require('./alert');

module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            name: '',
            role: '',
            avail: [false,false,false,false,false,false,false],
            alertStatus: null,
            err: ''
        }
    },
    
    handleNameChange: function(event) {
        this.setState({name: event.target.value});
    },
    
    handleRoleChange: function(event) {
        this.setState({role: event.target.value});
    },
    
    handleClick: function(day) {
        var newAvail = this.state.avail;
        newAvail[day] = !newAvail[day];
        this.setState({avail: newAvail});
    },
    
    handleSubmit: function() {
        if(this.state.name === '' || _.trim(this.state.name) === ''){
            this.setState({alertStatus: ' alert-danger', err:'Error: please include a name'});
        } else if (this.state.role === '' || _.trim(this.state.role) === '') {
            this.setState({alertStatus: ' alert-danger', err: 'Error: please include a role'});
        } else if (this.props.showName === 'default') {
            this.setState({alertStatus: ' alert-danger', err: 'Error: please select or create a show first (on the right)'});
        } else {
            var newEntry = this.props.db.child(this.props.showName).push({ name: this.state.name, role: this.state.role, avail: this.state.avail });
            this.setState({name: '', role: '', avail: [false, false, false, false, false, false, false], newId: newEntry});
        }
    },
    
    handleSuccessSubmit: function() {
        if(!(this.state.name === '' || this.state.role === '')) {
            this.setState({alertStatus: ' alert-success'});
        }
    },
    
    renderAlert: function() {
        if(this.state.alertStatus) {
            return <Alert class={this.state.alertStatus} err={this.state.err}/>;
        }
    },
    
    componentWillMount: function() {
        this.props.db.child('members').on('child_added', this.handleSuccessSubmit);
    },
    
    render: function() {
        return <div className="panel panel-default">
                    <div className="panel-heading"><h1 className="panel-title text-center">Add Person</h1></div>
                    <div className="panel-body">
                        {this.renderAlert()}
                        <div className="input-group">
                            <span className="input-group-addon">Name</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />    
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Role</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.role}
                                onChange={this.handleRoleChange}
                            />
                        </div>
                        Select the days this person IS available for rehearsal:
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={'btn btn-default btn-day text-center' + (this.state.avail[0] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(0)}>Sunday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[1] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(1)}>Monday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[2] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(2)}>Tuesday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[3] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(3)}>Wednesday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[4] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(4)}>Thursday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[5] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(5)}>Friday</button>
                            <button
                                type="button"
                                className={'btn btn-default btn-day' + (this.state.avail[6] ? ' selected-btn' : ' unselected-btn')}
                                onClick={() => this.handleClick(6)}>Saturday</button>
                        </div>
                        <div className="submit-btn">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleSubmit}>
                                Submit  <span className="glyphicon glyphicon-ok"></span></button>
                        </div>
                        
                    </div>
                </div>
    }
});