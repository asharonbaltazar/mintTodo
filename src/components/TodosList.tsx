import { useSelector } from "react-redux";
import { RootState } from "../store";
import Filter from "./Filter";
import dayjs from "dayjs";
import { Todos, SortOptions } from "../types";
import TodoGroup from "./TodoGroup";

type SortReturn = [
  string,
  {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[]
][];
interface DatedTodoArray {
  [title: string]: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[];
}

const sortMap = {
  creation: (todos: Todos, ascending: boolean): SortReturn => {
    // Split todos into date tuples [date, todos]
    const creationDateSortedTodos = Object.entries(
      todos.reduce((acc, todo) => {
        const date = dayjs(todo.date).format("M/D/YYYY");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(todo);
        return acc;
      }, {} as DatedTodoArray)
    );
    // First sort by JS dates and then map through keys to rename the dates to something more human
    return Object.values(creationDateSortedTodos)
      .sort((a, b) =>
        ascending
          ? Number(new Date(b[0])) - Number(new Date(a[0]))
          : Number(new Date(a[0])) - Number(new Date(b[0]))
      )
      .map(([date, todos]) => [dayjs(date).format("dddd"), todos]);
  },
  completion: (todos: Todos, ascending: boolean): SortReturn => {
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
      ascending ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])
    );
  },
  alphabetical: (todos: Todos, ascending: boolean): SortReturn => {
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
      ascending ? b[0].localeCompare(a[0]) : a[0].localeCompare(b[0])
    );
  },
};

const sort = (
  todos: Todos,
  sortOptions: SortOptions
): [
  string,
  {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[]
][] => {
  return sortMap[sortOptions.filterBy](todos, sortOptions.ascending);
};

const TodosList = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const sortOptions = useSelector((state: RootState) => state.filter);

  return (
    <div className="w-1/3 relative space-y-2">
      <Filter />
      {sort(todos, sortOptions).map(([title, todos], index) => (
        <TodoGroup key={title + index} title={title} todos={todos} />
      ))}
    </div>
  );
};

export default TodosList;
