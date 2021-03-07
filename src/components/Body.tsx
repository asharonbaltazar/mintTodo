import AddInput from "./AddInput";
import TodosList from "./TodosList";
import Menu from "./Menu";

const Body = () => {
  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-5">
      <AddInput />
      <div className="w-96">
        <Menu />
        <TodosList />
      </div>
    </div>
  );
};

export default Body;
