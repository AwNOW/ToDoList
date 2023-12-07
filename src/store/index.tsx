import { combineReducers, applyMiddleware, compose, Store, StoreEnhancer } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./tasks";
import listsReducer from "./lists";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const rootReducer = combineReducers({
  lists: listsReducer,
  tasks: tasksReducer,
});

let enhancer: StoreEnhancer;

if (process.env.NODE_ENV !== "production") {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    (window as any)._EDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // Include thunk in applyMiddleware
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
} else {
  // Apply thunk middleware in production
  enhancer = applyMiddleware(thunk);
}

const configureStore = (preloadedState?: any): Store => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

export type StoreState = ReturnType<typeof rootReducer>

export const useAppSelector = useSelector as TypedUseSelectorHook<StoreState>
