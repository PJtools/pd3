import * as d3 from 'd3'

const spread = (id, data, opts) => {
  // 定义默认五色颜色组
  const color = ['#f75a53', '#faa701', '#f6dc00', '#67ddab', '#1f9ded'];
  const pieColor = [
    ['#f75a53', '#f75a53', '#fdf2f1', '#fbd3d1', '#f9a9a3', '#ed6e63', '#f15443', '#dd3923'],
    ['#faa701', '#faa701', '#f9f0de', '#fae5bd', '#f5d188', '#edba4b', '#e1a82d', '#c88e18'],
    ['#f6dc00', '#f6dc00', '#faf7e0', '#fcf3b2', '#f1e379', '#e9da5a', '#d4c441', '#a99a1c'],
    ['#67ddab', '#67ddab', '#e2f9e5', '#bcebc4', '#6ce185', '#80d390', '#0ec44f', '#00a636'],
    ['#1f9ded', '#1f9ded', '#ceecee', '#a7e0e2', '#7fcfe3', '#02b2e6', '#009eec', '#0481c2']
  ];

  // 初始化输入传值参数设定
  const option = {
    strength: opts && opts.strength !== undefined ? opts.strength : 55, // 力导向--斥力
    radius: opts && opts.radius !== undefined ? opts.radius : 45, // 力导向--圆形排列半径
    distance: opts && opts.distance !== undefined ? opts.distance : 70 // 力导向--连线长度距离
  };
  if(opts && opts.drag !== undefined) { option.drag = true; } // 是否允许节点进行拖拽
  else { option.drag = false; }
  if(opts && opts.click !== undefined) { option.click=opts.click; } // 回调节点单击事件

  // 定义私有成员、属性及函数方法
  let pvt = {};

  // 递归循环，将外部数据结构转化关系结构数据
  pvt.graphMap = (array) => {
    let graphGroup = 0, graph = [], nodes = [], links = [];
    let xfun = (arr, xlevel, pid) => {
      for(let item of arr) {
        let deep = xlevel !== undefined ? (xlevel + 1) : 0;
        nodes.push({
          id: item.id,
          group: graphGroup,
          name: item.name,
          level: deep,
          value: item.value !== undefined ? item.value : 0
        });
        // 构建Line连线关系
        if(pid !== undefined) {
          links.push({
            target: pid,
            source: item.id,
            group: graphGroup
          });
        }
        if(item.children && item.children.length > 0) {
          xfun(item.children, deep, item.id);
        }
        if(xlevel === undefined) {
          graphGroup++;
          graph.push({ nodes: nodes, links: links });
          nodes = []; links = [];
        }
      }
    };
    xfun(array);
    return graph;
  };

  // 创建d3画布
  pvt.createSvg = () => {
    // 创建d3适配svg画布
    let svgContainer = document.getElementById(id);
    let width = svgContainer.clientWidth;
    let height = svgContainer.clientHeight;
    d3.select('#' + id).append('svg').attr('width', width).attr('height', height);
    return d3.select('#' + id + ' > svg');
  };

  // 绘制'散点力导向'画布元素
  pvt.drawSpreadForce = () => {
    const svg = pvt.createSvg();
    const graph = pvt.graphMap(data);
    let width = svg.attr('width');
    let height = svg.attr('height');

    if(graph && graph.length > 0) {
      // 创建主分组对象
      let force = svg.selectAll('g.force')
        .data(graph).enter()
        .append('g').attr('class', 'force');

      // 创建节点间连接线
      let link = force.append('g').attr('class', 'links')
        .selectAll('g.links > line')
        .data(function (d) { return d.links }).enter()
        .append('line')
        .attr('stroke', function (d) { return d.group > 4 ? color[4] : color[d.group]; })
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5);

      // 创建主节点
      let node = force.append('g').attr('class', 'nodes')
        .selectAll('g.nodes g.cirque')
        .data(function(d){
          let xNodes = [];
          for(let item of d.nodes) {
            if(item.level == 0) {
              xNodes.push(item);
              break;
            }
          }
          return xNodes;
        }).enter();
      // 外圈圆环
      node.append('g').attr('class', 'cirque')
        .style('cursor', function (d) {
          if(option.click) { return 'pointer'; }
          else { return 'default'; }
        })
        .append('circle').attr('class', 'out-circle')
        .attr('r', function (d) {
          let _group = d.group;
          if(d.group > 4) { _group = 4; }
          return 53 - _group * 5;
        })
        .attr('stroke', function (d) { return d.group > 4 ? color[4] : color[d.group]; })
        .attr('stroke-width', 1)
        .attr('fill', '#fff');
      // 内圈实心圆
      node.selectAll('g.cirque')
        .append('circle').attr('class', 'in-circle')
        .attr('r', function (d) {
          let _group = d.group;
          if(d.group > 4) { _group = 4; }
          return 50 - _group * 5;
        })
        .attr('fill', function (d) { return d.group > 4 ? color[4] : color[d.group]; })
        .attr('stroke-width', 0);
      // 文本文字
      node.selectAll('g.cirque')
        .append('text').text(function (d) { return d.name; })
        .attr('fill', '#fff')
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .style('font-family', 'SimHei')
        .style('font-size', function (d) {
          switch (d.group) {
            case 0: return 18; break;
            case 1: case 2: return 16; break;
            default: return 14; break;
          }
        })
        .style('font-weight', 'normal');
      // 内分段色圆环
      let arc = d3.arc().outerRadius(function (d) {
        return 50 - d.data.group * 5;
      }).innerRadius(function (d) {
        return 40 - d.data.group * 5 + d.data.group;
      });
      let pie = d3.pie().sort(null).value(function(d) { return d.percent; });
      node.selectAll('g.cirque')
        .append('g').attr('class', 'in-pie')
        .selectAll('g.in-pie g.pie-arc')
        .data(function (d) {
          let pdata = [];
          for(let i=0; i<8; i++) {
            let _group = d.group;
            d.group > 4 ? _group = 4 : _group = d.group;
            pdata.push({percent: 12.5, color: pieColor[_group][i], group: _group});
          }
          return pie(pdata);
        }).enter()
        .append('g').attr('class', 'pie-arc')
        .append('path').attr('d', arc)
        .attr('fill', function (d) { return d.data.color; });

      // 创建子节点
      let child = force.selectAll('g.nodes')
        .selectAll('g.child')
        .data(function(d){
          let cNodes = [];
          for(let item of d.nodes) {
            if(item.level != 0) {
              cNodes.push(item);
            }
          }
          return cNodes;
        }).enter()
        .append('g').attr('class', 'child')
        .style('cursor', function (d) {
          if(option.click) { return 'pointer'; }
          else { return 'default'; }
        });
      // 实心圆
      child.append('circle').attr('class', 'child-circle')
        .attr('r', 12)
        .attr('fill', function (d) { return d.group > 4 ? color[4] : color[d.group]; })
        .attr('stroke-width', 0);
      // 内圆弧
      let in_arc = d3.arc().outerRadius(16).innerRadius(15).startAngle(0).endAngle(Math.PI / 0.7);
      child.append('g').attr('class', 'in-ring')
        .append('path').attr('d', in_arc)
        .attr('fill', function (d) { return d.group > 4 ? color[4] : color[d.group]; });
      // 外圆弧
      let out_arc = d3.arc().outerRadius(19).innerRadius(18).startAngle(Math.PI).endAngle(Math.PI / 0.4);
      child.append('g').attr('class', 'out-ring')
        .append('path').attr('d', out_arc)
        .attr('fill', function (d) { return d.group > 4 ? color[4] : color[d.group]; });
      // 文本
      child.append('text').text(function (d) { return d.name; })
        .attr('fill', function (d) { return d.group > 4 ? color[4] : color[d.group]; })
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .attr('dy', 30)
        .style('font-family', 'Microsoft YaHei')
        .style('font-size', 14);

      // 创建力导向图布局
      let simulation = d3.forceSimulation();
      simulation.force('link', d3.forceLink()
        .id(function(d) { return d.id; }) // 设定唯一Id
        .distance(option.distance)); // 连线距离
      simulation.force('charge', d3.forceManyBody().strength(option.strength)); // 排斥力
      simulation.force('center', d3.forceCenter(width / 2, height / 2)); // 中心点
      simulation.force('collide',  d3.forceCollide().radius(option.radius));
      // 设定力导向连接坐标，建立连接关系
      let gline = [], gnode = [];
      for(let item of graph) {
        for(let link of item.links) { gline.push(link); }
        for(let node of item.nodes) { gnode.push(node); }
      }
      simulation.nodes(gnode).on("tick", function () {
        // 设定节点连接线的坐标点
        link
          .attr('x1', function (d) { return d.source.x; })
          .attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; })
          .attr('y2', function (d) { return d.target.y; });

        // 设定主节点的坐标点
        node.selectAll('g.cirque > circle.out-circle, ' +
          'g.cirque > circle.in-circle')
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
        node.selectAll('g.cirque > text')
          .attr('x', function (d) { return d.x; })
          .attr('y', function (d) { return d.y; });
        node.selectAll('g.cirque > g.in-pie')
          .attr('transform', function (d) { return 'translate(' + d.x + ', ' + d.y + ')' });

        // 设定子节点的坐标点
        child.selectAll('circle.child-circle')
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
        child.selectAll('g.in-ring, g.out-ring')
          .attr('transform', function (d) { return 'translate(' + d.x + ', ' + d.y + ')' });
        child.selectAll('text')
          .attr('x', function (d) { return d.x; })
          .attr('y', function (d) { return d.y; });
      });
      simulation.force("link").links(gline);

      // 设定对象进行动画-旋转
      let start = Date.now(), speed = 0.05;
      d3.interval(function() {
        let angle = (Date.now() - start) * speed;
        if(angle > 360) { angle = 360; start = Date.now(); }
        node.selectAll('g.cirque > g.in-pie > g').attr('transform', function (d) { return 'rotate(' + angle + ')'; });
        child.selectAll('g.in-ring > path').attr('transform', function (d) { return 'rotate(' + angle + ')'; });
        child.selectAll('g.out-ring > path').attr('transform', function (d) { return 'rotate(-' + angle + ')'; });
      }, 30);

      if(option.drag) {
        // 节点拖拽事件绑定
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        }
        function dragged(d) { d.fx = d3.event.x; d.fy = d3.event.y; }
        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }
        node.selectAll('g.cirque').call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
        child.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
      }

      if(option.click) {
        // 节点回调单击事件绑定
        node.selectAll('g.cirque').on('click', function (d) { option.click.call(this, d); });
        child.on('click', function (d) { option.click.call(this, d); })
      }
    }

    return {
      svg: svg,
      graph: graph
    }
  };

  // 初始化入口
  let result = pvt.drawSpreadForce();

  // 开放接口
  let pub = {};

  // 根据当前节点获取父节点
  pub.getParentNode = (d) => {
    let graph = result.graph;
    if(d.level == 0) { return d; }
    for(let node of graph[d.group].links) {
      if(d.id == node.source.id) {
        return node.target;
      }
    }
    return null;
  };

  // 根据当前节点获取顶级节点
  pub.getTopNode = (d) => {
    let graph = result.graph;
    if(d.level == 0) { return d; }
    else { return graph[d.group].links[0].target; }
  };

  // 根据索引值获取当前分组颜色
  pub.getColorToGroup = (idx) => idx > 4 ? color[4] : color[idx];

  // 获取转化后的数据集合
  pub.getForceData = () => result !== undefined ? result.graph : null;

  return pub;
};

export default spread;
