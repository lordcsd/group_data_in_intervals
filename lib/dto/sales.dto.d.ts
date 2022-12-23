export declare enum IntervalEnum {
    YEARLY = "YEARLY",
    MONTHLY = "MONTHLY",
    WEEKLY = "WEEKLY",
    DAILY = "DAILY"
}
export interface GroupedDataDTO {
    t: Date | string;
    [key: string]: any;
}
export interface SortParamsDTO {
    data: GroupedDataDTO[];
    interval: IntervalEnum;
    startDate?: Date;
}
export interface IntervalDTO {
    startDate: Date;
    endDate: Date;
    data: GroupedDataDTO[];
}
