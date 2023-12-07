import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/index";
import ToDoList from "./components/ToDoList";
import { AddList, List } from "./store/lists";

function App() {

  const lists = useAppSelector((state) => state.lists);
  const listsArr: List[] = Object.values(lists);

  const dispatch = useDispatch();

  const handleAddList = () => {
    dispatch(AddList());
  };

  return (
    <>
      <div className="nav-row-btn">
        <button className="btn btn-primary" onClick={handleAddList}>
          Add New List
        </button>
      </div>
      <div className="all-lists-component">
        {listsArr.map((todolist) => {
          return (
            <div key={todolist.id} id="root-new">
              <ToDoList toDoListId={todolist.id} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
