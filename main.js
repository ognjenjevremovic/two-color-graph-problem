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
 * @details
 *  Check if a graph is red-blue colorable.
 * 
 * @public
 * @param     {string} input - string representation of the graph
 * @returns   {boolean}
 */
function checkGraph(input) {
  // TODO: Do some initial validation of an input

  //  Cover the case of both:
  //    - Connected graphs,
  //    - Disconnected graphs.
  const paths = getGraphs(input).map(graph => getPathsFromInput(graph)).flat();
  const nodes = getNodesFromInput(input);

  //  Represent the graph in an adjecency list
  const graph = constructGraph(nodes, paths);

  //  TODO: Check if graph is a connected graph
  //  TODO: Check if graph is blue-red colorable.

  //  TODO: Implementation details
  return false;


  /**
   * @details
   *  Provided a string representation of the graph
   *  return an Array of strings.
   *  Each element of an array is a string,
   *  representing a graph path containing nodes and edges.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges. 
   * @returns   {string[]}
   */
  function getGraphs(graphString) {
    return graphString.replace(/\s/g, '').split(',');
  }


  /**
   * @details
   *  Find the graph's neighbouring nodes (paths), through paths / edges.
   * 
   * @private
   * @param     {string[]} graphs - string array representation of undirected graph  
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
   * @details
   *  Extract all of the graph's nodes.
   * 
   * @private
   * @param     {string} graphString - string representation of the undirected graph, with nodes and edges. 
   * @returns   {string[]}
   */
  function getNodesFromInput(graphString) {
    return graphString.replace(/\s/g, '').split(',')
      .map(val => val.split('-'))
      .flat()
      .filter((val, idx, arr) => arr.indexOf(val) === idx)
  }

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
}


//  Some use-case development / test scenarions, for checking the solution

console.log('should pass | yield "true" - ', checkGraph(testInput_one));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_two));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_three));
console.log('should pass | yield "true" - ', checkGraph(testInput_four));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_five));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_six));