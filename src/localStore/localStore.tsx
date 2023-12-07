import configureStore, { StoreState } from "../store/index";

export const store = configureStore();

export const saveToLocalStorage = (storeState: StoreState) => {
  try {
    // list IDs from lists splice of state
    const listIdArr = Object.values(storeState.lists).map((item) => item.id);

    // list IDs from tasks splice of state
    const taskListIdArr = Object.values(storeState.tasks).map((task) => task.listId);

    // array of IDs that are not in use, not attached to any task
    const difference = listIdArr.filter((element) => !taskListIdArr.includes(element));

    const updatedLists: { [key: string]: any } = {}; // ?? sprawdzić typowanie
    for (const key in storeState.lists) {
      if (!difference.includes(key)) {
        updatedLists[key] = storeState.lists[key];
      }
    }
    const updatedState = {
      ...storeState,
      lists: updatedLists,
    };
    const serialisedState = JSON.stringify(updatedState);
    localStorage.setItem("state", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("state");
    if (serialisedState === null) return undefined;
    const savedState: StoreState = JSON.parse(serialisedState);
    return savedState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
