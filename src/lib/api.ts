export interface IError {
  message: string;
  details?: any;
}

export function NewApiError(
  message: string,
  details?: any,
): IError {
  return {
    message,
    details,
  };
}
