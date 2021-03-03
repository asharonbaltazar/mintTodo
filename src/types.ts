export type Todos = {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}[];
export type SortOptions = {
  filterBy: "creation" | "completion" | "alphabetical";
  ascending: boolean;
  showDates: boolean;
};
