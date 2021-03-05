import { Dispatch, Fragment, SetStateAction } from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import { RootState } from "../store";
import { ChevronDown, ChevronUp } from "./icons/Icons";
import { Todos } from "../types";

interface IProps {
  title: string;
  todos: Todos;
  collapsibleHeaders: string[];
  setCollapsibleHeaders: Dispatch<SetStateAction<string[]>>;
}

const showArrow = (conditional: boolean) =>
  conditional ? (
    <ChevronUp className="h-4 w-5 mx-3 text-gray-500" />
  ) : (
    <ChevronDown className="h-4 w-5 mx-3 text-gray-500" />
  );

const TodoGroup = ({
  title,
  todos,
  collapsibleHeaders,
  setCollapsibleHeaders,
}: IProps) => {
  const showTitles = useSelector((state: RootState) => state.filter.showTitles);

  const onClick = (title: string) => {
    collapsibleHeaders.includes(title)
      ? setCollapsibleHeaders((prevState) =>
          prevState.filter((element) => element !== title)
        )
      : setCollapsibleHeaders((prevState) => [...prevState, title]);
  };

  return (
    <Fragment key={title}>
      {showTitles && (
        <button
          className="w-full flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
          onClick={() => onClick(title)}
        >
          <h2 className="sticky top-0 left-0 p2-4 px-3 bg-white text-gray-500">
            {title}
          </h2>
          {title.length ? showArrow(collapsibleHeaders.includes(title)) : null}
        </button>
      )}
      <div className="space-y-3">
        {collapsibleHeaders.includes(title) ? null : (
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
