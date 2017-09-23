const Plan = require('./plan');
const Table = require('./table');

function FQL(table) {
  this.table = table;
  this.plan = new Plan();
}
// expect(Plan.prototype.withinLimit).to.have.been.called();
// expect(result).to.eql([
//   { id: '0000', name: 'Aliens', year: 1986, rank: 8.2 },
//   { id: '0001', name: 'Animal House', year: 1978, rank: 7.5 },
//   { id: '0002', name: 'Apollo 13', year: 1995, rank: 7.5 },
//   { id: '0003', name: 'Batman Begins', year: 2005, rank: null }
// ]);
FQL.prototype.get = function() {

  const fns = this.table.getRowIds();
  const result = [];

  let i = 0;
  if (!this.plan.limit) {
    return fns.map(fn => this.table.read(fn));
  }
  while (this.plan.withinLimit(result) && i < this.plan.limit) {

    result.push(this.table.read(fns[i++]));
  }

  return result;
}

FQL.prototype.count = function() {
  return this.table.getRowIds()
    .map(fn => this.table.read(fn))
    .length;
}

FQL.prototype.limit = function(limit) {
  this.plan.setLimit(limit);
  return this;
}

module.exports = FQL;
