export type ApiSuccessResponse<Body extends Record<string, any> | null> = {
  success: true;
  message?: string;
  meta?: Record<string, any>;
} & (Body extends Record<string, any> ? Body : {});

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiResponse<Body extends Record<string, any> | null = null> =
  | ApiSuccessResponse<Body>
  | ApiErrorResponse;
