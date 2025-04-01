export const formatDate = (date: string, separator: string): string => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDate();
  const month = formatedDate.getMonth() + 1;
  const year = formatedDate.getFullYear();

  return [day, month, year].join(separator);
};


export const getErrorMessage = (error: Error | null): string => {
  const defaultError = 'Error en la llamada';

  if (typeof error === 'string') return error;
  
  if (error instanceof Error) {
    return error.message || error.toString();
  }

  return defaultError;
};
