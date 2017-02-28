const React = require('react');
const ReactDOM = require('react-dom');
const firebase = require('firebase');
const Week = require('./week');
const Submit = require('./submit');
const Alert = require('./alert');
const ShowDropdown = require('./showDropdown');
const _ = require('lodash');

var fbConfig = {
    apiKey: "AIzaSyC8uVGIi_sF41N5Rm0CXulwGOJk-pjwz-A",
    authDomain: "scheduler-a7615.firebaseapp.com",
    databaseURL: "https://scheduler-a7615.firebaseio.com",
    storageBucket: "",
};

firebase.initializeApp(fbConfig);

var db = firebase.database();

var app = React.createClass({
    getInitialState: function() {
        return {showName:'default', showList: []};
    },
    
    setShowName: function(name) {
        this.setState({showName: name});
    },
    
    componentWillMount: function() {
        db.ref().on('value', this.showList);
    },
    
    showList: function(snap) {
        console.log(Object.keys(snap.val()));
        var currShows = _.uniq(this.state.showList.concat(Object.keys(snap.val())));
        console.log(currShows);
        this.setState({showList: currShows});
    },
    
    render: function() {
        return <div className="row">
            <div className="col-xs-14">
                <div className="row">
                    <h1 className="text-center col-xs-14"> Scheduler </h1>
                </div>
                <div className="row">
                    <Week db={db.ref()} showName={this.state.showName}/>
                </div>
                <div className="row">
                    <div className="col-md-8 col">
                        <Submit db={db.ref()} showName={this.state.showName}/>
                    </div>
                    <div className="col-md-4 col-md-offset-1 col">
                        <ShowDropdown showList={this.state.showList} setShow={this.setShowName}/> 
                    </div>
                </div>
            </div>
        </div>
    }
});

var element = React.createElement(app, {});
ReactDOM.render(element, document.querySelector('.container'));