//src: https://jsfiddle.net/002v98LL/
function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) { 
      factor = 0.5; 
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

function interpolateColors(color1, color2, steps) {
  var stepFactor = 1 / (steps - 1),
      interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for(var i = 0; i < steps; i++) {
      interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}