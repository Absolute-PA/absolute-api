export interface AuditDto {
    _id: string;
    actor: string;
    name: string;
    message: string;
    createdAtUtc: string;
}
export interface AuditHistoryDto {
    data: AuditDto[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}
