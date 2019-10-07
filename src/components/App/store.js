// @flow

import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { sidebarReducer, themeReducer, chainReducer } from '../../redux/reducers/index'

const reducer = combineReducers({
  chainInfo: chainReducer,
  theme: themeReducer,
  sidebar: sidebarReducer
})

const store = compose(applyMiddleware(thunk))(createStore)(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
