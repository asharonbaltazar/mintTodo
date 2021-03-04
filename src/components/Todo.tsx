import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Duplicate, Delete } from "./icons/Icons";
import { useAppDispatch } from "../store";
import { deleteTodo, toggleTodoCompletion } from "../slices/todos";
import dayjs from "dayjs";

interface IProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  };
}

const Todo = ({ todo }: IProps) => {
  const { id, title, completed, date } = todo;
  const dispatch = useAppDispatch();
  const toggleCheckbox = () => {
    dispatch(toggleTodoCompletion(id));
  };

  const contextMenu = [
    {
      title: "Copy todo",
      className: "text-gray-700 hover:text-gray-800",
      icon: <Duplicate className="h-5 w-5" />,
      onClickFunction: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(title);
        }
      },
    },
    {
      title: "Delete",
      className: "text-red-600",
      icon: <Delete className="h-5 w-5" />,
      onClickFunction: () => dispatch(deleteTodo(id)),
    },
  ];

  const titleStyle = `font-medium ${
    completed ? "line-through text-gray-500" : "text-blue-500"
  }`;

  return (
    <>
      <ContextMenuTrigger id={todo.id} holdToDisplay={500}>
        <div className="w-full p-4 flex items-center justify-between bg-white rounded-lg shadow">
          <div>
            <span className="text-sm text-gray-500 cursor-default">
              <abbr
                className="no-underline"
                title={dayjs(date).format("dddd, MMMM D, YYYY h:mm A")}
              >
                {dayjs(date).format("hh:mm a")}
              </abbr>
            </span>

            <div className="flex items-center space-x-2">
              <input
                onClick={() => toggleCheckbox()}
                type="checkbox"
                defaultChecked={completed}
              />
              <h3 className={titleStyle}>{title}</h3>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenu
        className="p-3 space-y-3 border-2 border-gray-400 text-sm bg-white z-20 rounded-lg shadow-lg"
        id={todo.id}
      >
        {contextMenu.map((menuItem) => (
          <MenuItem key={menuItem.title}>
            <button
              className={`${menuItem.className} w-full space-x-2 flex items-center  font-medium`}
              onClick={menuItem.onClickFunction}
            >
              {menuItem.icon}
              <span>{menuItem.title}</span>
            </button>
          </MenuItem>
        ))}
      </ContextMenu>
    </>
  );
};

export default Todo;
