export const required = value => {
  if (value == undefined) {
    return 'Please fill this field';
  } else {
    return undefined;
  }
};

export const dateTodayOrLower = value => {
  let newDate = new Date(value);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() + 1);
  if (newDate > new Date) {
    return `Date can't be from the future`;
  } else {
    return undefined;
  }
};

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Please Invalid email address' : undefined;

export const isEqual = (compareKey, field) => (value, allValues) =>
  value && !(value == allValues[compareKey]) ? `${field} do not match` : undefined;

export const includeNumber = value =>
  value && !/[0-9]/.test(value) ? 'Please include a number' : undefined;

export const includeLowercase = value =>
  value && !/[a-z]/.test(value) ? 'Please include a Lowercase Letter' : undefined;

export const includeUppercase = value =>
    value && !/[A-Z]/.test(value) ? 'Please include an Uppercase Letter' : undefined;
