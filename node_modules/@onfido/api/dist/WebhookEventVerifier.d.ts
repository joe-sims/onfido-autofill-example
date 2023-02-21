/// <reference types="node" />
export declare type WebhookEvent = {
    resourceType: string;
    action: string;
    object: {
        id: string;
        status: string;
        href: string;
        completedAtIso8601: string;
    };
};
export declare class WebhookEventVerifier {
    private readonly webhookToken;
    constructor(webhookToken: string);
    readPayload(rawEventBody: string | Buffer, hexSignature: string): WebhookEvent;
}
