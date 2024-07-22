/* eslint-disable consistent-return */

const pkmnNbFromGen = (gen) => {
  switch (gen) {
    case 1:
      return [1, 151];
    case 2:
      return [152, 251];
    case 3:
      return [252, 386];
    case 4:
      return [387, 493];
    case 0:
      return [1, 493];
    default:
      break;
  }
};

const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const getTenDifferentNumber = (min, max) => {
  const nbList = [];
  while (nbList.length < 10) {
    const number = getRandomNumber(min, max);
    const different = nbList.find((n) => n === number);
    if (!different) {
      nbList.push(number);
    }
  }
  return nbList;
};

export { pkmnNbFromGen, getRandomNumber, getTenDifferentNumber };
