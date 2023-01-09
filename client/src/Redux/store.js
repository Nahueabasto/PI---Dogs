import { createStore, applyMiddleware } from "redux";//importo createStore y applyMiddleware
import reducer from "./dogsReducer"; //me traigo el reducer
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))); //aca le paso todo


export default store;
