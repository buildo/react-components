/* eslint-disable */

var hasOwn = {}.hasOwnProperty;

function classNames(...args: any[]) {
  var classes = [];

  for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (!arg) continue;

      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
          classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
              classes.push(inner);
          }
      } else if (argType === 'object') {
          for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
              }
          }
      }
  }

  return classes.join(' ');
}

export default classNames;
