import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

import '../assets/css/fuck-webpack.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/fontawesome-all.min.css'
import '../assets/less/main.less';

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;