import { Component, lazy } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Modal = lazy(() => import("./Modal"));

class Details extends Component {
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adoptIt = () => (window.location = "https://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    if (
      [animal, breed, city, state, description, name, images].every(
        (v) => v == undefined
      )
    ) {
      throw new Error("Details page not found");
    }

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city},  ${state}`}</h2>
          <ThemeContext.Consumer>
            {/* written as [theme] because we're destructuring the hook returned by this specific Context */}
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adoptIt}>Yup</button>
                  <button onClick={this.toggleModal}>Nope</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
