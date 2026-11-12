// Перевод верных ответов в 100-балльную шкалу, букву и оценку.
// До 80% верных — линейно, как в университете (57% → 57 баллов).
// Выше 80% — небольшой бонус: 90% верных → 95 баллов.
window.QuizGrade = (function () {
  var ANCHORS = [[0, 0], [0.8, 80], [0.9, 95], [1, 100]];
  function points(correct, total) {
    if (!total) return 0;
    var p = correct / total;
    if (p >= 1) return 100;
    for (var i = 1; i < ANCHORS.length; i++) {
      if (p <= ANCHORS[i][0] + 1e-9) {
        var a = ANCHORS[i - 1], b = ANCHORS[i];
        return Math.round(a[1] + (b[1] - a[1]) * (p - a[0]) / (b[0] - a[0]));
      }
    }
    return 100;
  }
  function letter(s) {
    return s >= 95 ? 'A' : s >= 90 ? 'A-' : s >= 85 ? 'B+' : s >= 80 ? 'B' : s >= 75 ? 'B-' :
      s >= 70 ? 'C+' : s >= 65 ? 'C' : s >= 60 ? 'C-' : s >= 55 ? 'D+' : s >= 50 ? 'D' : 'F';
  }
  function mark(s) { return s >= 90 ? 5 : s >= 75 ? 4 : s >= 50 ? 3 : 2; }
  return { points: points, letter: letter, mark: mark };
})();
