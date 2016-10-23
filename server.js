var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
angular
.module('app', ['ngAnimate'])
.controller('ctrl', ctrl)
.controller('gridCtrl', gridCtrl)
.directive('grid', grid)
.directive('item', item);

function ctrl () {
  this.items = generateArray(15);
  this.shown = true;
  this.add   = function () { this.items.push({}); };
  this.sub   = function () { this.items.pop(); };
  
  function generateArray (count) {
    var arr = [];
    while (count--) arr.push({});
    return arr;
  }
}

function gridCtrl () {
  var queue = [];

  this.scope = null;
  this.element = null;

  this.init = function (scope, element) {
    this.scope = scope;
    this.element = element;
    //-- process queue
    while (queue.length) queue.pop()();
  };

  this.ready = function (callback) {
    if (this.scope) callback()
    else queue.push(callback);
  };

  this.setDelay = function (item) {
    var left  = item.prop('offsetLeft') - this.element.prop('offsetLeft'),
        top   = item.prop('offsetTop')  - this.element.prop('offsetTop'),
        dist  = Math.sqrt(left * left + top * top),
        delay = dist * 0.75;
    item.css('transition-delay', delay + 'ms');
  };
}

function grid () {
  return {
    controller: 'gridCtrl',
    link: link
  };
  function link (scope, element, attr, ctrl) {
    ctrl.init(scope, element);
  }
}

function item ($timeout, $window) {
  return {
    require: '^grid',
    link: link
  };
  function link (scope, element, attr, ctrl) {
    ctrl.ready(function () {
      ctrl.setDelay(element);
      angular.element($window).on('resize', handleResize);
      function handleResize () {
        $timeout(ctrl.setDelay.bind(ctrl, element), 0, false);
      }
      element.on('$destroy', function () {
        element.off('resize', handleResize);
      });
    });
  }
}
