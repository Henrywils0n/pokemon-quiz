import PropTypes from 'prop-types';

import './style.scss';

function Wrapper({ children }) {
  return (
    <div className="Wrapper">
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  
};

export default Wrapper;
