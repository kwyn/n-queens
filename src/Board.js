// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    // columns: function(){
    //   return _(_.range(this.get('n'))).map(function(colIndex){
    //       _.each(this.rows(), function(row){
    //         row[colIndex];
    //       }, this);
    //     }, this);
    // },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // 
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex){

      var row = this.get(rowIndex);
      var found = false;
      for(var i = 0; i < row.length; i++){
        if(row[i] && found){
          return true;
        }
        if(row[i]){
          found = true;
        } 
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(){
      var size = this.get('n');
      for(var i = 0; i < size; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // 
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex){
      var col = this.getCol(colIndex);
      var found = false;
      for(var j = 0; j < col.length; j++){
        if(col[j] && found){
          return true;
        }
        if(col[j]){
          found = true;
        } 
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function(){
      var size = this.get('n');
      for(var j = 0; j < size; j++){        
        if(this.hasColConflictAt(j)){
          return true;
        }
      }        
      return false; // fixme
    },

    getCol: function(colIndex){
      var size = this.get('n');
      var col = [];
      for( var i = 0; i < size; i++){
        col.push(this.get(i)[colIndex]);
      }
      return col;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      if(majorDiagonalColumnIndexAtFirstRow>=0){
        return this.checkMajorDiag(0, majorDiagonalColumnIndexAtFirstRow);
      } else{
        return this.checkMajorDiag(-majorDiagonalColumnIndexAtFirstRow, 0);
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(){
      var n = this.get('n');
      var i = 0;
      var j = 0;
      for (i = 0; i < n - 1; i++){
        if(this.checkMajorDiag(i, j))
          return true;
      }
      i = 0;
      for(j = 1; j < n -1; j++){
        if(this.checkMajorDiag(i,j))
          return true;
      }
      return false;
    },
    
    getMajorDiag: function(i, j){
      var n = this.get('n');
      var diag = [];
      while(i < n && j < n){
        diag.push(this.get(i)[j]);
        i++;
        j++;
      }
      return diag;
    },

    checkMajorDiag: function(i, j){ //must start in upper left
      var n = this.get('n');
      var diag = [];
      var found = false;
      while(i < n && j < n){
        if(this.get(i)[j] && found){ //conflict found so return true
          return true;
        } 
        if(this.get(i)[j]){
          found = true;
        }
        i++;
        j++;
      }
      return false;
    },

    getMinorDiag: function(i, j){ //must start in upper right
      var n = this.get('n');
      var diag = [];
      //var found = false;
      while(i < n && j >= 0){
        diag.push(this.get(i)[j]);
        i++;
        j--;
      }
      return diag;
    },

    checkMinorDiag: function(i, j){ //must start in upper right
      var n = this.get('n');
      var diag = [];
      var found = false;
      while(i < n && j >= 0){
        if(this.get(i)[j] && found){ //conflict found so return true
          return true;
        } 
        if(this.get(i)[j]){
          found = true;
        }
        i++;
        j--;
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
    
    var n = this.get('n');
    if(minorDiagonalColumnIndexAtFirstRow <= n){
        return this.checkMinorDiag(0, minorDiagonalColumnIndexAtFirstRow);
      } else{
        return this.checkMinorDiag(minorDiagonalColumnIndexAtFirstRow - (n-1), n-1);
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function(){
      var n = this.get('n');
        var i = 0;
        var j = n - 1;
        //console.log(this.getMinorDiag(0,2));
        //debugger;
        for (i = 0; i < n - 1; i++){
          if(this.checkMinorDiag(i, j))
            return true;
        }
        i = 0;
        for(j = 1; j < n - 1; j++){
          if(this.checkMinorDiag(i,j))
            return true;
        }
      return false;
    }

    

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
