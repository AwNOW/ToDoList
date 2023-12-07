import React from "react";
import { useDispatch } from "react-redux";
import { Task, DeleteTask, CompleteTask } from "../store/tasks";

interface TaskDetailsProps {
  tasksArr: Task[];
  task: Task;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ tasksArr, task }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {dispatch(DeleteTask(task.id));};
  const handleCompleteClick = () => {dispatch(CompleteTask(task.id, task.status));};

  const visibleIndex = tasksArr.indexOf(task) + 1;

  return (
    <li>
      <div
        className={
          task.status === "Completed"
            ? "task-section task-completed"
            : "task-section task-in-progress"
        }
      >
        <table className="table my-custom-table table-bordered">
          <tbody>
            <tr>
              <td>{`${visibleIndex}.`}</td>
              <td
                className={
                  task.status === "Completed"
                    ? "description task-completed-description"
                    : "description task-in-progress"
                }
              >
                {task.name}
              </td>
              <td>{task.status}</td>
              <td>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                  Delete
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleCompleteClick}
                >
                  {task.status === "Completed" ? "Undo" : "Finished"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  );
};

export default TaskDetails;
