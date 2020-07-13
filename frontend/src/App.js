import React from 'react'
import styled from 'styled-components/macro'
import { Provider } from 'react-redux'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { user } from './reducers/user'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const savetoLocal = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('finalProjectState', serializedState)
  } catch (err) {
    throw new Error('Kan inte spara till local storage.')
  }
}

const loadFromLocal = () => {
  try {
    const serializedState = localStorage.getItem('finalProjectState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    throw new Error('Kan inte ladda från local storage.')
  }
}

const reducer = combineReducers({
  user: user.reducer
})

const persistedState = loadFromLocal()
const store = createStore(
  reducer,
  persistedState,
  enhancer(applyMiddleware(thunk))
)
store.subscribe(() => savetoLocal(store.getState()))

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={LandingPage} exact />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
