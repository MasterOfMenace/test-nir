import React from 'react';
import PropTypes from 'prop-types';

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
    }

    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  renderAssociationField() {
      return (
        <div>
          <h2>Центральный орган системы, выдавший свидетельство испытательной лаборатории</h2>

          <label>
            <input name='department' type='checkbox' value='management' onChange={this.onInputChangeHandler}/>
            ЦОС "Системы менеджмента"
          </label>
          {this.state.department.management ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='security' onChange={this.onInputChangeHandler}/>
            ЦОС "Инженерно-технические средства охраны, средства защиты и информации"
          </label>
          {this.state.department.security ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='tubes' onChange={this.onInputChangeHandler}/>
            ЦОС "Трубная продукция"
          </label>
          {this.state.department.tubes ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='technologistEquipment' onChange={this.onInputChangeHandler}/>
            ЦОС "Технологическое оборудование и материалы, энергетическое оборудование, приборы и средства автоматизации, вычислительная техника, программные средства"
          </label>
          {this.state.department.technologistEquipment ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='industrialSafety' onChange={this.onInputChangeHandler}/>
            ЦОС "Производственная безопасность"
          </label>
          {this.state.department.industrialSafety ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='weldingEquipment' onChange={this.onInputChangeHandler}/>
            ЦОС "Оборудование и материалы для сварки, неразрушающего контроля сварных соединений и врезки под давлением"
          </label>
          {this.state.department.weldingEquipment ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='serviceParts' onChange={this.onInputChangeHandler}/>
            ЦОС "Запасные части и комплектующие для технического обслуживания и ремонта"
          </label>
          {this.state.department.serviceParts ? this.renderAssociationSubField() : null}
          <label>
            <input name='department' type='checkbox' value='petroleum' onChange={this.onInputChangeHandler}/>
            ЦОС "Газ, конденсат, нефть, продукты их переработки"
          </label>
          {this.state.department.petroleum ? this.renderAssociationSubField() : null}
        </div>
      )
  }

  renderAssociationSubField() {
    return (
      <div>
        <label htmlFor="certificateNumber">Регистрационный номер свидетельства</label>
        <input type='text' id='certificateNumber' name='certificateNumber' onChange={this.onInputChangeHandler}/>
        <label htmlFor="certificateDate">Дата выдачи свидетельства</label>
        <input type='text' id='certificateDate' name='certificateDate' onChange={this.onInputChangeHandler}/>
        <label htmlFor="certificateValidity">Действителен до</label>
        <input type='text' id='certificateValidity' name='certificateValidity' onChange={this.onInputChangeHandler}/>
        <label htmlFor="activityField">Область деятельности (ОК 034-2014)</label>
        <input type='text' id='activityField' name='activityField' onChange={this.onInputChangeHandler}/>
        <button type="button">Добавить</button>
      </div>
    )
  }

  onInputChangeHandler(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    const checked = target.checked;

    if (target.type === 'checkbox') {
      const department = {...this.state.department, [value]: checked};

      this.setState({
        department: department
      });
    } else if (name === 'association'){
      this.setState({
        [name]: value
      })
    } else {
      const fields = {...this.state.fields, [name]: value};

      this.setState({
        fields: fields
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
    if(!value) {
      this.setState(
        ({ errors }) => ({
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
          <label htmlFor="centerName">Полное наименование испытательной лаборатории</label>
          <input type='text' id='centerName' name='centerName' placeholder='ВНИИТОРМОЗ' onChange={this.onInputChangeHandler}
          style={this.state.errors.centerName ? {borderColor: 'red'} : null}/>
          <label htmlFor="shortCenterName">Полное наименование испытательной лаборатории</label>
          <input type='text' id='shortCenterName' name='shortCenterName' placeholder='Некоммерческая организация учреждение ВНИИТОРМОЗ' onChange={this.onInputChangeHandler}/>
          <label htmlFor="email">Адрес электронной почты</label>
          <input type='text' id='email' name='email' placeholder='info@test.ru' onChange={this.onInputChangeHandler}/>
          <label htmlFor="phone">Телефон</label>
          <input type='text' id='phone' name='phone' placeholder='+7(495)123-45-67' onChange={this.onInputChangeHandler}/>
          <label htmlFor="webPage">Сайт</label>
          <input type='text' id='webPage' name='webPage' placeholder='test.ru' onChange={this.onInputChangeHandler}/>

          <h2>Руководитель</h2>
          <label htmlFor="surname">Фамилия</label>
          <input type='text' id='surname' name='surname' placeholder='Иванов' onChange={this.onInputChangeHandler}/>
          <label htmlFor="firstName">Имя</label>
          <input type='text' id='firstName' name='firstName' placeholder='Иван' onChange={this.onInputChangeHandler}/>
          <label htmlFor="patronym">Отчество</label>
          <input type='text' id='patronym' name='patronym' placeholder='Иванович' onChange={this.onInputChangeHandler}/>

          <h2>Фактический адрес</h2>
          <label htmlFor="country">Страна</label>
          <input type='text' id='country' name='country' placeholder='Россия' onChange={this.onInputChangeHandler}/>
          <label htmlFor="zipCode">Почтовый индекс</label>
          <input type='text' id='zipCode' name='zipCode' placeholder='123456' onChange={this.onInputChangeHandler}/>
          <label htmlFor="region">Регион/область</label>
          <input type='text' id='region' name='region' placeholder='Московская область' onChange={this.onInputChangeHandler}/>
          <label htmlFor="district">Город/район</label>
          <input type='text' id='district' name='district' placeholder='Ленинский район' onChange={this.onInputChangeHandler}/>
          <label htmlFor="location">Населенный пункт</label>
          <input type='text' id='location' name='location' placeholder='пос. Развилка' onChange={this.onInputChangeHandler}/>
          <label htmlFor="street">Улица</label>
          <input type='text' id='street' name='street' placeholder='Проектируемый проезд №666' onChange={this.onInputChangeHandler}/>
          <label htmlFor="building">Дом и офис</label>
          <input type='text' id='building' name='building' placeholder='вл. 15, стр. 1, ВНИИТОРМОЗ' onChange={this.onInputChangeHandler}/>

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

            {this.state.association === 'true' ? this.renderAssociationField() : null}
          </div>

          <button type="submit">Далее</button>
        </form>
    )
  }
}

export default MyForm;
