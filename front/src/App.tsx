import { Provider } from 'react-redux';
import './App.css';
import { store } from './store/store';
import Todos from './Todos/Todos';

function App() {
  return (
    <>
      <Provider store={store}>
        <Todos />
      </Provider>
    </>
  );
}

export default App;
