const checkLenght = (arr) => {
  let count = 0;
  arr.forEach((element) => {
    count++;
  });
  return count;
};

module.exports = checkLenght;
