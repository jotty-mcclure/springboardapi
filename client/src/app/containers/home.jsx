import React from 'react';
import { Layout } from '../components/layout';
import { LoginForm } from '../components/login';

const Home = () => (
  <Layout>
    <h2>Home</h2>
    <LoginForm />
  </Layout>
);

export default Home;