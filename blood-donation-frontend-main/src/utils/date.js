import { formatISO } from 'date-fns';

export const getDate = (date) => {
  const parsedDate = new Date(date);
  return formatISO(parsedDate);
};

/**
 *
 * @param {'Year-Month-Day'} date
 * @returns {number} age
 */
export const calculateAge = (date = '2000-01-01') => {
  const today = new Date();
  const bod = new Date(date);
  let age = today.getFullYear() - bod.getFullYear();
  const month = today.getMonth() - bod.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < bod.getDate())) {
    age--;
  }
  return age;
};
