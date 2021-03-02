import { createSlice } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import dayjs from "dayjs";

interface InitialState {
  todos: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
  }[];
}

const initialState = {
  todos: [
    {
      id: uuid.generate(),
      title: "Write a todo",
      completed: false,
      date: dayjs().toISOString(),
    },
    {
      id: uuid.generate(),
      title: "Lorem ipsum blah blah blah",
      completed: false,
      date: dayjs().toISOString(),
    },
    {
      id: uuid.generate(),
      title: "This is an example",
      completed: false,
      date: dayjs().toISOString(),
    },
    {
      id: uuid.generate(),
      title: "You've reached the end",
      completed: false,
      date: dayjs().toISOString(),
    },
  ],
} as InitialState;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todoItem = {
        id: uuid.generate(),
        title: action.payload,
        completed: false,
        date: dayjs().toISOString(),
      };

      state.todos.unshift(todoItem);
    },
    toggleTodoCompletion: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const { addTodo, toggleTodoCompletion } = todosSlice.actions;
export default todosSlice.reducer;
