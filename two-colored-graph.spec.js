import t from 'tap';
import { checkIfGraphIsTwoColored } from './two-colored-graph.js';


t.test('Check the two-color graph problem algorithm solution', t => {
  t.plan(3);

  t.test('Given the next graphs the algorithm should return "false" as the graph is not red-green colorable or it is not connected graph', t => {
    t.plan(5)

    t.test('Given the disconnected graphs', t => {
      t.plan(2);
      t.equal(checkIfGraphIsTwoColored('a - b, f - g'), false);
      t.equal(checkIfGraphIsTwoColored('a - b, f - d'), false);
    })

    t.test('Given the "a - b - c - a" circular graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b - c - a'), false);
    })

    t.test('Given the "a - b, b - c, c - d, c - a" graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b, b - c, c - d, c - a'), false);
    })

    t.test('Given the "a - a, b - c, c - c, c - a" graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - a, b - c, c - c, c - a'), false);
    })

    t.test('Given the "a - a" single node circular graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - a'), false);
    })
  })

  t.test('Given the next graphs the algorithm should return "true" as the graph is both red-green colorable and it is a connected graph', t => {
    t.plan(4);

    t.test('Given the tree connected graphs', t => {
      t.plan(3);
      t.equal(checkIfGraphIsTwoColored('a - b - c'), true);
      t.equal(checkIfGraphIsTwoColored('a - b - c - d'), true);
      t.equal(checkIfGraphIsTwoColored('a - b, b - c, c - d, c - f, c - e'), true);
    })

    t.test('Given the "a - b, c - d, b - c, a - d" connected graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b, c - d, b - c, a - d'), true);
    })

    t.test('Given the "a" single node graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a'), true);
    })

    t.test('Given the "a - b, c - a" connected circular graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b, c - a'), true);
    })
  });

  t.test('Given the empty value or an empty string the algorithm should throw', t => {
    t.plan(4);
    const errorMessage = 'Invalid parameter passed. Input must be string and can not be empty.';

    t.test('Given the "null" value', t => {
      t.plan(1);
      t.throws(() => checkIfGraphIsTwoColored(null), { message: errorMessage });
    })

    t.test('Given the "undefined" value', t => {
      t.plan(1);
      t.throws(() => checkIfGraphIsTwoColored(undefined), { message: errorMessage })
    })

    t.test('Given the empty string value(s)', t => {
      t.plan(2);

      t.throws(() => checkIfGraphIsTwoColored(''), { message: errorMessage })
      t.throws(() => checkIfGraphIsTwoColored('     '), { message: errorMessage })
    })

    t.test('Given the non-string value(s)', t => {
      t.plan(5);

      t.throws(() => checkIfGraphIsTwoColored({}), { message: errorMessage })
      t.throws(() => checkIfGraphIsTwoColored([]), { message: errorMessage })
      t.throws(() => checkIfGraphIsTwoColored(0), { message: errorMessage })
      t.throws(() => checkIfGraphIsTwoColored(24), { message: errorMessage })
      t.throws(() => checkIfGraphIsTwoColored(true), { message: errorMessage })
    })
  })
})
