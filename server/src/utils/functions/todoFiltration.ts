import { ToDo } from '../../interfaces/ToDo.interface';

export const filterToDosByTitle = (todos: ToDo[], searchTitle: string) =>
  todos.filter(({ title }) =>
    title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())
  );
