import AddInput from "./AddInput";
import TodosList from "./TodosList";

const Body = () => {
  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-5">
      <AddInput />
      <TodosList />
    </div>
  );
};

export default Body;
