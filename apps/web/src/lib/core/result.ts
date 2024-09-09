import { type BaseError } from './error';

export type ResultOK<TData> = {
  success: true;
  data: TData;
  error?: never;
};

export type ResultError = {
  success: false;
  data?: never;
  error: BaseError;
};

export type Result<TData> = ResultOK<TData> | ResultError;

export function ResultOK<TData>(data: TData): ResultOK<TData> {
  return { success: true, data };
}

export function ResultEmpty(): ResultOK<void> {
  return { success: true, data: undefined };
}

export function ResultError(error: BaseError): ResultError {
  return { success: false, error };
}
