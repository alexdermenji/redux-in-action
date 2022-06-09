import React, { Component } from "react";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { connect } from "react-redux";
import { createTask, editTask, fetchTasks } from "./actions";
import FlashMessage from "./components/FlashMessage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }
  onCreateTask = ({ title, description, status }) => {
    this.props.dispatch(createTask(title, description, status));
  };

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
  };
}

export default connect(mapStateToProps)(App);
