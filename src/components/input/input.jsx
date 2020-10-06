import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      label,
      type,
      id,
      name,
      placeholder,
      onChange,
      errors
    } = this.props;

    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          style={errors[id] ? {borderColor: 'red'} : null}/>
        <span style={{color: 'red'}}>{errors[id]}</span>
      </>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.object
};

export default Input;
