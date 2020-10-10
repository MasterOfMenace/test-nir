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
      association: 'no',
      department: {},
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
      const activityField = new Set(this.state.fields[`${departmentName}-activityField`]);
      activityField.delete(license);
      const newActivityField = Array.from(activityField);

      const fields = {...this.state.fields, [`${departmentName}-activityField`]: newActivityField
      };

      this.setState({
        fields
      });
    };
  }

  onLicenseAddButtonClickHandler(departmentName) {
    return () => {
      const field = document.getElementById(`${departmentName}-activityField`);
      const name = field.name;
      const value = field.value;
      const activityField = this.state.fields[name] ? [...this.state.fields[name]] : [];
      activityField.push(value);
      const newActivityField = Array.from(new Set(activityField));
      const fields = {...this.state.fields, [name]: newActivityField
      };

      this.setState({
        fields
      });

      field.value = '';
    };
  }

  onLicenseInputChangeHandler(evt) {
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

    const fields = {
      ...this.state.fields,
      [name]: value
    };

    this.setState({
      fields
    });
  }

  onActivityFieldInputChangeHandler(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.setState(
        ({errors}) => ({
          errors: {
            ...errors,
            [name]: '',
          }
        })
    );
    const newErrors = validateActivityField(name, value);

    this.setState(
        ({errors}) => ({
          errors: {
            ...errors,
            ...newErrors,
          }
        })
    );
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

    if (association === 'yes') {
      const department = this.state.department;
      const checkboxes = systemCheckboxes.map((checkbox) => checkbox.value);
      const isChecked = Object.values(department).some((el) => el === true);
      if (!isChecked) {
        validity = validity.concat(checkboxes.map((key) => validateField(key, department[key], newErrors)));
      } else {
        // systeminputs
        const departmentValues = Object.values(department);
        const departmentKeys = Object.keys(department);
        const departmentNames = [];

        departmentValues.forEach((it, index) => {
          if (it) {
            departmentNames.push(departmentKeys[index]);
          }
        });

        const inputs = departmentNames.reduce((acc, name) => {
          return acc.concat(systemInputs.map((it) => {
            const itemName = `${name}-${it.name}`;
            const item = fields[itemName];
            if (!item) {
              return itemName;
            } else if (Array.isArray(item)) {
              const returnValue = item.length === 0 ? itemName : '';
              return returnValue;
            }
            return '';
          }));
        }, []);

        validity = validity.concat(inputs.map((it) => validateField(it, department[it], newErrors)));
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
      console.log(JSON.stringify(this.state.fields));
    } else {
      console.log('form is invalid');
    }
  }

  render() {
    return (
      <form
        className='form'
        onSubmit={this.submitHandler}>
        <div className="form__subform">
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
        </div>
        <div className="form__subform">
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
        </div>
        <div className="form__subform">
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
        </div>


        <div className='form__subform'>
          <h2 className='form__title'>Признание в системе</h2>
          <label>
            <input
              type='radio'
              name='association'
              value={'yes'}
              onChange={this.onInputChangeHandler}/>
              Есть
          </label>
          <label>
            <input
              type='radio'
              name='association'
              value={'no'}
              checked={this.state.association === 'no'}
              onChange={this.onInputChangeHandler}/>
              Нет
          </label>
        </div>
        {this.state.association === 'yes' ?
          <div className="form__subform">
            <SystemIdentificationForm
              department={this.state.department}
              fields={this.state.fields}
              checkboxes={systemCheckboxes}
              inputs={systemInputs}
              onChange={this.onInputChangeHandler}
              onLicenseChange={this.onLicenseInputChangeHandler}
              onActivityChange={this.onActivityFieldInputChangeHandler}
              errors={this.state.errors}
              onAddButtonClickHandler={this.onLicenseAddButtonClickHandler}
              onDeleteButtonClickHandler={this.onLicenseDeleteButtonClickHandler}/>
          </div> : null}


        <button type="submit" className='submit-button'>Далее</button>
      </form>
    );
  }
}

export default MyForm;
