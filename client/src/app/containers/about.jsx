import React from 'react';
import { Layout } from '../components/layout';
import { Alert } from 'reactstrap';

class ItemLister extends React.Component {
  constructor() {
    super();
    this.state = { body: {} };
  }
  componentDidMount() {
    fetch(`/api/v1/test`)
      .then(result => result.json())
      .then(body => this.setState({ body }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.body.message}
      </div>
    )
  }
}

const About = () => (
  <Layout>
    <h2>About</h2>
    <Alert color="primary">
      <ItemLister />
    </Alert>
  </Layout>
);

export default About;
