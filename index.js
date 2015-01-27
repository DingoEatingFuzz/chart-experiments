var jsdom = require('jsdom');
var fs = require('fs');
var gm = require('gm');
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
      svgPreamble,
      '<svg ' + svgAttrs.join(' ') + '>',
        '<defs>',
          '<style type="text/css"><![CDATA[',
            css,
          ']]></style>',
        '</defs>',
        '<svg>',
          el.innerHTML,
        '</svg>',
      '</svg>'
    ].join('\n');

    console.log(svg);
    svgStream.push(svg);
    svgStream.push(null);

    gm(svgStream, 'chart.svg')
      // .options({ imageMagick: true })
      .write('chart.png', function(pngErr) {
        process.exit();
      });
  }
});
