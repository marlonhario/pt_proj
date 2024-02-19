export let sortCards = (data, key) => {
  return data
    .slice()
    .sort(
      (a, b) =>
        (a[key] != null ? a[key] : Infinity) -
        (b[key] != null ? b[key] : Infinity)
    );
};
