import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './components/navigation/sidebar';
import Topbar from './components/navigation/topbar';

import '../assets/css/fuck-webpack.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/fontawesome-all.min.css'
import '../assets/less/main.less';

const App = () => (
  <BrowserRouter>
    <main id="wrapper">
      <Sidebar />
      <div id="page-wrapper" className="">
        <Topbar />

        <div id="content-wrapper">
          <Routes />
        </div>
      </div>
    </main>
  </BrowserRouter>
);

export default App;