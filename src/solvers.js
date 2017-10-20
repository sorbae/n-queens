/*        ;   _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  var rows = solution.rows();

  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (var colIndex = 0; colIndex < rows.length; colIndex++) {
      solution.togglePiece(rowIndex, colIndex);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(rowIndex, colIndex);
      }
    }
  }
  var solution = Object.values(solution.attributes);
  solution.pop();
  return solution;

  // create new board with n
  // iterate through the board rows
  //   iterate through columns for row & column index
  //     togglePiece(row, column index)
  //     check if conflict exists
  //       if it does --> toggle piece again

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return;
  }
  if (n === 1) {
    return 1;
  }
  return n * countNRooksSolutions(n - 1);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var rows = solution.rows();
  var result = [];



  return solution;
  //Iterate through first row
    //Create rowToggled flag
      //Toggle value at row's column index
        //Check if there's a queens conflict
          //If so untoggle value, and iterate to next row's column index
          //If we reach end of row, and rowToggled flag is false
            //Iterate to next column value
          //Otherwise iterate through next row



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
