import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Todo from "./Todo";
import dayjs from "dayjs";

interface DatedTodoArray {
  [date: string]: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[];
}

const TodosList = () => {
  const todos = useSelector((state: RootState) => state.todos);

  return (
    <div className="w-1/3 relative space-y-2">
      {Object.entries(
        todos.reduce((acc, todo) => {
          const formattedDate = dayjs(todo.date).format("M/D/YYYY");
          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }
          acc[formattedDate].push(todo);
          return acc;
        }, {} as DatedTodoArray)
      ).map(([date, todos], index) => (
        <Fragment key={index}>
          <h2 className="sticky top-0 left-0 p2-4 px-3 bg-white text-gray-500">
            {dayjs(date).format("dddd")}
          </h2>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default TodosList;
