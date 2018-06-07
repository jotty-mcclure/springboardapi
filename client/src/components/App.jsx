import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './layout/Nav';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/less/main.less';

const App = () => (
  <BrowserRouter>
    <main id="wrapper">
      <Navigation />
      <div id="page-wrapper" className="">
        <Routes />
      </div>
    </main>
  </BrowserRouter>
);

export default App;