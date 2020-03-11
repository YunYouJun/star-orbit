<template>
  <div>
    <canvas id="star-map" ref="starMap">
      Sorry, your browser doesn't support the &lt;canvas&gt; element.
    </canvas>
  </div>
</template>

<script>
export default {
  name: "StarMap",
  data() {
    return {
      color: "#8e71c1"
    };
  },
  mounted() {
    this.resizeCanvas();
    this.drawStarMap();
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      // 等待 canvas 变换好，再延时绘制，不然可能会没有内容
      setTimeout(function() {
        this.drawStarMap();
      }, 100);
    });
  },
  methods: {
    resizeCanvas() {
      this.canvas = document.getElementById("star-map");
      let parentStyle = window.getComputedStyle(this.canvas.parentNode);
      this.canvas.width = parseInt(parentStyle.width);
      this.canvas.height = document.body.clientHeight - 400;
    },
    drawStarMap() {
      this.ctx = this.canvas.getContext("2d");
      let ctx = this.ctx;
      ctx.lineWidth = 0.9;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.strokeStyle = this.color;
      ctx.strokeRect(10, 10, 80, 80);
      ctx.strokeRect(40, 40, 110, 110);
      ctx.strokeRect(200, 250, 200, 200);

      this.drawTriangle();
      this.drawOrbit(
        ctx,
        { x: this.canvas.width - 200, y: this.canvas.height - 200 },
        200
      );

      this.drawHeart();
    },
    drawOrbit(center, radius) {
      let ctx = this.ctx;
      ctx.beginPath();
      let startAngle = Math.PI; // 开始点
      let endAngle = Math.PI * 2; // 结束点
      let anticlockwise = true; // 逆时针
      ctx.arc(center.x, center.y, radius, startAngle, endAngle, anticlockwise);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200, 200, 100, 0, Math.PI * 2);
      ctx.stroke();
    },
    drawTriangle() {
      let ctx = this.ctx;
      ctx.beginPath();
      let height = 200 * Math.sin(Math.PI / 3);
      ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      ctx.lineTo(this.canvas.width / 2 - 100, this.canvas.height / 2 + height);
      ctx.lineTo(this.canvas.width / 2 + 100, this.canvas.height / 2 + height);
      let grd = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
      grd.addColorStop(0, "#4CE8B2"); //起始颜色
      grd.addColorStop(1, "#EFD458"); //终点颜色
      ctx.fillStyle = grd;
      ctx.fill(); //闭合形状并且以填充方式绘制出来
    },
    drawHeart() {
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.fill();
    }
  }
};
</script>

<style scoped>
canvas {
  box-shadow: 0px 2px 13px #8e71c7;
  margin: 13px;
  padding: 0;
}
</style>
