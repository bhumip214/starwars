export function abbreviateGenders(genders) {
  return genders.reduce(
    (acc, gender) => {
      if (acc[gender]) {
        return acc;
      }
      acc[gender] = gender.substring(0, 1).toUpperCase();
      return acc;
    },
    {
      "n/a": "NA",
      none: "-"
    }
  );
}
