import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper'
import RecentBlocksConnector from '../../redux/connectors/RecentBlocksConnector'

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/" component={RecentBlocksConnector} />
    </div>
  </div>
)

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
)

export default Router
