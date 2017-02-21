(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3")) : factory(root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_56__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _force = __webpack_require__(1);
	
	var force = _interopRequireWildcard(_force);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var pd3 = {};
	
	// 设定pd3命名空间名称，并集合打包导出对象
	pd3.force = force;
	
	exports.default = pd3;
	
	// 适配全局命名，当不适于模块开发时，亦可全局调用
	
	window.pd3 = window.pd3 || pd3;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _spreadForce = __webpack_require__(2);
	
	Object.defineProperty(exports, 'spread', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_spreadForce).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(3);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _d = __webpack_require__(56);
	
	var d3 = _interopRequireWildcard(_d);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var spread = function spread(id, data, opts) {
	  // 定义默认五色颜色组
	  var color = ['#f75a53', '#faa701', '#f6dc00', '#67ddab', '#1f9ded'];
	  var pieColor = [['#f75a53', '#f75a53', '#fdf2f1', '#fbd3d1', '#f9a9a3', '#ed6e63', '#f15443', '#dd3923'], ['#faa701', '#faa701', '#f9f0de', '#fae5bd', '#f5d188', '#edba4b', '#e1a82d', '#c88e18'], ['#f6dc00', '#f6dc00', '#faf7e0', '#fcf3b2', '#f1e379', '#e9da5a', '#d4c441', '#a99a1c'], ['#67ddab', '#67ddab', '#e2f9e5', '#bcebc4', '#6ce185', '#80d390', '#0ec44f', '#00a636'], ['#1f9ded', '#1f9ded', '#ceecee', '#a7e0e2', '#7fcfe3', '#02b2e6', '#009eec', '#0481c2']];
	
	  // 初始化输入传值参数设定
	  var option = {
	    strength: opts && opts.strength !== undefined ? opts.strength : 55, // 力导向--斥力
	    radius: opts && opts.radius !== undefined ? opts.radius : 45, // 力导向--圆形排列半径
	    distance: opts && opts.distance !== undefined ? opts.distance : 70 // 力导向--连线长度距离
	  };
	  if (opts && opts.drag === true) {
	    option.drag = true;
	  } // 是否允许节点进行拖拽
	  else {
	      option.drag = false;
	    }
	  if (opts && opts.click !== undefined) {
	    option.click = opts.click;
	  } // 回调节点单击事件
	
	  // 定义私有成员、属性及函数方法
	  var pvt = {};
	
	  // 递归循环，将外部数据结构转化关系结构数据
	  pvt.graphMap = function (array) {
	    var graphGroup = 0,
	        graph = [],
	        nodes = [],
	        links = [];
	    var xfun = function xfun(arr, xlevel, pid) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var item = _step.value;
	
	          var deep = xlevel !== undefined ? xlevel + 1 : 0;
	          nodes.push({
	            id: item.id,
	            group: graphGroup,
	            name: item.name,
	            level: deep,
	            value: item.value !== undefined ? item.value : 0
	          });
	          // 构建Line连线关系
	          if (pid !== undefined) {
	            links.push({
	              target: pid,
	              source: item.id,
	              group: graphGroup
	            });
	          }
	          if (item.children && item.children.length > 0) {
	            xfun(item.children, deep, item.id);
	          }
	          if (xlevel === undefined) {
	            graphGroup++;
	            graph.push({ nodes: nodes, links: links });
	            nodes = [];links = [];
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };
	    xfun(array);
	    return graph;
	  };
	
	  // 创建d3画布
	  pvt.createSvg = function () {
	    // 创建d3适配svg画布
	    var svgContainer = document.getElementById(id);
	    var width = svgContainer.clientWidth;
	    var height = svgContainer.clientHeight;
	    d3.select('#' + id).append('svg').attr('width', width).attr('height', height);
	    return d3.select('#' + id + ' > svg');
	  };
	
	  // 绘制'散点力导向'画布元素
	  pvt.drawSpreadForce = function () {
	    var svg = pvt.createSvg();
	    var graph = pvt.graphMap(data);
	    var width = svg.attr('width');
	    var height = svg.attr('height');
	
	    if (graph && graph.length > 0) {
	      // 创建主分组对象
	      var force = svg.selectAll('g.force').data(graph).enter().append('g').attr('class', 'force');
	
	      // 创建节点间连接线
	      var link = force.append('g').attr('class', 'links').selectAll('g.links > line').data(function (d) {
	        return d.links;
	      }).enter().append('line').attr('stroke', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      }).attr('stroke-opacity', 0.4).attr('stroke-width', 1.5);
	
	      // 创建主节点
	      var node = force.append('g').attr('class', 'nodes').selectAll('g.nodes g.cirque').data(function (d) {
	        var xNodes = [];
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = (0, _getIterator3.default)(d.nodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var item = _step2.value;
	
	            if (item.level == 0) {
	              xNodes.push(item);
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	
	        return xNodes;
	      }).enter();
	      // 外圈圆环
	      node.append('g').attr('class', 'cirque').style('cursor', function (d) {
	        if (option.click) {
	          return 'pointer';
	        } else {
	          return 'default';
	        }
	      }).append('circle').attr('class', 'out-circle').attr('r', function (d) {
	        var _group = d.group;
	        if (d.group > 4) {
	          _group = 4;
	        }
	        return 53 - _group * 5;
	      }).attr('stroke', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      }).attr('stroke-width', 1).attr('fill', '#fff');
	      // 内圈实心圆
	      node.selectAll('g.cirque').append('circle').attr('class', 'in-circle').attr('r', function (d) {
	        var _group = d.group;
	        if (d.group > 4) {
	          _group = 4;
	        }
	        return 50 - _group * 5;
	      }).attr('fill', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      }).attr('stroke-width', 0);
	      // 文本文字
	      node.selectAll('g.cirque').append('text').text(function (d) {
	        return d.name;
	      }).attr('fill', '#fff').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').style('font-family', 'SimHei').style('font-size', function (d) {
	        switch (d.group) {
	          case 0:
	            return 18;break;
	          case 1:case 2:
	            return 16;break;
	          default:
	            return 14;break;
	        }
	      }).style('font-weight', 'normal');
	      // 内分段色圆环
	      var arc = d3.arc().outerRadius(function (d) {
	        return 50 - d.data.group * 5;
	      }).innerRadius(function (d) {
	        return 40 - d.data.group * 5 + d.data.group;
	      });
	      var pie = d3.pie().sort(null).value(function (d) {
	        return d.percent;
	      });
	      node.selectAll('g.cirque').append('g').attr('class', 'in-pie').selectAll('g.in-pie g.pie-arc').data(function (d) {
	        var pdata = [];
	        for (var i = 0; i < 8; i++) {
	          var _group = d.group;
	          d.group > 4 ? _group = 4 : _group = d.group;
	          pdata.push({ percent: 12.5, color: pieColor[_group][i], group: _group });
	        }
	        return pie(pdata);
	      }).enter().append('g').attr('class', 'pie-arc').append('path').attr('d', arc).attr('fill', function (d) {
	        return d.data.color;
	      });
	
	      // 创建子节点
	      var child = force.selectAll('g.nodes').selectAll('g.child').data(function (d) {
	        var cNodes = [];
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;
	
	        try {
	          for (var _iterator3 = (0, _getIterator3.default)(d.nodes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;
	
	            if (item.level != 0) {
	              cNodes.push(item);
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	
	        return cNodes;
	      }).enter().append('g').attr('class', 'child').style('cursor', function (d) {
	        if (option.click) {
	          return 'pointer';
	        } else {
	          return 'default';
	        }
	      });
	      // 实心圆
	      child.append('circle').attr('class', 'child-circle').attr('r', 12).attr('fill', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      }).attr('stroke-width', 0);
	      // 内圆弧
	      var in_arc = d3.arc().outerRadius(16).innerRadius(15).startAngle(0).endAngle(Math.PI / 0.7);
	      child.append('g').attr('class', 'in-ring').append('path').attr('d', in_arc).attr('fill', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      });
	      // 外圆弧
	      var out_arc = d3.arc().outerRadius(19).innerRadius(18).startAngle(Math.PI).endAngle(Math.PI / 0.4);
	      child.append('g').attr('class', 'out-ring').append('path').attr('d', out_arc).attr('fill', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      });
	      // 文本
	      child.append('text').text(function (d) {
	        return d.name;
	      }).attr('fill', function (d) {
	        return d.group > 4 ? color[4] : color[d.group];
	      }).attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('dy', 30).style('font-family', 'Microsoft YaHei').style('font-size', 14);
	
	      // 创建力导向图布局
	      var simulation = d3.forceSimulation();
	      simulation.force('link', d3.forceLink().id(function (d) {
	        return d.id;
	      }) // 设定唯一Id
	      .distance(option.distance)); // 连线距离
	      simulation.force('charge', d3.forceManyBody().strength(option.strength)); // 排斥力
	      simulation.force('center', d3.forceCenter(width / 2, height / 2)); // 中心点
	      simulation.force('collide', d3.forceCollide().radius(option.radius));
	      // 设定力导向连接坐标，建立连接关系
	      var gline = [],
	          gnode = [];
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = (0, _getIterator3.default)(graph), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var item = _step4.value;
	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;
	
	          try {
	            for (var _iterator5 = (0, _getIterator3.default)(item.links), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var _link = _step5.value;
	              gline.push(_link);
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }
	
	          var _iteratorNormalCompletion6 = true;
	          var _didIteratorError6 = false;
	          var _iteratorError6 = undefined;
	
	          try {
	            for (var _iterator6 = (0, _getIterator3.default)(item.nodes), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	              var _node = _step6.value;
	              gnode.push(_node);
	            }
	          } catch (err) {
	            _didIteratorError6 = true;
	            _iteratorError6 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	              }
	            } finally {
	              if (_didIteratorError6) {
	                throw _iteratorError6;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	
	      simulation.nodes(gnode).on("tick", function () {
	        // 设定节点连接线的坐标点
	        link.attr('x1', function (d) {
	          return d.source.x;
	        }).attr('y1', function (d) {
	          return d.source.y;
	        }).attr('x2', function (d) {
	          return d.target.x;
	        }).attr('y2', function (d) {
	          return d.target.y;
	        });
	
	        // 设定主节点的坐标点
	        node.selectAll('g.cirque > circle.out-circle, ' + 'g.cirque > circle.in-circle').attr('cx', function (d) {
	          return d.x;
	        }).attr('cy', function (d) {
	          return d.y;
	        });
	        node.selectAll('g.cirque > text').attr('x', function (d) {
	          return d.x;
	        }).attr('y', function (d) {
	          return d.y;
	        });
	        node.selectAll('g.cirque > g.in-pie').attr('transform', function (d) {
	          return 'translate(' + d.x + ', ' + d.y + ')';
	        });
	
	        // 设定子节点的坐标点
	        child.selectAll('circle.child-circle').attr('cx', function (d) {
	          return d.x;
	        }).attr('cy', function (d) {
	          return d.y;
	        });
	        child.selectAll('g.in-ring, g.out-ring').attr('transform', function (d) {
	          return 'translate(' + d.x + ', ' + d.y + ')';
	        });
	        child.selectAll('text').attr('x', function (d) {
	          return d.x;
	        }).attr('y', function (d) {
	          return d.y;
	        });
	      });
	      simulation.force("link").links(gline);
	
	      // 设定对象进行动画-旋转
	      var start = Date.now(),
	          speed = 0.05;
	      d3.interval(function () {
	        var angle = (Date.now() - start) * speed;
	        if (angle > 360) {
	          angle = 360;start = Date.now();
	        }
	        node.selectAll('g.cirque > g.in-pie > g').attr('transform', function (d) {
	          return 'rotate(' + angle + ')';
	        });
	        child.selectAll('g.in-ring > path').attr('transform', function (d) {
	          return 'rotate(' + angle + ')';
	        });
	        child.selectAll('g.out-ring > path').attr('transform', function (d) {
	          return 'rotate(-' + angle + ')';
	        });
	      }, 30);
	
	      if (option.drag) {
	        // 节点拖拽事件绑定
	        var dragstarted = function dragstarted(d) {
	          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	          d.fx = d.x;d.fy = d.y;
	        };
	
	        var dragged = function dragged(d) {
	          d.fx = d3.event.x;d.fy = d3.event.y;
	        };
	
	        var dragended = function dragended(d) {
	          if (!d3.event.active) simulation.alphaTarget(0);
	          d.fx = null;d.fy = null;
	        };
	
	        node.selectAll('g.cirque').call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
	        child.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
	        // 当拖拽开放时，同时增加zoom事件
	        svg.call(d3.zoom().on('zoom', function () {
	          svg.selectAll('g.force').attr('transform', 'translate(' + d3.event.transform.x + ', ' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
	        }));
	      }
	
	      if (option.click) {
	        // 节点回调单击事件绑定
	        node.selectAll('g.cirque').on('click', function (d) {
	          option.click.call(this, d);
	        });
	        child.on('click', function (d) {
	          option.click.call(this, d);
	        });
	      }
	    }
	
	    return {
	      svg: svg,
	      graph: graph
	    };
	  };
	
	  // 初始化入口
	  var result = pvt.drawSpreadForce();
	
	  // 开放接口
	  var pub = {};
	
	  // 根据当前节点获取父节点
	  pub.getParentNode = function (d) {
	    var graph = result.graph;
	    if (d.level == 0) {
	      return d;
	    }
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;
	
	    try {
	      for (var _iterator7 = (0, _getIterator3.default)(graph[d.group].links), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var node = _step7.value;
	
	        if (d.id == node.source.id) {
	          return node.target;
	        }
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }
	
	    return null;
	  };
	
	  // 根据当前节点获取顶级节点
	  pub.getTopNode = function (d) {
	    var graph = result.graph;
	    if (d.level == 0) {
	      return d;
	    } else {
	      return graph[d.group].links[0].target;
	    }
	  };
	
	  // 根据索引值获取当前分组颜色
	  pub.getColorToGroup = function (idx) {
	    return idx > 4 ? color[4] : color[idx];
	  };
	
	  // 获取转化后的数据集合
	  pub.getForceData = function () {
	    return result !== undefined ? result.graph : null;
	  };
	
	  return pub;
	};
	
	exports.default = spread;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(51);
	module.exports = __webpack_require__(53);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	var global        = __webpack_require__(17)
	  , hide          = __webpack_require__(21)
	  , Iterators     = __webpack_require__(9)
	  , TO_STRING_TAG = __webpack_require__(48)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(7)
	  , step             = __webpack_require__(8)
	  , Iterators        = __webpack_require__(9)
	  , toIObject        = __webpack_require__(10);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(14)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(11)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(12);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(15)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(9)
	  , $iterCreate    = __webpack_require__(33)
	  , setToStringTag = __webpack_require__(47)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(48)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(34)
	  , descriptor     = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(47)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(48)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(23)
	  , dPs         = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(28)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(22)
	  , anObject = __webpack_require__(23)
	  , getKeys  = __webpack_require__(36);
	
	module.exports = __webpack_require__(26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(45);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(10)
	  , arrayIndexOf = __webpack_require__(38)(false)
	  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(10)
	  , toLength  = __webpack_require__(39)
	  , toIndex   = __webpack_require__(41);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(40)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(43)('keys')
	  , uid    = __webpack_require__(44);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(17)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(48)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(43)('wks')
	  , uid        = __webpack_require__(44)
	  , Symbol     = __webpack_require__(17).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(52)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(14)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(23)
	  , get      = __webpack_require__(54);
	module.exports = __webpack_require__(18).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(9);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(12)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_56__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pd3.js.map