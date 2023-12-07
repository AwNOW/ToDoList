const { v4: uuidv4 } = require("uuid");

export interface Task {
  id: string;
  name: string;
  status: string;
  listId: string;
}

export interface TasksState {
  [taskId: string]: Task;
}

export interface PopulateTasksAction {
  type: "tasks/POPULATE";
  tasks: Task[];
}

export interface DeleteTaskAction {
  type: "task/DELETE";
  id: Task["id"];
}

export const DeleteTask = (id: string): DeleteTaskAction => {
  return {
    type: "task/DELETE",
    id: id,
  };
};

export interface CompleteTaskAction {
  type: "task/COMPLETE";
  id: Task["id"];
  status: Task["status"];
}

export const CompleteTask = (
  id: string,
  status: string
): CompleteTaskAction => {
  return {
    type: "task/COMPLETE",
    id: id,
    status: status,
  };
};

export interface AddNewTaskAction {
  type: "task/ADD";
  name: Task["name"];
  listId: Task["listId"];
}

export const AddNewTask = (name: string, listId: string): AddNewTaskAction => {
  return {
    type: "task/ADD",
    name: name,
    listId: listId,
  };
};

// type A = {type: 'action1', a: number} | {type:'action2'}

// function ff(action: A) {
//     switch(action.type) {
//         case "action1": {
//             action.type
//             return 1
//         }
//         case "action2": {
//             action.type
//             return 2
//         }
//     }
// }

type Actions =
  | PopulateTasksAction
  | DeleteTaskAction
  | CompleteTaskAction
  | AddNewTaskAction;


const initialState: TasksState = {};

export default function tasksReducer(
  state = initialState,
  action: Actions
): TasksState {
  switch (action.type) {
    case "task/DELETE": {
      const taskIdToDelete = action.id;
      const { [taskIdToDelete]: deletedTask, ...newState } = state;
      return newState;
    }
    case "task/COMPLETE": {
      if (action.status === "In progress") {
        const updatedTask = {
          ...state[action.id],
          status: "Completed",
        };
        const newState = { ...state, [action.id]: updatedTask };
        return newState;
      } else if (action.status === "Completed") {
        const updatedTask = {
          ...state[action.id],
          status: "In progress",
        };
        const newState = { ...state, [action.id]: updatedTask };
        return newState;
      }
      return state;
    }
    case "task/ADD": {
      const newId = uuidv4();
      const newTask: Task = {
        id: newId,
        name: action.name,
        status: "In progress",
        listId: action.listId,
      };
      const newState: TasksState = {
        ...state,
        [newTask.id]: newTask,
      };
      return newState;
    }
    default:
      return state;
  }
}
