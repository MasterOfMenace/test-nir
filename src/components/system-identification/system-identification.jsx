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

  renderSystemIdentificationSubForm(department) {
    const {onLicenseChange, errors} = this.props;

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
            onChange={onLicenseChange(department)}
            errors={errors}
          />
        ))}
        <button type='button'>Добавить</button>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderSystemIdentificationForm()}
      </>
    );
  }
}

export default SystemIdentificationForm;
