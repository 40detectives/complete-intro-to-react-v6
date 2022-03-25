import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Should log to Sentry, Azure Monitor, New Relic, TrackJS,...
    console.error("ErrorBoundary caught:\n", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          Details page not found. <Link to="/">Return to home page</Link>
        </h2>
      );
    }
    return this.props.children; // if no error render whatever pass on and render whatever the children are
  }
}

export default ErrorBoundary;
