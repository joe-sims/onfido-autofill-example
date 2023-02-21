import { AxiosInstance } from "axios";
import { SimpleObject } from "./formatting";
import { OnfidoDownload } from "./OnfidoDownload";
export declare enum Method {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}
export declare class Resource<T extends SimpleObject> {
    private readonly name;
    private readonly axiosInstance;
    protected constructor(name: string, axiosInstance: AxiosInstance);
    protected request({ method, path, body, query }: {
        method: Method;
        path?: string;
        body?: T;
        query?: SimpleObject;
    }): Promise<any>;
    protected upload(body: T): Promise<any>;
    protected download(path: string): Promise<OnfidoDownload>;
}
