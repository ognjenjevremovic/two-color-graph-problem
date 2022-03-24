/**
 * @author  Ognjen Jevremovic<jevremovic.ognjen@gmail.com>
 * @date    23/03/2022
 * 
 * UI wrapper for running the platform agnostic algorithm
 * for checking if a graph is a connected, red-blue colorable graph.
 */

//  Wrap everything in an IFFE (for automatic execution, once script is parsed)
//  and do not allow any of the variables to leak into the global scope.
(async function () {
  'use strict';

  /**
   * @callback  debounceCallback
   * @param {*[]} args - callback function arguments list
   */

  //  Dynamically import the module, in order to have it scoped inside of an IFFE.
  const { checkIfGraphIsTwoColored } = await import('./two-colored-graph.js');

  /**
   * @type {HTMLInputElement} - Text input field
   */
  const inputElement$ = document.querySelector('.graph-input');
  /**
   * @type {HTMLDivElement} - DOM Element, used as a wrapper for the solution (dynamically inserted) DOM node
   */
  const solution$ = document.querySelector('.solution');
  /**
   * @type {HTMLTemplateElement} - Template element, used for dynamic rendering of the content
   */
  const solutionTemplate$ = document.querySelector('.solution-template');

  /**
   * @type {function} - run the 'checkIfGraphIsTwoColored' algorithm solution and update UI
   */
  const updateUiWithAlgorithmSolution_debounced = debounce(function (input) {
    //  Early exit, if the input is 'empty'
    if (!input.trim()) {
      return;
    }

    /**
     * @type {Node} - deep copy the DOM node
     */
    const solutionOutput$ = solutionTemplate$.content.cloneNode(true);
    /**
     * @type {boolean} - solution for the given graph, using the provided algorithm
     */
    let isTwoColoredGraph

    try {
      //  Run the algorithm
      isTwoColoredGraph = checkIfGraphIsTwoColored(input);
    } catch (err) {
      return;
    }

    //  Update the UI accordingly
    solutionOutput$.querySelector('.input-graph').textContent = input;
    solutionOutput$.querySelector('.is-colorable-graph').textContent = `IS ${!isTwoColoredGraph ? ' NOT' : ''}`;
    solution$.appendChild(solutionOutput$);
  });

  //  Input element event handler, for the 'input' event.
  //  Runs the algorithm and updates the UI based on the solution yielded.
  inputElement$.addEventListener('input', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    //  Clear the solution wrapper, from the previous run
    //  as the debounced solution takes 1s to update the UI. 
    solution$.innerHTML = '';

    //  Run the algorithm (debounced) and update UI
    updateUiWithAlgorithmSolution_debounced(evt.target.value);
  })


  /**
   * @description
   *  Delays the execution of the function (by putting it on the queue).
   * 
   * @param   {debounceCallback}  func - callback function to be executed, after the timeout
   * @param   {number}            timeout - specify the time, after which the callback function is executed 
   * @returns {function}
   */
  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}())

