export const validateField = (name, value, errors) => {
  if (!value) {
    errors[name] = 'поле не должно быть пустым';
    return false;
  } else if (name === 'email') {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const validity = re.test(value);

    if (!validity) {
      errors[name] = 'Допускаются латинские буквы, цифры и символы (.@-)';
    }

    return validity;
  } else if (name === 'phone') {
    const re = /^((\+?7|8)[\-]?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/;
    const validity = re.test(value);

    if (!validity) {
      errors[name] = 'Формат номера телефона +х(ххх)ххх-хх-хх';
    }

    return validity;
  } else if (name === 'surname' || name === 'firstname' || name === 'patronym') {
    const re = /^[А-ЯЁ][а-яё]+$/;
    const validity = re.test(value);

    if (!validity) {
      errors[name] = 'Допускаются русские буквы';
    }

    return validity;
  }

  return true;
};

export const validateActivityField = (name, value) => {
  const errors = {};

  const re = /^\d+$/;
  const validity = re.test(value);

  if (!validity) {
    errors[name] = 'допускаются только цифры';
  }

  return errors;
};
