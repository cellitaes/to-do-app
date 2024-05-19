import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useToDo } from '../../shared/hooks/useToDo';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { DEBOUNCE_TIME } from '../../constants/constants';

const SearchToDo = () => {
  const [searchTitle, setSearchTitle] = useState('');

  const debouncedSearchTitle = useDebounce(searchTitle, DEBOUNCE_TIME);

  const { getTodos } = useToDo();

  useEffect(() => {
    if (debouncedSearchTitle !== undefined) {
      getTodos(debouncedSearchTitle);
    }
  }, [debouncedSearchTitle, getTodos]);

  const handleSearchTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setSearchTitle(value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      value={searchTitle}
      onChange={handleSearchTitleChange}
    />
  );
};

export default SearchToDo;
