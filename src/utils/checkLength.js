const checkLength = (arr) => {
  let count = 0;
  arr.forEach((element) => {
    count++;
  });
  return count;
};

export default checkLength;
