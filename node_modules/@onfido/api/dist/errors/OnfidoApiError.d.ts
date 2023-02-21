import { OnfidoError } from "./OnfidoError";
export declare class OnfidoApiError extends OnfidoError {
    readonly responseBody: unknown;
    readonly statusCode: number;
    readonly type: string;
    readonly fields: unknown;
    private constructor();
    static fromResponse(responseBody: unknown, statusCode: number): OnfidoApiError;
    isClientError(): boolean;
}
