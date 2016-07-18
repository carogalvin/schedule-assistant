const React = require('react');
const Modal = require('react-bootstrap').Modal;
const _ = require('lodash');

module.exports = React.createClass({
getInitialState: function() {
    return { showModal: false, name: '', err: false };
  },

  close: function() {
    this.setState({ showModal: false, name: '', err: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },
    
    handleNameChange: function(event) {
        this.setState({name: event.target.value});
    },
    
    addShow: function() {
        if(!_.isEmpty(this.state.name)) {
            this.props.addShow(this.state.name);
            this.close();
        } else {
            this.setState({err: true});
        } 
    },
    
    render: function() {
        return <div>
            <button onClick={this.open} className="btn btn-default shownew">Add a new show</button>
        <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Body>
                <div className="input-group">
                            <span className="input-group-addon">Show Title</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />     
                        </div>
            </Modal.Body>
            <Modal.Footer>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td className={'error-left ' + (this.state.err ? 'show' : '')}>
                                Please enter a title
                            </td>
                            <td className="right-align"> 
                                <button onClick={this.close} className="btn btn-default">Cancel</button>
                                <button onClick={this.addShow} className="btn btn-default">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Footer>
            </Modal>
        </div>
    }
});