const formatUnit = (str: string) => {
  let index = str.indexOf("^");
  if (index !== -1) {
    let firstPart = str.slice(0, index);
    let secondPart = str.slice(index + 1, index + 2);
    let endPart = str.slice(index + 2);
    return `${firstPart}<sup>${secondPart}</sup> ${endPart}`;
  }
  return str;
};

export default formatUnit;
