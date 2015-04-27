var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Panel = require('react-bootstrap').Panel;

var ImportForm = React.createClass({
  getInitialState: function() {
    return {template: false, activeKey: '1'};
  },
  importFile: function(e,data) {
    e.preventDefault()
    console.log(this.refs.file.getDOMNode())
    console.log(this.refs.file.getValue())
    this.props.onRequestHide()
  },  
  handleSelect: function(activeKey) {
    this.setState({ activeKey });
  },
  render: function() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Import from...' animation={false}>
        <div className='modal-body'>
          <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
            <Panel header='Choose a template' eventKey='1'>
              pictures of templates
            </Panel>
            <Panel header='Upload a file' eventKey='2'>
              <form>
                  <Input type='file' label='File' ref='file' help='Select a JSON template file.' />
              </form>
              <div className='modal-footer'>
                  <Button onClick={this.importFile}>Load template</Button>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </Modal>
    );
  }
});

module.exports=ImportForm;
