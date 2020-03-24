function getContainerWidth(el) {
  return parseInt(window.getComputedStyle(el).width);
}

function resizeSVG(svg) {
  const svgWidth = parseInt(window.getComputedStyle(svg.parentNode).width);
  svg.setAttribute("width", svgWidth);
  return svgWidth;
}

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

export { getContainerWidth, resizeSVG, random };
