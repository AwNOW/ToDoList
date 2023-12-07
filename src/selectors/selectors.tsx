import { createSelectorCreator, defaultMemoize } from "reselect";
import { List } from "../store/lists";
import { Task } from "../store/tasks";
import { StoreState } from "../store/index";


export const myCreateSelector = createSelectorCreator(defaultMemoize, {
    resultEqualityCheck: (a: Task[], b: Task[]) => {
      const isDiff1 = !!a.find((el, i) => b[i] !== el);
      const isDiff2 = !!b.find((el, i) => a[i] !== el);
      return !(isDiff1 || isDiff2);
    },
  });

export const selectTasksById = (a: string) =>
    myCreateSelector([(state: StoreState) => state.tasks], (tasks) => {
      const tasksArr = Object.values(tasks).filter(
        (task: Task) => task.listId === a
      );
      return tasksArr;
    });

export const selectListById = (a: string) =>
    myCreateSelector([(state: StoreState) => state.lists], (lists) => {
      const list = Object.values(lists).find(
        (list: List) => list.id === a
      );
      return list;
    });
