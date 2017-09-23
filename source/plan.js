function Plan () {

}

Plan.prototype.setLimit = function(limit) {
  this.limit = limit;
}

Plan.prototype.withinLimit = function(arr) {
  if (!this.limit) {
    return true;
  }
  console.log(this.limit);
  return arr.length < this.limit;
}

module.exports = Plan;
