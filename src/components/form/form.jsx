import React from 'react';
import Input from '../input/input.jsx';
import SystemIdentificationForm from '../system-identification/system-identification.jsx';
import {organizationInputs, ceoInputs, addressInputs} from '../../mocks/mocks.js';

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
      const field = document.getElementById('activityField');
      const name = `${departmentName}-${field.name}`;
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

  onLicenseInputChangeHandler(departmentName) {
    return (evt) => {
      const target = evt.target;
      const value = target.value;
      const name = `${departmentName}-${target.name}`;

      if (target.name === 'activityField') {
        return;
      } else {
        const department = {...this.state.department, [name]: value};

        this.setState({
          department
        });
      }
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

      this.setState({
        department
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

  validateForm() {
    const fields = this.state.fields;
    const keys = Object.keys(fields);
    const isFormValid = keys
      .map((key) => this.validateField(key, fields[key]))
      .every((elem) => elem === true);

    return isFormValid;
  }

  validateField(name, value) {
    if (!value) {
      this.setState(
          ({errors}) => ({
            errors: {
              ...errors,
              [name]: 'поле не должно быть пустым',
            },
          }),
      );
      return false;
    } else {
      return true;
    }
  }

  submitHandler(evt) {
    evt.preventDefault();

    if (this.validateForm()) {
      console.log(JSON.stringify(this.state));
    } else {
      console.log('form is invalid');
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {organizationInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}
        <h2>Руководитель</h2>
        {ceoInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}

        <h2>Фактический адрес</h2>
        {addressInputs.map((input) => (
          <Input
            key={`${input.id}-key`}
            label={input.label}
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={this.onInputChangeHandler}
            errors={this.state.errors} />
        ))}

        <h2>Признание в системе</h2>
        <div>
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
              onChange={this.onInputChangeHandler}
              onLicenseChange={this.onLicenseInputChangeHandler}
              errors={this.state.errors}
              onAddButtonClickHandler={this.onLicenseAddButtonClickHandler}
              onDeleteButtonClickHandler={this.onLicenseDeleteButtonClickHandler}/> : null}
        </div>

        <button type="submit">Далее</button>
      </form>
    );
  }
}

export default MyForm;
