import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class ScrollToTop extends PureComponent<any> {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    children: PropTypes.element.isRequired,
  };

  componentDidUpdate(prevProps: any) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
