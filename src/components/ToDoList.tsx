import React, { useState, FormEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import TaskDetails from "./TaskDetails";
import { useAppSelector } from "../store/index";
import { AddListName, DeleteList } from "../store/lists";
import { AddNewTask } from "../store/tasks";
import {selectTasksById, selectListById} from "../selectors/selectors"



type ToDoListProps = {
  toDoListId: string;
};


function ToDoList({ toDoListId }: ToDoListProps) {

  const selectorForTasks = useCallback(() => selectTasksById(toDoListId), [toDoListId]);
  const tasks = useAppSelector(selectorForTasks());

  const selectorForList = useCallback(() => selectListById(toDoListId), [toDoListId]);
  const list = useAppSelector(selectorForList())!;


  const [description, setDescription] = useState("");
  const [listName, setListName] = useState(list.name);

  const dispatch = useDispatch();

  const saveDescription = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.length === 0) {
      alert("Description is missing!");
      return;
    }
    dispatch(AddNewTask(description, toDoListId));
    setDescription("");
  };

  const confirmListNameFunc: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    dispatch(AddListName(listName, toDoListId));
  };

  const deleteListFunc: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(DeleteList(toDoListId));
  };

  return (
    <>
      <div className="main-panel">
        <div className="name-content">
          <input
            type="text"
            className="list-name"
            placeholder="To Do List No.1"
            value={listName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListName(e.target.value)
            }
          />
          <button
            className="btn btn-confirm-name btn-primary"
            onClick={confirmListNameFunc}
          >
            Confirm Name
          </button>
        </div>
        <div className="btn-delete-content">
          <button
            className="btn btn-delete-list btn-danger"
            onClick={deleteListFunc}
          >
            X
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center mb-2">
        <form className="form" onSubmit={saveDescription}>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter a task here"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <button type="submit" className="btn btn-primary mr-3">
            Save
          </button>
        </form>
      </div>

      <h2 className="lead-row">All tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskDetails key={task.id} task={task} tasksArr={tasks} />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
