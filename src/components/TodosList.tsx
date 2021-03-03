import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Todo from "./Todo";
import Filter from "./Filter";
import dayjs from "dayjs";

type Todos = { id: string; title: string; completed: boolean; date: string }[];
type sortOptions = {
  filterBy: "creation" | "completion" | "alphabetically";
  ascending: boolean;
  showDates: boolean;
};
interface DatedTodoArray {
  [title: string]: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[];
}

const sort = (
  todos: Todos,
  sortOptions: sortOptions
): [
  string,
  {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[]
][] => {
  // Split todos into date tuples [date, todos]
  if (sortOptions.filterBy === "creation") {
    const creationDateSortedTodos = Object.entries(
      todos.reduce((acc, todo) => {
        if (!acc[todo.date]) {
          acc[todo.date] = [];
        }
        acc[todo.date].push(todo);
        return acc;
      }, {} as DatedTodoArray)
    );
    // First sort by JS dates and then map through keys to rename the dates to something more human
    return Object.values(creationDateSortedTodos)
      .sort((a, b) =>
        sortOptions.ascending
          ? Number(new Date(b[0])) - Number(new Date(a[0]))
          : Number(new Date(a[0])) - Number(new Date(b[0]))
      )
      .map(([date, todos]) => [dayjs(date).format("dddd"), todos]);
  } else if (sortOptions.filterBy === "completion") {
    // Split todos into completed and not-completed tuples [completed, todos]
    const completionSortedTodos = Object.entries(
      todos.reduce((acc, todo) => {
        const completed = todo.completed ? "Completed" : "";
        if (!acc[completed]) {
          acc[completed] = [];
        }
        acc[completed].push(todo);
        return acc;
      }, {} as DatedTodoArray)
    );

    // Sort by comparing "Completed" with an empty string
    return Object.values(completionSortedTodos).sort((a, b) =>
      sortOptions.ascending
        ? a[0].localeCompare(b[0])
        : b[0].localeCompare(a[0])
    );
  } else if (sortOptions.filterBy === "alphabetically") {
    // Split todos into letters tuples [A, todos]
    const alphabeticallySortedTodos = Object.entries(
      todos.reduce((acc, todo) => {
        const letter = todo.title.charAt(0).toUpperCase();
        if (!acc[letter]) {
          acc[letter] = [];
        }
        acc[letter].push(todo);
        return acc;
      }, {} as DatedTodoArray)
    );
    // Sort by comparing the characters
    return Object.values(alphabeticallySortedTodos).sort((a, b) =>
      sortOptions.ascending
        ? b[0].localeCompare(a[0])
        : a[0].localeCompare(b[0])
    );
  } else {
    return Object.entries(
      todos.reduce((acc, todo) => {
        const formattedDate = dayjs(todo.date).format("dddd");

        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(todo);
        return acc;
      }, {} as DatedTodoArray)
    );
  }
};

const TodosList = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const sortOptions = useSelector((state: RootState) => state.filter);

  return (
    <div className="w-1/3 relative space-y-2">
      <Filter />
      {sort(todos, sortOptions).map(([title, todos], index) => (
        <Fragment key={index + title}>
          {sortOptions.showDates && (
            <h2 className="sticky top-0 left-0 p2-4 px-3 bg-white text-gray-500">
              {title}
            </h2>
          )}
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default TodosList;
