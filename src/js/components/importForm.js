var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;

var ImportForm = React.createClass({
  importFile: function(e,data) {
    e.preventDefault()
    console.log(this.refs.file.getDOMNode())
    console.log(this.refs.file.getValue())
    this.props.onRequestHide()
  },  
  render: function() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Import a template' animation={false}>
        <div className='modal-body'>
            <form>
                <Input type='file' label='File' ref='file' help='Select a JSON template file.' />
            </form>
        </div>

        <div className='modal-footer'>
            <Button onClick={this.importFile}>Load template</Button>
        </div>
      </Modal>
    );
  }
});

module.exports=ImportForm;
