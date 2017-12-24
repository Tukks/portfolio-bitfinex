import { DollarPipe } from './../pipe/dollar.pipe';
import * as moment from 'moment';
import * as vis from 'vis';
import { PercentagePipe } from '../pipe/percentage.pipe';
// DOLLAR AND PERENTAGE
export function calcPercentage(
  dataset,
  type: 'hours' | 'day' | 'week' | 'month' | 'year' | 'all'
) {
  let max = dataset.max('x');
  // recupere la derniere valeur enregistrer du portfolio
  // et a cette valeur on soustrait 1h, jour, week etc...
  let filteredDataSet = new vis.DataSet(
    dataset.get({
      filter: function(item) {
        if (type !== 'all') {
          return moment(item.x).isSameOrAfter(moment(max['x']).subtract(1, type));
        } else {
          return item;
        }
      }
    })
  );

  let min = filteredDataSet.min('x');
  if (max && min) {
    let perc = (Number.parseFloat(max['y']) - Number.parseFloat(min['y'])) / Number.parseFloat(min['y']) * 100;
    return {
      first: new PercentagePipe().transform(toNumber(perc)),
      second: new DollarPipe().transform(Number(max['y'] - min['y']).toFixed(2))
    };
  }
}

export function calcTotalAsset(dataset) {
  let max = dataset.max('x');
  if (max) {
    return { second: new DollarPipe().transform(toNumber(max['y'])) };
  }
}

export function getFirst(dataset) {
  let total = dataset.min('x');
  if (total) {
    return {
      second: new DollarPipe().transform(toNumber(total['y']))
    };
  }
}
export function calcMinMax(dataset, type: 'min' | 'max') {
  let total = dataset[type]('y');
  if (total) {
    return {
      second: new DollarPipe().transform(toNumber(total['y']))
    };
  }
}


export function toNumber(value) {
    return Number.parseFloat(value).toFixed(2);
}
