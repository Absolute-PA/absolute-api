export interface ExceptionEmailDetails {
    message: string;
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    timestamp?: string;
    piName?: string;
}
