/**
 * These are the provided test cases, that mimmick
 * the user input from the UI text element.
 */
//  Simple connected graph (tree), valid
const testInput_one = 'a - b - c';
//  Disconnected graph, invalid
const testInput_two = 'a - b, f - g';
//  Connected graph, invalid
const testInput_three = 'a - b - c - a';
//  Complex connected graph, valid
const testInput_four = 'a - b, c - d, b - c, a - d';
//  Circular graph, invalid
const testInput_five = 'a - a, b - c, c - c, c - a';
//  Single node circular graph, invalid
const testInput_six = 'a - a';


/**
 * @description
 *  Check if a graph is red-green colorable.
 * 
 * @public
 * @param     {string} input - string representation of the graph
 * @returns   {boolean}
 */
function checkGraph(input) {
  /**
   * @typedef   {object}  Colors
   * @property  {string}  RED
   * @property  {string}  GREEN
   */
  /**
   * @typedef   {Object}        NodeWithColorAndNeighbours
   * @property  {string[]}      neighbours  - list of neighbour nodes
   * @property  {string|null}   color       - current node color
  */


  /**
 * @description
 *  Enum type used for storing the two different colors,
 *  used to paint nodes in the graph.
 * 
 * @private
 * @readonly
 * @enum {Colors}
 */
  const colors = {
    RED: 'red',
    GREEN: 'green',
  }

  // TODO: Do some initial validation of an input

  //  Cover the case of both:
  //    - Connected graphs,
  //    - Disconnected graphs.
  const paths = getGraphs(input).map(graph => getPathsFromInput(graph)).flat();
  const nodes = getNodesFromInput(input);

  //  Represent the graph in an adjecency list
  const graph = constructGraph(nodes, paths);

  //  Check if graph is red-green colorable
  //  using Breadth First Search algorithm
  let isTwoColoredGraph = bfs(graph, nodes[0], colors.RED);

  //  If graph is valid two-colorable graph,
  //  check if graph is a connected graph
  if (isTwoColoredGraph) {
    for (let value of graph.values()) {
      isTwoColoredGraph = isTwoColoredGraph && !!value.color;
    }
  }

  //  yield the result, matching the requirements.
  return isTwoColoredGraph;


  /**
   * @description
   *  Provided a string representation of the graph
   *  return an Array of strings.
   *  Each element of an array is a string,
   *  representing a graph path containing nodes and edges.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges. 
   *
   * @returns   {string[]}
   */
  function getGraphs(graphString) {
    return graphString.replace(/\s/g, '').split(',');
  }


  /**
   * @description
   *  Find the graph's neighbouring nodes (with unique paths), through paths / edges.
   * 
   * @private
   * @param     {string[]} graphs - string array representation of undirected graph  
   *
   * @returns   {Array.<string[]>}
   */
  function getPathsFromInput(graphsArray) {
    return graphsArray.replace(/\s/g, '').split('-')
      .reduce((edges, node, idx, originalGraphArray) => {
        const neighbourNode = originalGraphArray[idx + 1];

        if (!!neighbourNode) {
          edges = [...edges, [node, neighbourNode]];
        }

        return edges;
      }, [])
  }


  /**
   * @description
   *  Extract all of the graph's nodes.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges. 
   *
   * @returns   {string[]}
   */
  function getNodesFromInput(graphString) {
    return graphString.replace(/\s/g, '').split(',')
      .map(val => val.split('-'))
      .flat()
      .filter((val, idx, arr) => arr.indexOf(val) === idx)
  }

  /**
   * @description
   *  Construct the adjecency matrix for representing the undirected graph.
   * 
   * @param     {string[]} nodes - list of all the nodes in the graph
   * @param     {Array.<string[]>} paths  - list of the graph paths, between nodes
   * 
   * @returns   {Map<string, NodeWithColorAndNeighbours>}
   */
  function constructGraph(nodes, paths) {
    //  Create adjancency list, used for storing the graph
    //  and data manipulation in O(n) time complexity.
    const adjacencyList = new Map();

    // Add node to the adjancency list
    function addNode(node) {
      adjacencyList.set(node, { neighbours: [], color: null });
    }

    //  Add edge(s) in adjancency list (undirected)
    function addEdge(origin, destination) {
      adjacencyList.get(origin).neighbours.push(destination);
      adjacencyList.get(destination).neighbours.push(origin);
    }

    //  Construct the Graph with nodes and edges
    //  and represent it in an ajdecency list.
    nodes.forEach(addNode);
    paths.forEach(path => addEdge(...path));

    return adjacencyList;
  }

  /**
   * @description
   *  Breadth first search algorithm implementation,
   *  adapted for the two-colored graph problem.
   * 
   * @param   {Map<string, NodeWithColorAndNeighbours>} adjacencyList - graph representation 
   * @param   {NodeWithColorAndNeighbours} startingNode - start breadth first search from node
   * @param   {Colors} [startWithColor=colors.RED] - set the color for the current node from graph
   * 
   * @returns {boolean} 
   */
  function bfs(adjacencyList, startingNode, startWithColor = colors.RED) {

    //  Keep track of all visited nodes
    const visited = new Set();
    //  Create the que for bfs algorithm
    const queue = [startingNode];

    //  Initialize the color on first node
    adjacencyList.get(startingNode).color = startWithColor;

    while (!!queue.length) {
      const node = queue.shift();
      const { neighbours, color } = adjacencyList.get(node);

      for (const neighbour of neighbours) {
        //  Set neighbouring node(s) color, to the opposite one
        adjacencyList.get(neighbour).color = adjacencyList.get(neighbour).color || (
          color === colors.RED ? colors.GREEN : colors.RED
        );

        //  If the color matches the neighbouring color
        //  the graph is not two-colored graph.
        if (adjacencyList.get(neighbour).color === color) {
          return false;
        }

        if (!visited.has(neighbour)) {
          visited.add(node, neighbour);
          queue.push(neighbour);
        }
      }
    }

    return true;
  }
}


//  Some use-case development / test scenarions, for checking the solution

console.log('should pass | yield "true" - ', checkGraph(testInput_one));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_two));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_three));
console.log('should pass | yield "true" - ', checkGraph(testInput_four));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_five));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_six));