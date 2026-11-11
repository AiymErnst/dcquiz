// Перевод верных ответов в 100-балльную шкалу, букву и оценку.
// Опорные точки: доля верных → баллы из 100 (для 30 вопросов: 27 → 95, 24 → 90, 18 → 80, 9 → 50).
window.QuizGrade = (function () {
  var ANCHORS = [[0, 0], [0.3, 50], [1 / 3, 55], [0.4, 65], [0.5, 72], [0.6, 80], [0.7, 85], [0.8, 90], [0.9, 95], [1, 100]];
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
