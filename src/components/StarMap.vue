<template>
  <div>
    <canvas id="star_map" :width="c_size.width" :height="c_size.height">
      Sorry, your browser doesn't support the &lt;canvas&gt; element.
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'StarMap',
  data () {
    return {
      c_size: {
        width: document.body.clientWidth - 30,
        height: document.body.clientHeight - 30
      },
      color: '#8e71c1'
    }
  },
  mounted () {
    this.drawStarMap()
    const _this = this
    window.onresize = function () {
      _this.resizeCanvas()
      setTimeout(function () {
        _this.drawStarMap()
      }, 100)
    }
  },
  methods: {
    resizeCanvas () {
      this.c_size.width = document.body.clientWidth - 30
      this.c_size.height = document.body.clientHeight -30
      console.log("???")
    },
    drawStarMap () {
      this.sm_c = document.getElementById('star_map')
      this.ctx = this.sm_c.getContext('2d')
      let ctx = this.ctx
      
      ctx.lineWidth = 0.9
      ctx.clearRect(0, 0, this.sm_c.width, this.sm_c.height)
      ctx.strokeStyle = this.color
      ctx.strokeRect(10, 10, 80, 80)
      ctx.strokeRect(40, 40, 110, 110)
      ctx.strokeRect(200, 250, 200, 200)

      this.drawTriangle()
      this.drawOrbit(ctx, {x: this.c_size.width - 200, y: this.c_size.height - 200}, 200)
    },
    drawOrbit (ctx, center, radius) {
      ctx.beginPath()
      var startAngle = Math.PI; // 开始点
      var endAngle = Math.PI * 2 // 结束点
      var anticlockwise = true; // 逆时针
      ctx.arc(center.x, center.y, radius, startAngle, endAngle, anticlockwise);
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(200, 200, 100, 0, Math.PI * 2);
      ctx.stroke()
    },
    drawTriangle () {
      let ctx = this.ctx
      ctx.beginPath()
      let height = 200 * Math.sin(Math.PI / 3)
      ctx.moveTo(this.c_size.width / 2, this.c_size.height/2)
      ctx.lineTo(this.c_size.width / 2 - 100, this.c_size.height / 2 + height)
      ctx.lineTo(this.c_size.width / 2 + 100, this.c_size.height / 2 + height)
      let grd = ctx.createLinearGradient(0, 0, this.c_size.width, 0)
      grd.addColorStop(0, "#4CE8B2"); //起始颜色
      grd.addColorStop(1, "#EFD458"); //终点颜色
      ctx.fillStyle = grd;
      ctx.fill(); //闭合形状并且以填充方式绘制出来
    }
  }
}
</script>

<style scoped>
canvas {
  box-shadow: 0px 2px 13px #8e71c7;
  margin: 13px;
  padding: 0;
}
</style>
