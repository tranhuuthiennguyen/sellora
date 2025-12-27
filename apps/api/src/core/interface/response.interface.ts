interface DataInterface {
  code: number;
  message: string;
}

export interface SuccessInterface {
  success: DataInterface;
}

export interface ErrorInterface {
  error: DataInterface;
}

export type ResponseInterface =
  | string
  | Error
  | SuccessInterface
  | ErrorInterface;
