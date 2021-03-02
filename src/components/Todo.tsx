import { useAppDispatch } from "../store";
import { toggleTodoCompletion } from "../slices/todos";
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

  const titleStyle = `font-medium ${
    completed ? "line-through text-gray-500" : "text-blue-500"
  }`;

  return (
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
  );
};

export default Todo;
