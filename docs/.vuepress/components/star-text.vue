<template>
  <div>
    <svg
      class="so-shadow"
      id="lineGraph"
      :height="height"
      :stroke="color"
      :fill="color"
    ></svg>
  </div>
</template>

<script>
const SVG_NS = "http://www.w3.org/2000/svg";
import { resizeSVG, random } from "../assets/js/utils";
export default {
  props: {
    color: {
      default: "#8e71c7",
      type: String
    },
    angle: {
      default: 60,
      type: Number
    },
    count: {
      default: 9,
      type: Number
    },
    pathNumber: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      height: 470,
      length: 60,
      circleR: 8
    };
  },
  mounted() {
    this.width = resizeSVG(lineGraph);
    this.graph = lineGraph;
    this.drawGraph();
  },
  computed: {
    radian() {
      return (this.angle / 180) * Math.PI;
    }
  },
  watch: {
    radian() {
      this.removeAllChild(this.graph);
      this.drawGraph();
    },
    count() {
      this.removeAllChild(this.graph);
      this.drawGraph();
    },
    pathNumber() {
      this.removeAllChild(this.graph);
      this.drawGraph();
    }
  },
  methods: {
    removeAllChild(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    },
    drawGraph() {
      let x1 = this.width / 2;
      let y1 = this.height / 2;
      let pathNumber = 4;
      for (let i = 0; i < this.pathNumber; i++) {
        this.drawLine(
          x1,
          y1,
          this.length,
          // Math.random() * Math.PI * 2,
          (Math.PI / 2) * i,
          this.count
        );
      }
      this.drawText(x1, y1, this.circleR);
    },
    drawLine(x1, y1, length, angle, count) {
      const line = document.createElementNS(SVG_NS, "line");
      const x2 = x1 + length * Math.cos(angle);
      const y2 = y1 + length * Math.sin(angle);
      // line.setAttribute("x1", x1);
      // line.setAttribute("y1", y1);
      // line.setAttribute("x2", x2);
      // line.setAttribute("y2", y2);
      // line.setAttribute("stroke-width", 2);
      // this.graph.append(line);
      this.drawText(x2, y2, this.circleR);
      if (count > 0) {
        this.drawLine(
          x2,
          y2,
          // random(80, 100),
          this.length,
          // Math.random() * Math.PI * 2 ,
          angle + this.radian,
          count - 1
        );
        this.drawLine(
          x2,
          y2,
          // random(80, 100),
          this.length,
          // Math.random() * Math.PI * 2,
          angle - this.radian,
          count - 1
        );
      }
    },
    drawText(x, y, r) {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("font-size", r * 2 + "px");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("dx", -r);
      text.setAttribute("dy", r);
      text.textContent = "星";
      this.graph.append(text);
    }
  }
};
</script>
