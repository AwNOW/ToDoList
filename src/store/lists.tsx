const { v4: uuidv4 } = require("uuid");

export interface List {
  id: string;
  name: string;
}

export interface ListsState {
  [listId: string]: List;
}

export interface AddNewListAction {
  type: "list/ADD";
}

export const AddList = (): AddNewListAction => {
  return {
    type: "list/ADD",
  };
};

export interface AddListNameAction {
  type: "list/ADD_NAME";
  id: List["id"];
  name: List["name"];
}

export const AddListName = (name: string, id: string): AddListNameAction => {
  return {
    type: "list/ADD_NAME",
    name: name,
    id: id,
  };
};

export interface DeleteListAction {
  type: "list/DELETE";
  id: List["id"];
}

export const DeleteList = (id: string): DeleteListAction => {
  return {
    type: "list/DELETE",
    id: id,
  };
};

type Actions = DeleteListAction | AddNewListAction | AddListNameAction;

const initialState: ListsState = {};

export default function listsReducer(
  state = initialState,
  action: Actions
): ListsState {
  switch (action.type) {
    case "list/ADD": {
      const newId = uuidv4();
      const newState: ListsState = {
        ...state,
        [newId]: { name: "", id: newId },
      };
      return newState;
    }
    case "list/ADD_NAME": {
      const newState = {
        ...state,
        [action.id]: { id: action.id, name: action.name },
      };
      return newState;
    }
    case "list/DELETE": {
      const listIdToDelete = action.id;
      const { [listIdToDelete]: deletedTask, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
}
