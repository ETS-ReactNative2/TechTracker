import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import myReducer from '../reducer/reducer'


const configureStore = () => {
  return createStore(myReducer);
}
export default configureStore;