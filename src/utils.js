export const prepareData = (data, config) => {
  return Object.entries(data).reduce((result, [key, value]) => {
    const splittedKey = key.split('-');

    if (splittedKey.length === 1) {
      result[key] = value;

      return result;
    }

    if (!config[splittedKey[0]]) {
      return result;
    }

    if (!result[splittedKey[0]]) {
      result[splittedKey[0]] = {};
    }

    result[splittedKey[0]][splittedKey[1]] = value;

    return result;
  }, {});
};
