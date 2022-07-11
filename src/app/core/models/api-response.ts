
export class ApiResponse<T> {
    public data: T[];
}

export class HttpResponse {
    Success: boolean;
    Message: string;
}

export class ApiErrorResponse<T> extends ApiResponse<never> {
    public error: T;
}

export class ErrorMessage {
    public message: string;
    public code: number;
    public correlationId?: string;
}

export class ValidationErrorMessage extends ErrorMessage {
    public validationMessages: any[];
}
