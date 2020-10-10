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
      className,
      placeholder,
      onChange,
      errors
    } = this.props;

    return (
      <div className={'form__input-wrapper'}>
        <label className={'form__input-label'} htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          style={errors[id] ? {borderColor: 'red'} : null}/>
        <span className={'form__error-tooltip'}>{errors[id]}</span>
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default Input;
