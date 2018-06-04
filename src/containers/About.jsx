import React from 'react';

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
  <div>
    <h2>About Page</h2>
    <ItemLister />
  </div>
);

export default About;
