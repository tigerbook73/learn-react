// 清除旧的 mark 和 measure，保持控制台干净
performance.clearMarks();
performance.clearMeasures();

// 设置起始点
performance.mark("start");

// 模拟耗时操作
for (let i = 0; i < 1e6; i++) {
  // just wasting time
}

performance.mark("end");

// 测量 start 到 end 的时间
performance.measure("耗时测量", "start", "end");

// 获取并打印测量结果
const measures = performance.getEntriesByName("耗时测量");
console.log(`耗时：${measures[0].duration} 毫秒`);
