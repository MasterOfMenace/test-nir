import React from 'react';
import PropTypes from 'prop-types';
// import {Formik, Form, Field} from 'formik';

class MyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      association: false,
      department: '',
    }

    this.onInputChange = this.onInputChange.bind(this);
  }

  renderAssociationField() {
      return (
        <div>
          <h2>Центральный орган системы, выдавший свидетельство испытательной лаборатории</h2>

          <label>
            <input name='department' type='checkbox' value='management' onChange={this.onInputChange}/>
            ЦОС "Системы менеджмента"
          </label>
          <label>
            <input name='department' type='checkbox' value='security' />
            ЦОС "Инженерно-технические средства охраны, средства защиты и информации"
          </label>
          <label>
            <input name='department' type='checkbox' value='tubes' />
            ЦОС "Трубная продукция"
          </label>
          <label>
            <input name='department' type='checkbox' value='technologist equipment' />
            ЦОС "Технологическое оборудование и материалы, энергетическое оборудование, приборы и средства автоматизации, вычислительная техника, программные средства"
          </label>
          <label>
            <input name='department' type='checkbox' value='industrial safety' />
            ЦОС "Производственная безопасность"
          </label>
          <label>
            <input name='department' type='checkbox' value='welding equipment' />
            ЦОС "Оборудование и материалы для сварки, неразрушающего контроля сварных соединений и врезки под давлением"
          </label>
          <label>
            <input name='department' type='checkbox' value='service parts' />
            ЦОС "Запасные части и комплектующие для технического обслуживания и ремонта"
          </label>
          <label>
            <input name='department' type='checkbox' value='gas-petroleum' />
            ЦОС "Газ, конденсат, нефть, продукты их переработки"
          </label>
        </div>
      )
  }

  onInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    console.log(target, name, value);

    this.setState({
      [name]: value
    });

    console.log(this.state);
  }

  render() {
    return (
      <form>
          <label htmlFor="centerName">Полное наименование испытательной лаборатории</label>
          <input type='text' id='centerName' name='centerName' placeholder='ВНИИТОРМОЗ' onChange={this.onInputChange}/>
          <label htmlFor="shortCenterName">Полное наименование испытательной лаборатории</label>
          <input type='text' id='shortCenterName' name='shortCenterName' placeholder='Некоммерческая организация учреждение ВНИИТОРМОЗ' onChange={this.onInputChange}/>
          <label htmlFor="email">Адрес электронной почты</label>
          <input type='text' id='email' name='email' placeholder='info@test.ru' onChange={this.onInputChange}/>
          <label htmlFor="phone">Телефон</label>
          <input type='text' id='phone' name='phone' placeholder='+7(495)123-45-67' onChange={this.onInputChange}/>
          <label htmlFor="webPage">Сайт</label>
          <input type='text' id='webPage' name='webPage' placeholder='test.ru' onChange={this.onInputChange}/>

          <h2>Руководитель</h2>
          <label htmlFor="surname">Фамилия</label>
          <input type='text' id='surname' name='surname' placeholder='Иванов' onChange={this.onInputChange}/>
          <label htmlFor="firstName">Имя</label>
          <input type='text' id='firstName' name='firstName' placeholder='Иван' onChange={this.onInputChange}/>
          <label htmlFor="patronym">Отчество</label>
          <input type='text' id='patronym' name='patronym' placeholder='Иванович' onChange={this.onInputChange}/>

          <h2>Фактический адрес</h2>
          <label htmlFor="country">Страна</label>
          <input type='text' id='country' name='country' placeholder='Россия' onChange={this.onInputChange}/>
          <label htmlFor="zipCode">Почтовый индекс</label>
          <input type='text' id='zipCode' name='zipCode' placeholder='123456' onChange={this.onInputChange}/>
          <label htmlFor="region">Регион/область</label>
          <input type='text' id='region' name='region' placeholder='Московская область' onChange={this.onInputChange}/>
          <label htmlFor="district">Город/район</label>
          <input type='text' id='district' name='district' placeholder='Ленинский район' onChange={this.onInputChange}/>
          <label htmlFor="location">Населенный пункт</label>
          <input type='text' id='location' name='location' placeholder='пос. Развилка' onChange={this.onInputChange}/>
          <label htmlFor="street">Улица</label>
          <input type='text' id='street' name='street' placeholder='Проектируемый проезд №666' onChange={this.onInputChange}/>
          <label htmlFor="building">Дом и офис</label>
          <input type='text' id='building' name='building' placeholder='вл. 15, стр. 1, ВНИИТОРМОЗ' onChange={this.onInputChange}/>

          <h2>Признание в системе</h2>
          <div>
            <label>
              <input type='radio' name='association' value={true}
              onChange={this.onInputChange}/>
              Да
            </label>
            <label>
              <input type='radio' name='association'
              value={false} onChange={this.onInputChange}/>
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
