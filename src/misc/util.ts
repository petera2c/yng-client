export const isNumeric = (str: string) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    // @ts-ignore
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

export const snakeToSpaces = (str: string) => str.replace(/_/g, " ");

export const formatCurrency = (value: number) => {
  return value.toLocaleString(navigator.language, {
    currency: "usd",
    maximumFractionDigits: 0,
    style: "currency",
  });
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const consoleError = console.error.bind(console);
console.error = (message, ...args) => {
  // Ignore specific error messages

  // This is caused by nordpass extension and is not a problem
  if (
    message.includes(
      "Extra attributes from the server: data-np-intersection-state"
    ) ||
    message.includes("Warning: Extra attributes from the server: %s%s")
  ) {
    return;
  }

  // Log the error message for other cases
  consoleError(message, ...args);
};
