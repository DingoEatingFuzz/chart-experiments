var d3 = require('d3');

module.exports = function(svg) {
  d3.select(svg)
    .attr('width', 600)
    .attr('height', 300)
    .append('circle')
      .attr('cx', 300)
      .attr('cy', 150)
      .attr('r', 30)
      .attr('fill', '#26963c');

  return 'circle { fill: #F00; }';
};
