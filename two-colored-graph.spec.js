import t from 'tap';
import { checkIfGraphIsTwoColored } from './two-colored-graph.js';


t.test('Check the two-color graph problem algorithm solution', t => {
  t.plan(3);

  t.test('Given the next graphs the algorithm should return "false" as the graph is not red-green colorable or it is not connected graph', t => {
    t.plan(2)

    t.test('Given the disconnected graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b, f - g'), false);
    })

    t.test('Given the "a - b - c - a" circular graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b - c - a'), false);
    })
  })

  t.test('Given the next graphs the algorithm should return "true" as the graph is both red-green colorable and it is a connected graph', t => {
    t.plan(2);

    t.test('Given the tree connected graphs', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b - c'), true);
    })

    t.test('Given the "a - b, c - d, b - c, a - d" connected graph', t => {
      t.plan(1);
      t.equal(checkIfGraphIsTwoColored('a - b, c - d, b - c, a - d'), true);
    })
  });

  t.test('Given the an empty string the algorithm should throw', t => {
    const errorMessage = 'Invalid parameter passed. Input must be string and can not be empty.';
    t.plan(1);

    t.test('Given the empty string value(s)', t => {
      t.plan(1);

      t.throws(() => checkIfGraphIsTwoColored(''), { message: errorMessage })
    })
  })
})
