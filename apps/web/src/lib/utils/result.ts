export type ResultSuccess<Output> = {
  success: true;
  data: Output;
};

export type ResultError = {
  success: false;
  data?: never;
};

export type Result<Output> = ResultSuccess<Output> | ResultError;
