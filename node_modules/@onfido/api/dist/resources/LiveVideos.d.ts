import { AxiosInstance } from "axios";
import { OnfidoDownload } from "../OnfidoDownload";
import { Resource } from "../Resource";
export declare type LiveVideo = {
    id: string;
    createdAt: string;
    href: string;
    downloadHref: string;
    fileName: string;
    fileType: string;
    fileSize: number;
};
export declare class LiveVideos extends Resource<never> {
    constructor(axiosInstance: AxiosInstance);
    download(id: string): Promise<OnfidoDownload>;
    frame(id: string): Promise<OnfidoDownload>;
    find(id: string): Promise<LiveVideo>;
    list(applicantId: string): Promise<LiveVideo[]>;
}
