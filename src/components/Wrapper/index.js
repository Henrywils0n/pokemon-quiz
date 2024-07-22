import './style.scss';

// eslint-disable-next-line react/prop-types
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
