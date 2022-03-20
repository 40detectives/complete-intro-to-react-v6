import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await response.json();
    this.setState({
      loading: false,
      ...json.pets[0], // the rest of the parameters from the API
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h1>{`${animal} - ${breed} - ${city},  ${state}`}</h1>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
