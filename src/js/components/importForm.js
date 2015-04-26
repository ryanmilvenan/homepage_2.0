var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var ImportForm = React.createClass({
  getInitialState: function() {
    return {template: false};
  },
  importFile: function(e,data) {
    e.preventDefault()
    console.log(this.refs.file.getDOMNode())
    console.log(this.refs.file.getValue())
    this.props.onRequestHide()
  },  
  render: function() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Import from...' animation={false}>
        <div className='modal-body'>
          <TabbedArea defaultActiveKey={1}>
            <TabPane eventKey={1} tab='Choose a template'>pictures of templates</TabPane>
            <TabPane eventKey={2} tab='Upload a file'>
              <form>
                  <Input type='file' label='File' ref='file' help='Select a JSON template file.' />
              </form>
              <div className='modal-footer'>
                  <Button onClick={this.importFile}>Load template</Button>
              </div>
            </TabPane>
          </TabbedArea>
        </div>
      </Modal>
    );
  }
});

module.exports=ImportForm;
