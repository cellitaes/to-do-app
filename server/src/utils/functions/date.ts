export const generateNewDate = () => {
  const newDate = new Date();

  const localeDateTime = newDate.toLocaleDateString();
  const localeTimeString = newDate.toLocaleTimeString();

  return `${localeDateTime} ${localeTimeString}`;
};
