/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = undefined; //fixme
  //var window.solutions;

  //var board = new Board({ n : n});
  //board.set(0)[0] = 1;
/// var board = new Board([[1,0,0],[0,1,0],[0,0,1]])
  //generate all initial positions.
  var obj = {};
  for(var i = 0; i < n; i++){
    for(var j = 0; j < n; j++){
      var board = new Board({n : n});
      board.togglePiece(i,j);
      //debugger;
      obj[board.rows()]=board;
    }
  }
  //debugger;
  window.genBoards(obj, n);

  solution = board;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.genBoards = function(obj , n){
var newBoards = {};
//debugger;
for(var key in obj){
  var board = obj[key];
  for(var i = 0; i < n ; i++){
    for(var j = 0; j < n; j++){
      if( !board.get(i)[j] ){
        board.togglePiece(i,j);
        //debugger;
        if( !board.hasAnyRooksConflicts() ){
          //may memory leak board so that it is not constant
          newBoards[board.rows()] = board;
        }
        board.togglePiece(i,j);
        debugger;
      }
    }
  }
}

},



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
