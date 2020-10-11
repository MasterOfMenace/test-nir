import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input.jsx';

class SystemIdentificationForm extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSystemIdentificationForm() {
    const {department, checkboxes, onChange, errors} = this.props;

    return (
      <>
        <h2 className='form__title'>Центральный орган системы, выдавший свидетельство испытательной лаборатории</h2>
        {checkboxes.map((checkbox, i) => (
          <div key={`checkbox-${i}`}>
            <label className='form__checkbox-label' style={!errors[checkbox.value] ? null : {color: 'red'}}>
              <input
                name={checkbox.name}
                type={checkbox.type}
                id={checkbox.id}
                value={checkbox.value}
                onChange={onChange}
              />
              {checkbox.label}
            </label>
            {department[checkbox.value] ? this.renderSystemIdentificationSubForm(checkbox.value) : null}
          </div>
        ))}
      </>
    );
  }

  renderSystemIdentificationSubForm(departmentName) {
    const {inputs, onLicenseChange, errors, onAddButtonClickHandler, fields, onDeleteButtonClickHandler, onActivityChange} = this.props;

    const licenses = fields[`${departmentName}-activityField`] ? Array.from(fields[`${departmentName}-activityField`]) : [];

    return (
      <div className={'form__subform'}>
        {inputs.map((input) => (
          <Input
            key={`${departmentName}-${input.id}-key`}
            label={input.label}
            type={input.type}
            id={`${departmentName}-${input.id}`}
            name={`${departmentName}-${input.name}`}
            className={input.name === 'activityField' ? 'form__input form__input--activity' : 'form__input'}
            placeholder={input.placeholder}
            onChange={input.name === 'activityField' ? onActivityChange : onLicenseChange}
            errors={errors}
            button={input.name === 'activityField' ? 'Добавить' : null}
            onButtonClick={input.name === 'activityField' ? onAddButtonClickHandler(departmentName) : null}
          />
        ))}
        <div className={'form__license-wrapper'}>
          {licenses.map((license, i) => (
            <div
              key={i}
              className={'form__license'}>
              {license}
              <button type='button' className={'form__delete-button'} onClick={onDeleteButtonClickHandler(departmentName, license)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderSystemIdentificationForm()}
      </>
    );
  }
}

SystemIdentificationForm.propTypes = {
  department: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  checkboxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLicenseChange: PropTypes.func.isRequired,
  onActivityChange: PropTypes.func.isRequired,
  onAddButtonClickHandler: PropTypes.func.isRequired,
  onDeleteButtonClickHandler: PropTypes.func.isRequired
};

export default SystemIdentificationForm;
