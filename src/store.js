import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage:storage ,
  stateReconciler: autoMergeLevel2 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export const persistor = persistStore(store)
