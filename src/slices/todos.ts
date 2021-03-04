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
  filter: {
    filterBy: "creation" | "completion" | "alphabetical";
    ascending: boolean;
    showTitles: boolean;
  };
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
      date: dayjs().subtract(1, "day").toISOString(),
    },
    {
      id: uuid.generate(),
      title: "This is an example",
      completed: false,
      date: dayjs().subtract(2, "day").toISOString(),
    },
    {
      id: uuid.generate(),
      title: "You've reached the end",
      completed: false,
      date: dayjs().subtract(3, "day").toISOString(),
    },
  ],
  filter: {
    filterBy: "creation",
    ascending: false,
    showTitles: true,
  },
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
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompletion: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    toggleSortSettings: (state, action) => {
      if (action.payload === state.filter.filterBy) {
        state.filter.ascending = !state.filter.ascending;
      } else {
        state.filter.ascending = false;
      }
      state.filter.filterBy = action.payload;
    },
    toggleShowDates: (state) => {
      state.filter.showTitles = !state.filter.showTitles;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodoCompletion,
  toggleSortSettings,
  toggleShowDates,
} = todosSlice.actions;
export default todosSlice.reducer;
