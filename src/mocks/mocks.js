export const organizationInputs = [
  {
    label: 'Полное наименование испытательной лаборатории',
    type: 'text',
    id: 'centerName',
    name: 'centerName',
    placeholder: 'ВНИИГАЗ',
  },
  {
    label: 'Сокращенное наименование испытательной лаборатории',
    type: 'text',
    id: 'shortCenterName',
    name: 'shortCenterName',
    placeholder: 'Некоммерческая организация учреждение ВНИИГАЗ',
  },
  {
    label: 'Адрес электронной почты',
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'info@test.ru',
  },
  {
    label: 'Телефон',
    type: 'phone',
    id: 'phone',
    name: 'phone',
    placeholder: '+7(495)123-45-67',
  },
  {
    label: 'Сайт',
    type: 'text',
    id: 'webPage',
    name: 'webPage',
    placeholder: 'test.ru',
  },
];

export const ceoInputs = [
  {
    label: 'Фамилия',
    type: 'text',
    id: 'surname',
    name: 'surname',
    placeholder: 'Иванов',
  },
  {
    label: 'Имя',
    type: 'text',
    id: 'firstName',
    name: 'firstName',
    placeholder: 'Иван',
  },
  {
    label: 'Отчество',
    type: 'text',
    id: 'patronym',
    name: 'patronym',
    placeholder: 'Иванович',
  },
];

export const addressInputs = [
  {
    label: 'Страна',
    type: 'text',
    id: 'country',
    name: 'country',
    placeholder: 'Россия',
  },
  {
    label: 'Почтовый индекс',
    type: 'text',
    id: 'zipCode',
    name: 'zipCode',
    placeholder: '123456',
  },
  {
    label: 'Регион/область',
    type: 'text',
    id: 'region',
    name: 'region',
    placeholder: 'Московская область',
  },
  {
    label: 'Город/район',
    type: 'text',
    id: 'district',
    name: 'district',
    placeholder: 'Ленинский район',
  },
  {
    label: 'Населенный пункт',
    type: 'text',
    id: 'location',
    name: 'location',
    placeholder: 'пос. Развилка',
  },
  {
    label: 'Улица',
    type: 'text',
    id: 'street',
    name: 'street',
    placeholder: 'Проектируемый проезд №666',
  },
  {
    label: 'Дом и офис',
    type: 'text',
    id: 'building',
    name: 'building',
    placeholder: 'вл. 15, стр. 1, ВНИИГАЗ',
  },
];

export const systemAssociationCheckboxes = [
  {
    label: 'ЦОС "Системы менеджмента"',
    type: 'checkbox',
    name: 'department',
    value: 'management',
  },
  {
    label: 'ЦОС "Инженерно-технические средства охраны, средства защиты и информации"',
    type: 'checkbox',
    name: 'department',
    value: 'security',
  },
  {
    label: 'ЦОС "Трубная продукция"',
    type: 'checkbox',
    name: 'department',
    value: 'tubes',
  },
  {
    label: 'ЦОС "Технологическое оборудование и материалы, энергетическое оборудование, приборы и средства автоматизации, вычислительная техника, программные средства"',
    type: 'checkbox',
    name: 'department',
    value: 'technologistEquipment',
  },
  {
    label: 'ЦОС "Производственная безопасность"',
    type: 'checkbox',
    name: 'department',
    value: 'industrialSafety',
  },
  {
    label: 'ЦОС "Оборудование и материалы для сварки, неразрушающего контроля сварных соединений и врезки под давлением"',
    type: 'checkbox',
    name: 'department',
    value: 'weldingEquipment',
  },
  {
    label: 'ЦОС "Запасные части и комплектующие для технического обслуживания и ремонта"',
    type: 'checkbox',
    name: 'department',
    value: 'serviceParts',
  },
  {
    label: 'ЦОС "Газ, конденсат, нефть, продукты их переработки"',
    type: 'checkbox',
    name: 'department',
    value: 'petroleum',
  },
];

export const systemIdentificationSubformInputs = [
  {
    label: 'Регистрационный номер свидетельства',
    type: 'text',
    id: 'certificateNumber',
    name: 'certificateNumber',
    placeholder: '',
  },
  {
    label: 'Дата выдачи свидетельства',
    type: 'text',
    id: 'certificateDate',
    name: 'certificateDate',
    placeholder: '',
  },
  {
    label: 'Действителен до',
    type: 'text',
    id: 'certificateValidity',
    name: 'certificateValidity',
    placeholder: '',
  },
  {
    label: 'Область деятельности (ОК 034-2014)',
    type: 'text',
    id: 'activityField',
    name: 'activityField',
    placeholder: '',
  },
];
