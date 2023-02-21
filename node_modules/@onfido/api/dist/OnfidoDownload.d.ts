/// <reference types="node" />
import { IncomingMessage } from "http";
import { Readable } from "stream";
export declare class OnfidoDownload {
    private readonly incomingMessage;
    constructor(incomingMessage: IncomingMessage);
    asStream(): Readable;
    get contentType(): string;
}
