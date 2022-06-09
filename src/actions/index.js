import * as api from "../api";

let id = 1;
export function uniqueId() {
  return id++;
}

export function createTaskSucceded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function createTask(title, description, status = "Unstarted") {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      dispatch(createTaskSucceded(resp.data));
    });
  };
}

function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function editTaskSucceeded(task) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks, id);
    const updatedTask = { ...task, ...params };
    api.editTask(id, updatedTask).then((resp) => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
}

export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());
    api
      .fetchTasks()
      .then((response) => {
        dispatch(fetchTasksSucceded(response.data));
        // throw new Error("Unable to fetch tasks");
      })
      .catch((error) => {
        dispatch(fetchTasksFailed(error.message));
      });
  };
}

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

export function fetchTasksSucceded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEDED",
    payload: {
      tasks,
    },
  };
}

export function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
}
