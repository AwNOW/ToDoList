import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/index";
import "./index.css";
import App from "./App";
import {saveToLocalStorage, loadFromLocalStorage} from "./localStore/localStore"

function Root() {

  const store = configureStore(loadFromLocalStorage());

  useEffect(() => {
    store.subscribe(() => {
      saveToLocalStorage(store.getState())
    })
  },[])

  if (process.env.NODE_ENV !== "production") {
    (window as any).store = store;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root-all-elements")
);
