var jsdom = require('jsdom');
var fs = require('fs');
var gm = require('gm');
var juice = require('juice2');
var Readable = require('stream').Readable;

var chart = require('./bar-chart');
var svgStream = new Readable;

var svgPreamble = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

jsdom.env({
  html: '<html><svg/></html>',
  done: function(err, window) {
    var el = window.document.getElementsByTagName('svg')[0];
    var css = chart(el, window) || '';

    var svgAttrs = Array.prototype.slice.call(el.attributes).map(function(attr) {
      return attr.nodeName + '="' + attr.nodeValue + '"';
    });
    svgAttrs.push('xmlns="http://www.w3.org/2000/svg"');
    svgAttrs.push('version="1.1"');

    var svg = [
      '<svg ' + svgAttrs.join(' ') + '>',
        el.innerHTML,
      '</svg>'
    ].join('\n');

    svg = svgPreamble + '\n' + juice.inlineContent(svg, css).replace(/<\/?(html|body)>/g, '');
    svg = svg.trim();

    console.log(svg);
    svgStream.push(svg);
    svgStream.push(null);

    gm(svgStream, 'chart.svg')
      .options({ imageMagick: true })
      .write('chart.png', function(pngErr) {
        // console.log(pngErr ? 'oops: ' + pngErr : 'done');
        process.exit();
      });
  }
});
