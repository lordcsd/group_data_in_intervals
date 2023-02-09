import {
  IntervalEnum,
  SortParamsDTO,
  IntervalDTO,
} from "./dto/sales.dto";

export * from "./dto/sales.dto"

export function groupDataInTimeIntervals(
  details: SortParamsDTO
): IntervalDTO[] {
  const { data, interval } = details;

  let startDate = details.startDate;

  if (data.length === 0) return [];

  if (!startDate) {
    startDate = data.reduce((earliest, sale) => {
      return new Date(sale.t as any) < earliest
        ? new Date(sale.t as any)
        : earliest;
    }, new Date(data[0].t as any));
  }

  const endDate = data.reduce((latest, sale) => {
    return new Date(sale.t as any) > latest
      ? new Date(sale.t as any)
      : latest;
  }, new Date(data[0].t as any));

  const intervals: IntervalDTO[] = [
    {
      startDate,
      endDate: getEndDate(startDate, interval),
      data: [],
    },
  ];

  let currentStartDate = intervals[0].endDate;
  while (currentStartDate < endDate) {
    const currentEndDate = getEndDate(
      currentStartDate,
      interval
    );
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
        new Date(sale.t as any) >=
          _interval.startDate &&
        new Date(sale.t as any) <
          _interval.endDate
      ) {
        _interval.data.push(sale);
        break;
      }
    }
  }

  return intervals;
}

function getEndDate(
  startDate: Date,
  interval: IntervalEnum
): Date {
  switch (interval) {
    case IntervalEnum.YEARLY:
      return new Date(
        startDate.getFullYear() + 1,
        0,
        1
      );
    case IntervalEnum.MONTHLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        1
      );
    case IntervalEnum.WEEKLY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );
    case IntervalEnum.DAILY:
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
  }
}
