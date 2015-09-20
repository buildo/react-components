import partial from 'lodash/function/partial';

const easeIn = (exp, time, distance) => Math.pow(time, exp) * distance;
// const easeOut = (base, time, distance) => ( Math.log(time + 1) / Math.log(base) ) * distance;
const easeInOut = (e, t, d) => (t <= 0.5) ? easeIn(e, t, d * 2) : d - easeIn(e, 1 - t, d * 2);

export default {
  linear: (time, distance) => ( time * distance ),
  easeInQuad: partial(easeIn, 2),
  easeInCubic: partial(easeIn, 3),
  // easeOutQuad: partial(easeOut, 2),
  // easeOutCubic: partial(easeOut, 3),
  easeInOutQuad: partial(easeInOut, 2),
  easeInOutCubic: partial(easeInOut, 3)
};