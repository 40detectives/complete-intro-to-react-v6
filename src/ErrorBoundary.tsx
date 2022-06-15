import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

interface IStateType {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component {
  state: IStateType = { hasError: false, redirect: false };

  static getDerivedStateFromError(/* error */): IStateType {
    return { hasError: true } as IStateType;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Should log to Sentry, Azure Monitor, New Relic, TrackJS,...
    console.error("ErrorBoundary caught:\n", error, errorInfo);
    setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  /* 
  componentDidUpdate() {
    if (this.state.hasError) {
    }
  }
  */

  render(): ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          Details page not found. <Link to="/">Return to home page</Link> or
          wait 3 seconds.
        </h2>
      );
    }
    return this.props.children; // if no error render whatever pass on and render whatever the children are
  }
}

export default ErrorBoundary;
