import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input.jsx';
import {systemAssociationCheckboxes as checkboxes, systemIdentificationSubformInputs as inputs} from '../../mocks/mocks.js';

class SystemIdentificationForm extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSystemIdentificationForm() {
    const {department, onChange} = this.props;

    return (
      <>
        <h2>Центральный орган системы, выдавший свидетельство испытательной лаборатории</h2>
        {checkboxes.map((checkbox, i) => (
          <div key={`checkbox-${i}`}>
            <label>
              <input
                name={checkbox.name}
                type={checkbox.type}
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
    const {onLicenseChange, errors, onAddButtonClickHandler, department, onDeleteButtonClickHandler} = this.props;

    const licenses = department[`${departmentName}-activityField`] ? Array.from(department[`${departmentName}-activityField`]) : [];
    console.log(licenses);

    return (
      <div>
        {inputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={onLicenseChange(departmentName)}
            errors={errors}
          />
        ))}
        <button type='button' onClick={onAddButtonClickHandler(departmentName)}>Добавить</button>
        <div>
          {licenses.map((license, i) => (
            <div key={i}>
              {license}
              <button type='button' onClick={onDeleteButtonClickHandler(departmentName, license)}>Delete</button>
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
  department: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onLicenseChange: PropTypes.func,
  onAddButtonClickHandler: PropTypes.func,
  onDeleteButtonClickHandler: PropTypes.func
};

export default SystemIdentificationForm;
