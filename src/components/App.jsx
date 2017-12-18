import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder,  clearReminders } from '../actions';
import moment from 'moment';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const {reminders} = this.props;

    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                  <div className="list-item">
                    <div>{reminder.text}</div>
                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                  </div>
                  <div
                    onClick={()=>this.deleteReminder(reminder.id)}
                    className="list-item delete-button">
                      &#x2715;
                  </div>
              </li>
            )
          })
        }
      </ul>
    )
  }


  render() {

    return (
      <div className="app">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange={e => this.setState({text: e.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={e => this.setState({dueDate: e.target.value })}
            />
          </div>
          <button type="button"
          className="btn btn-success"
          onClick={()=> this.addReminder()}
          >Add reminder</button>
        </div>
          {this.renderReminders()}
          <div className="btn btn-danger" onClick={ () => this.props.clearReminders()}>
            Clear reminders
          </div>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({addReminder}, dispatch);
// }

function mapStateToProps(state) {
  return {
    reminders: state
  }
}


export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);