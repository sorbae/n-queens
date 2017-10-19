// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
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
    hasRowConflictAt: function(rowIndex) {
      // get row by rowIndex
      //   reduce items in rowIndex
      //     evaluate to a sum
      //   if evaluated sum is greater than 1
      //     return true
      //   otherwise return false

      let row = this.get(rowIndex);
      let rowSum = row.reduce(function(acc, num) {
        return acc + num;
      }, 0);
      return rowSum > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // grab rows of matrix
      // iterate over each row
      //   call hasRowConflictAt on row
      //     if hasRowConflictAt returns true
      //       return true
      //     else false

      let rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    columns: function() {
      //Create array to store columns
      //Store rows in variable
      //Define dimensions
        //Fill columns array width based on dims
      //Loop over each row (for var loop)
        //Loop over each item in row
          //Push item of result's i index into column index
      //Return columns

      let rows = this.rows();
      let results = [];
      rows.forEach(function(row) {
        results.push([]);
      });

      let cols = results;
      for (let row of rows) {
        for (let i = 0; i < row.length; i++) {
          cols[i].push(row[i]);
        }
      }
      return cols;
    },

    getColumn: function(index) {
      return this.columns()[index]; 
    },

    hasColConflictAt: function(colIndex) {
      let column = this.getColumn(colIndex);
      let columnSum = column.reduce(function(acc, num) {
        return acc + num;
      }, 0);
      return columnSum > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let columns = this.columns();
      for (let i = 0; i < columns.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { 
      //Slice n values for a given row
      //Do this through all rows
      //If arg < 0,
        //Slice (0, n)
      //Else do below slicing
      console.log(this.get(majorDiagonalColumnIndexAtFirstRow))
      let rows = this.rows();
      let newMatrix = [];
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        newMatrix = rows.slice(Math.abs(majorDiagonalColumnIndexAtFirstRow));
      } else if (majorDiagonalColumnIndexAtFirstRow > 0) {
        rows.forEach(function(row){
          newMatrix.push(row.slice(majorDiagonalColumnIndexAtFirstRow));  
        }); 
      } else {
        newMatrix = rows;
      }

      let diagonals = [];
      newMatrix.forEach(function(row, index1) {
        row.forEach(function(item, index2) {
          if (index1 === index2) {
            diagonals.push(item);    
          }
        });
      });

      let diagonalsSum = diagonals.reduce(function(acc, num) {
        return acc + num;
      }, 0);
      return diagonalsSum > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let range = this.rows().length;
      for (let i = -range + 1; i < range; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------                              End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
