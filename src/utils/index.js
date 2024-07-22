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
    case 5:
      return [494, 649];
    case 6:
      return [650, 721];
    case 7:
      return [722, 809];
    case 8:
      return [810, 905];
    case 9:
      return [906, 1010];
    case 0:
      return [1, 1010];
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
