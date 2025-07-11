import {formatCurrency} from '../../scripts/utils/money.js';

function test(func, res, ...args) {
  if (func(...args) === res) {
    console.log('passed');
  } else {
    console.log('failed');
  }
}

console.log('test suite: formatCurrency');

console.log('convert cents');
test(formatCurrency, "20.95", 2095);

console.log('works with 0');
test(formatCurrency, "0.00", 0);

console.log('rounds up to nearest cent');
test(formatCurrency, "20.01", 2000.5);

console.log('rounds down to nearest cent');
test(formatCurrency, "20.00", 2000.4);