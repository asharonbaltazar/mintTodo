import { FormEvent, useState } from "react";
import { useAppDispatch } from "../store";
import { addTodo } from "../slices/todos";
import { Add } from "./icons/Icons";

const AddInput = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useAppDispatch();

  const onTodoSubmit = (event: FormEvent<HTMLFormElement>) => {
    //Prevent page from refreshing
    event.preventDefault();

    if (todoTitle) {
      dispatch(addTodo(todoTitle));
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={(e) => onTodoSubmit(e)}>
      <div className="relative flex items-center text-gray-400 focus-within:text-blue-500">
        <input
          className="py-2 pr-6 font-medium text-black border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
          type="text"
          id="add-input"
          placeholder="Create a todo"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="absolute right-0 focus:outline-none" type="submit">
          <Add className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default AddInput;
