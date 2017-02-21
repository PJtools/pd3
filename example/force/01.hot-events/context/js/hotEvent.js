var json = [
  {id: 0, name: '长江新城', context: '规划建设“长江新城”，以超前理念、世界眼光，打造代表城市发展最高成就的展示区、全球未来城市的样板区', value: 10, children: [
    { id: 1, name: '一锤定音' },
    { id: 2, name: '谌家讥' },
    { id: 3, name: '长江主轴' },
    { id: 4, name: '落址' },
    { id: 5, name: '滨江' }
  ]},
  {id: 6, name: '中山大道', context: '百年老街中山大道年底回归，恢复历史风貌延续城市文脉留住武汉之根', value: 10, children: [
    { id: 7, name: '6号线' },
    { id: 8, name: '开街' },
    { id: 9, name: '汉口老街' },
    { id: 10, name: '百年' },
    { id: 11, name: '夜景' }
  ]},
  {id: 12, name: 'BRT', context: '雄楚大道BRT开通首日，非BRT车道严重拥堵', value: 10, children: [
    { id: 13, name: '电动车' },
    { id: 14, name: '专用车辆' },
    { id: 15, name: '拥堵' },
    { id: 16, name: '绿衣侠' },
    { id: 17, name: '公交集团' },
    { id: 18, name: '人性化' }
  ]},
  {id: 19, name: '武汉姑娘', context: '武汉姑娘马来西亚沉船遇难', value: 10, children: [
    { id: 20, name: '马来西亚' },
    { id: 21, name: '沉船' },
    { id: 22, name: '遇难' },
    { id: 23, name: '救生衣' },
    { id: 24, name: '翻沉' },
    { id: 25, name: '非法载客' }
  ]},
  {id: 26, name: 'ETC', context: '武汉“六桥一隧”ETC收费，规章涉嫌违反上位法', value: 10, children: [
    { id: 27, name: '锁车' },
    { id: 28, name: '央视曝光' },
    { id: 29, name: '违法' },
    { id: 30, name: '罚款' }
  ]}
  // ,{id: 31, name: '测试1', context: '', value: 10, children: [
  //   { id: 32, name: '测试a' },
  //   { id: 33, name: '测试b' },
  //   { id: 34, name: '测试c' },
  //   { id: 35, name: '测试d' }
  // ]}
];

window.onload = function () {
  // 构建绘制力导向图
  var force = pd3.force.spread('crtbox', json);
  // 构建左侧数据列表
  loadLeftList(json, force);
};

// 根据数据，加载左侧数据列表
var loadLeftList = function (data, force) {
  if(!data || data.length<=0) { return; }
  var html = '';
  for(var i=0, len=data.length; i<len; i++) {
    var color = force.getColorToGroup(i);
    html += '<li class="top1">';
    html += '<div class="egrh-list-num">';
    html += '<div class="egrh-listnum-flex">';
    html += '<div style="background-color: ' + color + '"></div>';
    html += '<span>' + (i+1) + '</span>';
    html += '</div>';
    html += '</div>';
    html += '<div class="egrh-list-contbox">';
    html += '<span style="color: ' + color + '">' + data[i].name + '</span>';
    html += '<label>' + data[i].context + '</label>';
    html += '</div>';
    html += '</li>';
  }
  document.getElementsByClassName('egrh-list')[0].innerHTML = html;
};
