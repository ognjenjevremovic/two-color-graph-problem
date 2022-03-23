/**
 * These are the provided test cases, that mimmick
 * the user input from the UI text element.
 */
//  Simple connected graph (tree), valid
const testInput_one = 'a - b - c';
//  Multiple unconnected graphs, invalid
const testInput_two = 'a - b, f - g';
//  Single connected graph, invalid
const testInput_three = 'a - b - c - a';
//  Multiple connected graphs, valid
const testInput_four = 'a - b, c - d, b - c, a - d';
//  Single circular graph, invalid
const testInput_five = 'a - a, b - c, c - c, c - a';
//  Single node circular graph, invalid
const testInput_six = 'a - a';


/**
 * @details
 *  Check if a graph is red-blue colorable.
 * 
 * @public
 * @param     {string} input - string representation of the graph(s)
 * @returns   {boolean}
 */
function checkGraph(input) {
  // TODO: Do some initial validation of an input


  //  Cover the case of both:
  //    - Single graphs,
  //    - Multiple graphs.
  const paths = getGraphs(input).map(graph => getPathsFromInput(graph)).flat();
  const nodes = getNodesFromInput(input);

  console.log('paths', paths);
  console.log('nodes', nodes);

  //  TODO: Implementation details
  return false;


  /**
   * @details
   *  Provided a string representation of the graph(s)
   *  return an Array of strings.
   *  Each element of an array, represents a graph with nodes and edges.
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
   *  Find the graph's neighbouring nodes, through paths / edges.
   * 
   * @private
   * @param     {string[]} graphs - string array representation of undirected graph(s)  
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
   *  Extract the graph nodes, from the string representation of the graph(s).
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
}


//  Some use-case development / test scenarions, for checking the solution

console.log('should pass | yield "true" - ', checkGraph(testInput_one));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_two));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_three));
console.log('should pass | yield "true" - ', checkGraph(testInput_four));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_five));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_six));