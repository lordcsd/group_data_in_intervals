import { IntervalEnum, SortParamsDTO, IntervalDTO } from "./dto/sales.dto";
export { IntervalEnum, SortParamsDTO, IntervalDTO, GroupedDataDTO, } from "./dto/sales.dto";
export declare function groupDataInTimeIntervals(details: SortParamsDTO): IntervalDTO[];
export declare function getIntervalStartDate(startDate: Date, interval: IntervalEnum): Date;
