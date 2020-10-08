import React from 'react';
import Input from '../input/input.jsx';
import SystemIdentificationForm from '../system-identification/system-identification.jsx';
import {organizationInputs, ceoInputs, addressInputs, systemAssociationCheckboxes as systemCheckboxes, systemIdentificationSubformInputs as systemInputs} from '../../mocks/mocks.js';
import {validateField, validateActivityField} from '../validation/validation.js';
class MyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        centerName: '',
        shortCenterName: '',
        email: '',
        phone: '',
        webPage: '',
        surname: '',
        firstName: '',
        patronym: '',
        country: '',
        zipCode: '',
        region: '',
        district: '',
        location: '',
        street: '',
        building: '',
      },
      association: false,
      department: {
        management: false,
        security: false,
      },
      errors: {},
    };

    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.onLicenseInputChangeHandler = this.onLicenseInputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onLicenseAddButtonClickHandler = this.onLicenseAddButtonClickHandler.bind(this);
    this.onLicenseDeleteButtonClickHandler = this.onLicenseDeleteButtonClickHandler.bind(this);
    this.onActivityFieldInputChangeHandler = this.onActivityFieldInputChangeHandler.bind(this);
  }

  onLicenseDeleteButtonClickHandler(departmentName, license) {
    return () => {
      const activityField = new Set(this.state.department[`${departmentName}-activityField`]);
      activityField.delete(license);
      const newActivityField = Array.from(activityField);

      const department = {...this.state.department, [`${departmentName}-activityField`]: newActivityField
      };

      this.setState({
        department
      });
    };
  }

  onLicenseAddButtonClickHandler(departmentName) {
    return () => {
      const field = document.getElementById(`${departmentName}-activityField`);
      const name = field.name;
      const value = field.value;
      const activityField = this.state.department[name] ? [...this.state.department[name]] : [];
      activityField.push(value);
      const newActivityField = Array.from(new Set(activityField));
      const department = {...this.state.department, [name]: newActivityField
      };

      this.setState({
        department
      });

      field.value = '';
    };
  }

  onLicenseInputChangeHandler() {
    return (evt) => {
      const target = evt.target;
      const value = target.value;
      const name = target.name;

      this.setState(
          ({errors}) => ({
            errors: {
              ...errors,
              [name]: '',
            },
          }),
      );

      const department = {...this.state.department, [name]: value};

      this.setState({
        department
      });
    };
  }

  onActivityFieldInputChangeHandler() {
    return (evt) => {
      const target = evt.target;
      const value = target.value;
      const name = target.name;
      const newErrors = {};

      this.setState(
          ({errors}) => ({
            errors: {
              ...errors,
              [name]: '',
            }
          })
      );
      validateActivityField(name, value, newErrors);

      this.setState(
          ({errors}) => ({
            errors: {
              ...errors,
              ...newErrors,
            }
          })
      );
    };
  }

  onInputChangeHandler(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    const checked = target.checked;

    this.setState(
        ({errors}) => ({
          errors: {
            ...errors,
            [name]: '',
          },
        }),
    );

    if (target.name === 'department') {
      const department = {...this.state.department, [value]: checked};
      const checkboxes = systemCheckboxes.map((it) => it.value);
      const newErrors = {};
      checkboxes.forEach((it) => {
        newErrors[it] = '';
      });

      this.setState({
        department,
        errors: {
          ...this.state.errors,
          ...newErrors
        }
      });
    } else if (name === 'association') {
      this.setState({
        [name]: value
      });
    } else {
      const fields = {...this.state.fields, [name]: value};

      this.setState({
        fields
      });
    }
  }

  showFirstInvalidField(errors) {
    const elementId = Object.keys(errors)[0];
    const element = document.getElementById(elementId);
    element.scrollIntoView();
  }

  validateForm() {
    const newErrors = {};
    let validity = [];
    // inputs

    const fields = this.state.fields;
    const keys = Object.keys(fields);
    validity = validity.concat(keys.map((key) => validateField(key, fields[key], newErrors)));

    // checkboxes
    const association = this.state.association;

    if (association === 'true') {
      const department = this.state.department;
      const checkboxes = systemCheckboxes.map((checkbox) => checkbox.value);
      const isChecked = Object.values(department).some((el) => el === true);
      if (!isChecked) {
        validity = validity.concat(checkboxes.map((key) => validateField(key, department[key], newErrors)));
      } else {
        // systeminputs
        const departmentValues = Object.values(department);
        const departmentKeys = Object.keys(department);
        const departmentIndex = departmentValues.findIndex((it) => it === true);
        const departmentName = departmentKeys[departmentIndex];
        const licenses = department[`${departmentName}-activityField`];
        console.log(licenses);
        const inputs = systemInputs.map((it) => `${departmentName}-${it.name}`);
        validity = validity.concat(inputs.map((it) => validateField(it, department[it], newErrors)));
        console.log(inputs, departmentName);
      }
    }

    this.setState({
      errors: newErrors,
    });
    const isFormValid = validity.every((elem) => elem === true);

    if (!isFormValid) {
      this.showFirstInvalidField(newErrors);
    }

    return isFormValid;
  }

  submitHandler(evt) {
    evt.preventDefault();
    const isFormValid = this.validateForm();

    if (isFormValid) {
      console.log(JSON.stringify(this.state));
    } else {
      console.log('form is invalid');
    }
  }

  render() {
    return (
      <form
        className='form'
        onSubmit={this.submitHandler}>
        {organizationInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            className={'form__input'}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}
        <h2 className='form__title'>Руководитель</h2>
        {ceoInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            className={'form__input'}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}

        <h2 className='form__title'>Фактический адрес</h2>
        {addressInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            className={'form__input'}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}

        <h2 className='form__title'>Признание в системе</h2>
        <div className='form__association'>
          <label>
            <input type='radio' name='association' value={true}
              onChange={this.onInputChangeHandler}/>
              Да
          </label>
          <label>
            <input type='radio' name='association'
              value={false}
              onChange={this.onInputChangeHandler}/>
              Нет
          </label>

          {this.state.association === 'true' ?
            <SystemIdentificationForm
              department={this.state.department}
              checkboxes={systemCheckboxes}
              inputs={systemInputs}
              onChange={this.onInputChangeHandler}
              onLicenseChange={this.onLicenseInputChangeHandler}
              onActivityChange={this.onActivityFieldInputChangeHandler}
              errors={this.state.errors}
              onAddButtonClickHandler={this.onLicenseAddButtonClickHandler}
              onDeleteButtonClickHandler={this.onLicenseDeleteButtonClickHandler}/> : null}
        </div>

        <button type="submit" className='submit-button'>Далее</button>
      </form>
    );
  }
}

export default MyForm;
