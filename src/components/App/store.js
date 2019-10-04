import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { sidebarReducer, themeReducer, chainReducer } from '../../redux/reducers/index'

const reducer = combineReducers({
  chainInfo: chainReducer,
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
})

const store = compose(applyMiddleware(thunk))(createStore)(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
