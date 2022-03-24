/**
 * @author  Ognjen Jevremovic<jevremovic.ognjen@gmail.com>
 * @date    23/03/2022
 * 
 * JavaScript implementation of an algorithm for checking
 * if a graph is a connected, red-blue colorable graph.
 */


/**
 * @description
 *  Check if a graph is red-green colorable.
 * 
 * @public
 * @param     {string} input - string representation of the graph
 * @returns   {boolean}
 */
export function checkIfGraphIsTwoColored(input) {
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

  //  Check if the input is provided
  if (!input || typeof input !== 'string' || !input.trim()) {
    throw new Error('Invalid parameter passed. Input must be string and can not be empty.');
  }

  //  Support both new line and a comma as separators between paths
  //  however, standardize the input to a comma for internal separation.
  input = input.replace(/[\n|\r|\,]/gm, ',')

  /**
   * @type {Array.<string[]>} - Matrix containing, unique node paths between (undirected) graph nodes
   */
  const paths = getPathsFromInput(input);
  /**
   * @type {string[]} - List of all the nodes, contained from within the graph
   */
  const nodes = getNodesFromInput(input);

  /**
   * @type {Map<string, NodeWithColorAndNeighbours>} - Graph representation in form of adjecency list
   */
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
   *  Each element in an array is a string,
   *  representing a graph path containing nodes and edges.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges
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
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges
   *
   * @returns   {Array.<string[]>}
   */
  function getPathsFromInput(graphString) {
    return getGraphs(graphString)
      .map(graph => graph.replace(/\s/gm, '')
        .split('-')
        .reduce((edges, node, idx, originalGraphArray) => {
          const neighbourNode = originalGraphArray[idx + 1];

          if (!!neighbourNode) {
            edges = [...edges, [node, neighbourNode]];
          }

          return edges;
        }, [])
      )
      .flat();
  }


  /**
   * @description
   *  Extract all of the graph's nodes.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges
   *
   * @returns   {string[]}
   */
  function getNodesFromInput(graphString) {
    return getGraphs(graphString)
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
    //  and node / edge manipulation in O(n) time complexity.
    const adjacencyList = new Map();

    /**
     * @description
     *  Add the graph node, to the adjencency list.
     * 
     * @param {string} node - node from within the graph
     */
    function addNode(node) {
      adjacencyList.set(node, { neighbours: [], color: null });
    }

    /**
     * @description
     *  Add the graph edges, to the adjencency list.
     *  Each node will have a list of neighbours
     *  representing the edges of the graph.
     * 
     * @param {string} origin - node from within the graph, found on one end of the edge
     * @param {string} destination - node from within the graph, found on the other end of the edge
     */
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
    //  Create the que for the bfs algorithm
    const queue = [startingNode];

    //  Initialize the color on first node
    adjacencyList.get(startingNode).color = startWithColor;

    while (!!queue.length) {
      //  Dequeue the next node from the start of queue
      const node = queue.shift();
      //  Get node's neighbours and its' current color
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
          //  Keep track of visited nodes,
          //  as every node in the undirected graph contains paths both ways.
          //  (to it's neighbours on the left and right).
          //  We only want to traverse each node once.
          visited.add(node, neighbour);
          //  Enqueue the neighbour node to the que. 
          queue.push(neighbour);
        }
      }
    }

    return true;
  }
}
