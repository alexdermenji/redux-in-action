const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case "EDIT_TASK_SUCCEEDED": {
      const { payload } = action;
      const nextTasks = state.tasks.map((task) => {
        if (task.id === payload.task.id) {
          return payload.task;
        }

        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }

    case "FETCH_TASKS_SUCCEDED": {
      return {
        ...state,
        tasks: action.payload.tasks,
        isLoading: false,
      };
    }

    case "FETCH_TASKS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_TASKS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case "CREATE_TASK_SUCCEEDED": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    }

    default:
      return state;
  }
}
