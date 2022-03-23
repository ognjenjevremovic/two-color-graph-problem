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
 * @public
 * @todo    Implement the algorithm for checking if a graph is two (red-blue) colorable.
 * @param   {*} input 
 * @returns {boolean}
 */
function checkGraph(input) {
  //  TODO: Implementation details
  return false;
}


//  Some use-case development / test scenarions, for checking the solution

console.log('should pass | yield "true" - ', checkGraph(testInput_one));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_two));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_three));
console.log('should pass | yield "true" - ', checkGraph(testInput_four));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_five));
console.log('should NOT pass | yield "false" - ', checkGraph(testInput_six));