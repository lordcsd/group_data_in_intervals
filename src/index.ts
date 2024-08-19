import { IntervalEnum, SortParamsDTO, IntervalDTO } from "./dto/sales.dto";

export {
  IntervalEnum,
  SortParamsDTO,
  IntervalDTO,
  GroupedDataDTO,
} from "./dto/sales.dto";

export function groupDataInTimeIntervals(
  details: SortParamsDTO
): IntervalDTO[] {
  const { data, interval } = details;

  if (data.length === 0) return [];

  let startDate = details.startDate || new Date(data[0].t as any);
  let endDate = new Date(data[0].t as any);

  for (const datum of data) {
    if (+new Date(datum.t as any) >= +endDate) {
      endDate = new Date(datum.t as any);
    }

    if (+new Date(datum.t as any) < +startDate) {
      startDate = new Date(datum.t as any);
    }
  }

  // set date to interval start
  startDate = getIntervalStartDate(startDate, interval);

  const intervals: IntervalDTO[] = [
    {
      startDate,
      endDate: getIntervalEndDate(startDate, interval),
      data: [],
    },
  ];

  let currentStartDate = intervals[0].endDate;
  while (currentStartDate < endDate) {
    const currentEndDate = getIntervalEndDate(currentStartDate, interval);
    intervals.push({
      startDate: currentStartDate,
      endDate: currentEndDate,
      data: [],
    });
    currentStartDate = currentEndDate;
  }

  for (const sale of data) {
    for (const _interval of intervals) {
      if (
        new Date(sale.t as any) >= _interval.startDate &&
        new Date(sale.t as any) <= _interval.endDate
      ) {
        _interval.data.push(sale);
        break;
      }
    }
  }

  return intervals;
}

function getIntervalEndDate(startDate: Date, interval: IntervalEnum): Date {
  switch (interval) {
    case IntervalEnum.YEARLY:
      return new Date(startDate.getFullYear() + 1, 0, 1, 1, 0, 0);
    case IntervalEnum.MONTHLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        1,
        1,
        0,
        0
      );
    case IntervalEnum.WEEKLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7,
        1,
        0,
        0
      );
    case IntervalEnum.DAILY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1,
        1,
        0,
        0
      );
  }
}

export function getIntervalStartDate(
  startDate: Date,
  interval: IntervalEnum
): Date {
  switch (interval) {
    case IntervalEnum.YEARLY:
      return new Date(startDate.getFullYear(), 0, 1, 1, 0, 0);
    case IntervalEnum.MONTHLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1,
        1,
        0,
        0
      );
    case IntervalEnum.WEEKLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() - startDate.getDay(),
        1,
        0,
        0
      );
    case IntervalEnum.DAILY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        1,
        0,
        0
      );
  }
}
