<template>
  <div id="star-orbit-container"></div>
</template>

<script>
import { SVG } from "@svgdotjs/svg.js";
import { getContainerWidth } from "../assets/js/utils";
export default {
  props: {
    color: {
      default: "#8e71c7",
      type: String
    }
  },
  data() {
    return {
      draw: null,
      starSize: 48,
      satelliteRate: 0.5,
      orbitRate: 3,
      count: 2
    };
  },
  mounted() {
    let width = getContainerWidth(
      document.getElementById("star-orbit-container")
    );
    this.draw = SVG()
      .addTo("#star-orbit-container")
      .size(width, "690")
      .fill(this.color);
    let cx = width / 2;
    let cy = this.draw.height() / 2;
    this.draw
      .circle(this.starSize)
      .cx(cx)
      .cy(cy);
    let r = this.starSize * this.orbitRate;
    this.drawMap(this.starSize, cx, cy, r, 3, 3, Math.random() * Math.PI * 2);
    this.drawMap(
      this.starSize,
      cx,
      cy,
      r + 100,
      3,
      2,
      Math.random() * Math.PI * 2
    );
  },
  methods: {
    drawMap(starSize, cx, cy, r, width, count, angle) {
      let orbit = this.draw
        .circle(r * 2)
        .cx(cx)
        .cy(cy)
        .fill("none")
        .stroke({ color: this.color, width: width });
      let satelliteSize = starSize * this.satelliteRate;
      let satelliteCx = cx + Math.cos(angle) * r;
      let satelliteCy = cy + Math.sin(angle) * r;
      console.log(satelliteCx, satelliteCy);
      let satellite = this.draw
        .circle(satelliteSize)
        .cx(satelliteCx)
        .cy(satelliteCy);
      let group = this.draw.group();
      group.add(orbit);
      group.add(satellite);
      if (count > 0) {
        let map = this.drawMap(
          satelliteSize,
          satelliteCx,
          satelliteCy,
          satelliteSize * this.orbitRate,
          --width,
          --count,
          angle
        );
        group.add(map);
      }
      group
        .animate({ duration: 5000, times: Infinity })
        .ease("-")
        .rotate(360, cx, cy);
      return group;
    }
  }
};
</script>
