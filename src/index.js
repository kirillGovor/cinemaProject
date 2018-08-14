import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import loginReducer from "./components/authorisation/reducers/login-reducer";
import registryReducer from "./components/authorisation/reducers/registry-reducer";
import headerReducer from "./components/mainLayout/reducers/header-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login: loginReducer,
  user: registryReducer,
  movie: headerReducer
});
function actionCreator(data) {
  return (dispatch) => {
    dispatch({type : 'REQUEST_STARTED'});
    
    axios.post('/post', { data })
      .then(response => dispatch({type : 'REQUEST_SUCCEEDED', payload : response})
      .catch(error => dispatch({type : 'REQUEST_FAILED', error : error})    
    };
}
const store = createStore(rootReducer, {});
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
