## Group_data_in_intervals

This package solves an issue I experienced lately when I want to group a large number of sales records in yearly, monthly, weekly and daily intervals for displaying on charts and graphs. This package considers intervals with no sales/events.

### How to it works

First off these are enums and interface that will that our function will makes use of and can each be imported from this package.

```typescript
export enum IntervalEnum {
  YEARLY = "YEARLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

export interface GroupedDataDTO {
  t: Date;
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
```

#### Usage

```typescript
import { groupDataInTimeIntervals } from "group_data_in_intervals";

const data = [
  {
    desc: Andrew bought....,
    t: 2020-01-01T00:00:00.0,
  },
  {
    desc: Trump bought....,
    t: 2020-01-03T00:00:00.0,
  },
  {
    desc: Ben bought....,
    t: 2020-01-05T00:00:00.0,
  },
  {
    desc: Jane bought....,
    t: 2020-01-08T00:00:00.0,
  },
  {
    desc: Andrew bought....,
    t: 2020-02-09T00:00:00.0,
  },
  {
    desc: Wood bought....,
    t: 2020-02-10T00:00:00.0,
  },
];

const sortedAndGroupedData = groupDataInTimeIntervals({
    data,
    interval: IntervalEnum.WEEKLY
})

console.log(sortedAndGroupedData);

// [
//     {
//         startDate: 2019-12-31T23:00:00.000Z,
//         endDate: 2020-01-07T23:00:00.000Z,
//         data: [
//             {
//                 desc: Andrew bought....,
//                 t: 2020-01-01T00:00:00.0
//             },
//             {
//                 desc: Trump bought....,
//                 t: 2020-01-03T00:00:00.0
//             },
//             {
//                 desc: Ben bought....,
//                 t: 2020-01-05T00:00:00.0
//             }
//         ]
//     },
//     {
//         startDate: 2020-01-07T23:00:00.000Z,
//         endDate: 2020-01-14T23:00:00.000Z,
//         data: [
//             {
//                 desc: Jane bought....,
//                 t: 2020-01-08T00:00:00.0
//             }
//         ]
//     },
//     {
//         startDate: 2020-01-14T23:00:00.000Z,
//         endDate: 2020-01-21T23:00:00.000Z,
//         data: []
//     },
//     {
//         startDate: 2020-01-21T23:00:00.000Z,
//         endDate: 2020-01-28T23:00:00.000Z,
//         data: []
//     },
//     {
//         startDate: 2020-01-28T23:00:00.000Z,
//         endDate: 2020-02-04T23:00:00.000Z,
//         data: []
//     },
//     {
//         startDate: 2020-02-04T23:00:00.000Z,
//         endDate: 2020-02-11T23:00:00.000Z,
//         data: [
//             {
//                 desc: Andrew bought....,
//                 t: 2020-02-09T00:00:00.0
//             },
//             {
//                 desc: Wood bought....,
//                 t: 2020-02-10T00:00:00.0
//             }
//         ]
//     }
// ]
```

 # Enjoy every byte!!!