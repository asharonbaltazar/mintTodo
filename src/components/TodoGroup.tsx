import { Fragment, useState } from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Todos } from "../types";
import { ChevronDown, ChevronUp } from "./icons/Icons";

interface IProps {
  title: string;
  todos: Todos;
}

const showArrow = (conditional: boolean) =>
  conditional ? (
    <ChevronUp className="h-4 w-5" />
  ) : (
    <ChevronDown className="h-4 w-5" />
  );

const TodoGroup = ({ title, todos }: IProps) => {
  const showTitles = useSelector((state: RootState) => state.filter.showDates);
  const [displayGroup, setDisplayGroup] = useState(true);
  return (
    <Fragment key={title}>
      {showTitles && (
        <button
          className="w-full flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
          onClick={() =>
            title.length &&
            setDisplayGroup((prevState) => (prevState = !displayGroup))
          }
        >
          <h2 className="sticky top-0 left-0 p2-4 px-3 bg-white text-gray-500">
            {title}
          </h2>
          {title.length ? showArrow(displayGroup) : null}
        </button>
      )}
      <div>
        {displayGroup && (
          <>
            {todos.map((todo) => (
              <Todo key={todo.id + todo.completed} todo={todo} />
            ))}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default TodoGroup;
