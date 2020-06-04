import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import CreateElement from './pages/CreatePoint';

const routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/'  exact/>
            <Route component={CreateElement} path='/dashboard' />
        </BrowserRouter>
    );
}

export default routes;
