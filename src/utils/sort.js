export const sortByString = (arr, property) => {
  return [...arr].sort((a, b) => {
    return a[property].localeCompare(b[property]);
  });
};

export const sortByNumber = (arr, property) => {
  return [...arr].sort((a, b) => {
    return Number(a[property]) - Number(b[property]);
  });
};

export const sortByDate = (arr, property) => {
  return [...arr].sort((a, b) => {
    return new Date(a[property]) - new Date(b[property]);
  });
};
