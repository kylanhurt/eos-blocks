import React, { Component, Fragment } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../../scss/app.scss'
import Router from './Router'
import store from './store'
import ScrollToTop from './ScrollToTop'
import { ActivityIndicator } from '../common/ActivityIndicator'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      loaded: false,
    }
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ loading: false })
      setTimeout(() => this.setState({ loaded: true }), 500)
    })
  }

  render() {
    const { loaded, loading } = this.state
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Fragment>
              {!loaded
              && (
              <div className={`load${loading ? '' : ' loaded'}`}>
                <ActivityIndicator />
              </div>
              )
              }
              <div>
                <Router />
              </div>
            </Fragment>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
