// import { userInfo } from 'os';
import PropTypes from 'prop-types';

export default function Guest(props) {
  return (
    <>
      <li>
        Name: {props.name.first} {props.name.last}
      </li>
      <li>Email: {props.email}</li>
    </>
  );
}

Guest.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
  }),
};
