import t from 'tap';
import { checkIfGraphIsTwoColored } from './two-colored-graph.js';




t.test('Check the two-color graph problem algorithm solution', t => {
  t.plan(4);

  t.test('Given the next graphs the algorithm should return "false" as the graph is not red-green colorable or it is not connected graph', t => {
    t.plan(3);

    t.test('Given the disconnected graphs', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored('a - e, b - d'), false);
        t.equal(checkIfGraphIsTwoColored('a - b, f - g, e - h'), false);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored(
          `a - b
          f - g
          e - h`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b \n f - g \r e - h`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b \r f - g
          e - h`
        ), false);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored(
          `a - b
          f - g, e - h`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b, f - g \n e - h`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b \r f - g, e - h`
        ), false);
      });
    })

    t.test('Given the circular graphs', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored('a - b - c - a'), false);
        t.equal(checkIfGraphIsTwoColored('a - b, b - c, c - d, c - a'), false);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored(
          `a - b
          b - c \n c - d
          c - a`
        ), false);

        t.equal(checkIfGraphIsTwoColored(
          `a - b \r b - c
          c - d \n c - a`
        ), false);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored(
          `a - b, b - c \r c - d
          c - a`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b
          b - c \r c - d, c - a`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - b \n b - c \r c - d, c - a`
        ), false);
      });
    });

    t.test('Given the circular node graphs', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored('a - a'), false);
        t.equal(checkIfGraphIsTwoColored('a - a, b - c, c - c, c - a'), false);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored(
          `a - a \r b - c \n c - c
          c - a`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - a
          b - c
          c - c \r c - a`
        ), false);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored(
          `a - a, b - c
          c - c \r c - a`
        ), false);
        t.equal(checkIfGraphIsTwoColored(
          `a - a \n b - c
          c - c, c - a`
        ), false);
      });
    })
  })

  t.test('Given the next graphs the algorithm should return "true" as the graph is both red-green colorable and it is a connected graph', t => {
    t.plan(4);

    t.test('Given the tree connected graphs', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored('a - b - c'), true);
        t.equal(checkIfGraphIsTwoColored('a - b - c - d'), true);
        t.equal(checkIfGraphIsTwoColored('a - b, b - c, c - d, c - f, c - e'), true);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored(
          `a - b \r b - c \n c - d
          c - f
          c - e`
        ), true);
        t.equal(checkIfGraphIsTwoColored(
          `a - b
          b - c
          c - d \r c - f \n c - e`
        ), true);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored(`a - b \r b - c \n c - d, c - f \n c - e`), true);
        t.equal(checkIfGraphIsTwoColored(
          `a - b
          b - c
          c - d, c - f \r c - e`
        ), true);
        t.equal(checkIfGraphIsTwoColored(
          `a - b \n b - c, c - d \r c - f
          c - e`
        ), true);
      });
    })

    t.test('Given the connected circular graph', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored('a - b, c - a'), true);
        t.equal(checkIfGraphIsTwoColored('e - d, d - c, c -b - a'), true);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored(
          `e - d
          d - c \r c - b - a`
        ), true);
        t.equal(checkIfGraphIsTwoColored(
          `e - d \n d - c
          c - b - a`
        ), true);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(3);

        t.equal(checkIfGraphIsTwoColored('e - d, d - c \r c - b - a'), true);
        t.equal(checkIfGraphIsTwoColored('e - d, d - c \n c - b - a'), true);
        t.equal(checkIfGraphIsTwoColored(
          `e - d
          d - c \r c - b - a`
        ), true);
      });
    })

    t.test('Given the multiple neighbours connected graph', t => {
      t.plan(3);

      t.test('With comma (",") as the path separator', t => {
        t.plan(1);

        t.equal(checkIfGraphIsTwoColored('a - b, a - c, b - d, b - e, b - f, f - l, c - m, c - n - o'), true);
      });

      t.test('With new line ("\n" | "\r") as the path separator', t => {
        t.plan(2);

        t.equal(checkIfGraphIsTwoColored('a - b \r a - c \n b - d \n b - e \n b - f \r f - l \n c - m \n c - n - o'), true);
        t.equal(checkIfGraphIsTwoColored(
          `a - b
          a - c \r b - d
          b - e \n b - f \r f - l
          c - m
          c - n - o`
        ), true);
      });

      t.test('With combination of comma (",") and new line ("\n" | "\r") as the path separators', t => {
        t.plan(1);

        t.equal(checkIfGraphIsTwoColored(
          `a - b, a - c \r b - d \n b - e
          b - f
          f - l, c - m \r c - n - o`
        ), true);
      });
    })

    t.test('Given the single node graph', t => {
      t.plan(1);

      t.equal(checkIfGraphIsTwoColored('a'), true);
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
      t.throws(() => checkIfGraphIsTwoColored(undefined), { message: errorMessage });
    })

    t.test('Given the empty string value(s)', t => {
      t.plan(2);

      t.throws(() => checkIfGraphIsTwoColored(''), { message: errorMessage });
      t.throws(() => checkIfGraphIsTwoColored('     '), { message: errorMessage });
    })

    t.test('Given the non-string value(s)', t => {
      t.plan(5);

      t.throws(() => checkIfGraphIsTwoColored({}), { message: errorMessage });
      t.throws(() => checkIfGraphIsTwoColored([]), { message: errorMessage });
      t.throws(() => checkIfGraphIsTwoColored(0), { message: errorMessage });
      t.throws(() => checkIfGraphIsTwoColored(24), { message: errorMessage });
      t.throws(() => checkIfGraphIsTwoColored(true), { message: errorMessage });
    })
  })

  t.test('Given the invalid input, with multiple separators between nodes (node is empty) the algorithm should return "false", as the input does not satisfy the requirements of the assignment', t => {
    t.plan(3);

    t.test('With multiple commas (",") between nodes', t => {
      t.plan(1);

      t.equal(checkIfGraphIsTwoColored('a - b,, a - c, b - d,, b - e, b - f,, f - l, c - m, c - n - o'), false);
    });

    t.test('With multiple line breaks ("\n" | "\r") between nodes', t => {
      t.plan(2);

      t.equal(
        checkIfGraphIsTwoColored('a - b \r a - c \n b - d \r\n b - e \r\r b - f \n f - l \n c - m \n\n c - n - o'),
        false
      );
      t.equal(checkIfGraphIsTwoColored(
        `a - b
        a - c
        b - d
        
        b - e
        
        b - f
        f - l \r c - m \n c - n - o`
      ), false);
    });

    t.test('With the combination of multiple commas (",") and new lines ("\n" | "\r") between nodes', t => {
      t.plan(3);

      t.equal(checkIfGraphIsTwoColored('a - b,\r a - c, b - d,\n b - e \r b - f \n f - l, c - m \r\n c - n - o'), false);
      t.equal(checkIfGraphIsTwoColored(
        `a - b
        
        a - c, b - d,, b - e, b - f \r f - l \n c - m \n
        c - n - o`
      ), false);
      t.equal(checkIfGraphIsTwoColored(
        `a - b, a - c, b - d, b - e, b - f, f - l, c - m \r
        c - n - o`
      ), false);
    });

  });
});
