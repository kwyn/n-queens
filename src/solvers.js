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
   //fixme
  var board = new Board({n : n});
  var available = [];

  var previousMove = [[0,0]]
  var possibleMoves = [];

  var makePossibleMove = function(count, possibleMoves, solutions){
    solutions = solutions || [] ;
    if(count){
      for(var i = 0; i < n; i++){
        for(var j = 0; j < n; j++){
          //check if it is a previous move
          //debugger;
          if( !board.get(i)[j] ){
            board.togglePiece(i,j);
            if( !board.hasAnyRooksConflicts() ){
              //possibleMoves.push( [i,j] );
              if(count){
                console.log(count);
                count--;
                console.log(count);
                return solutions.concat(makePossibleMove(count, possibleMoves, solutions) );
              }
            }
            board.togglePiece(i,j);
          }
        } 
      }
    }else{
      console.log(board.rows());
      return board.rows();  
    }
  };
  
  solution = makePossibleMove(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;

  // var togglePrev = function(previousMoves){
  //   _.each(previousMoves, function(move){
  //     //arr has row and column values;
  //     board.togglePiece(move[0], move[1]);
  //   });
  // }

  // var findPossible = function(previousMoves){
  //   var posisbleMoves = [];
  //   togglePrev(PreviousMoves);
  //   _.each(board.rows() , function(row, rowIndex){
  //     _.each(row, function(colIndex){
        
  //       if( !board.get(rowIndex)[colIndex] ){
  //         board.togglePiece(rowIndex, colIndex);
          
  //         if( !board.hasAnyRooksConflicts() ){
  //           possibleMoves.push( [i,j] );
  //         }
          
  //         board.togglePiece(rowIndex, colIndex);
  //       }

  //     });
  //   });
  //   return possibleMoves;
  // };

  // var makePossibleMove = function(previousMoves, count){
  //   var previousMoves = previousMoves || [];
  //   var possibleMoves = findPossible(previousMoves);
  //   if(!count){
  //   _.each(possibleMoves, function(move){
  //     board.togglePiece(move[0], move[1]);
  //     previousMoves.push(); 
  //   });
  //   makePossibleMove(possibleMoves, previousMoves, count--);
  //   }
  //   return board.rows();
  // }
  
  //gets possible next moves 
  //Given a board that has the previous move toggled
  
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
