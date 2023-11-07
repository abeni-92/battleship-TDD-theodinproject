
const SIZE = 10;

class Ship {
	constructor(length, name) {
	  this.name = name;
	  this.length = length;
	  this.hits = [];
	}
  
	hit (x, y) {
	  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || this.hits.includes([x, y])) return false
	  this.hits.push([x, y]);
	  return true
	}
  
	isSunk () {
	  return this.hits.length === this.length;
	}
  }

  // browser env't
export default Ship 

// node env't
// module.exports = Ship
