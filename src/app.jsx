const React = require('react');
const ReactDOM = require('react-dom');
const firebase = require('firebase');
const Week = require('./week');
const Submit = require('./submit');
const Alert = require('./alert');
const ShowDropdown = require('./showDropdown');

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
        return {showName:'default'};
    },
    
    setShowName: function(name) {
        //this.setState({showName: name});
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
                        <ShowDropdown db={db.ref()} setShow={this.setShowName}/> 
                    </div>
                </div>
            </div>
        </div>
    }
});

var element = React.createElement(app, {});
ReactDOM.render(element, document.querySelector('.container'));