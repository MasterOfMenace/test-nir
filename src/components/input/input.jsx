/* eslint-disable quotes */
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

export default Input;
