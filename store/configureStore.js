import { createStore } from 'redux';
import myReducer from '../reducer/reducer'


const configureStore = () => {
  return createStore(myReducer);
}
export default configureStore;