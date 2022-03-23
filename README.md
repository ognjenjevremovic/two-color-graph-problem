# Two colors graph problem

JavaScript implementation of an algorithm for checking the coloring of the nodes of the undirected graph, in such a way that no two adjacent nodes have the same color.

## Details

Write a small web application to check if a graph is red-blue colorable.

A graph is red-blue colorable if two connected nodes have never the same color and the graph is a connected graph. A user should be able to enter a graph in a textarea by typing some paths (a word is a node, a dash an edge and a new line or a comma a separation between paths).

### Definitions:

From Wikipedia - [Connected graph](<https://en.wikipedia.org/wiki/Connectivity_(graph_theory)>).

A graph is said to be connected if every pair of vertices in the graph is connected. This means that there is a path between every pair of vertices. An undirected graph that is not connected is called disconnected. An undirected graph G is therefore disconnected if there exist two vertices in G such that no path in G has these vertices as endpoints. A graph with just one vertex is connected. An edgeless graph with two or more vertices is disconnected.

## Requirements

- **Node.JS** - >=_v14.x_ or above (tested with v14.17.3, although versions matching _>=0.10.0_ should be fine)
- **npm** - >=_v7.x_ or above (tested with with v8.5.4, although versions supporting _package-lock.json_ file should be fine)

## Installation

```sh
$ npm ci
```

## Usage

For running the application locally, on the default port _8080_:

```sh
$ npm run start
```

If you would like to specify a different port, pass the `port` flag to the command:

```sh
$ npm run start -- --port=4000
```

## Further improvements

:white_check_mark: Write setup instructions

:black_square_button: Write unit tests, covering the `two-colored-graph` implementation

:black_square_button: Provide a production (optimized) build

:black_square_button: Write UI test

## License

MIT. See [LICENSE](LICENSE) for details.
