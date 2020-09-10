import LemonadeStandQueue from './models';

export default function (queue = []) {
  const instance = new LemonadeStandQueue(queue);
  console.log(instance);
};
