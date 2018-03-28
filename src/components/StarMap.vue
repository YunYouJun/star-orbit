<template>
  <div>
    <canvas id="star_map" :width="canvas.width" :height="canvas.height">
      Sorry, your browser doesn't support the &lt;canvas&gt; element.
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'StarMap',
  data () {
    return {
      canvas: {
        width: document.body.clientWidth - 30,
        height: document.body.clientHeight - 30
      },
      color: '#8e71c1'
    }
  },
  mounted () {
    const _this = this
    window.onresize = function () {
      _this.resizeCanvas()
      setTimeout(function () {
        _this.drawStarMap()
      }, 100)
    }
    this.drawStarMap()
  },
  methods: {
    resizeCanvas () {
      this.canvas.width = document.body.clientWidth - 30
      this.canvas.height = document.body.clientHeight -30
    },
    drawStarMap () {
      let canvas = document.getElementById('star_map')
      let ctx = canvas.getContext('2d')
      
      ctx.lineWidth = 0.9
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = this.color
      ctx.strokeRect(10, 10, 80, 80)
      ctx.strokeRect(40, 40, 110, 110)
      ctx.strokeRect(200, 250, 200, 200)

      ctx.beginPath()
      ctx.moveTo(75,50)
      ctx.lineTo(100,75)
      ctx.lineTo(100,25)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      let height = 200 * Math.sin(Math.PI / 3)
      ctx.moveTo(this.canvas.width / 2, this.canvas.height/2)
      ctx.lineTo(this.canvas.width / 2 - 100, this.canvas.height / 2 + height)
      ctx.lineTo(this.canvas.width / 2 + 100, this.canvas.height / 2 + height)
      let grd = ctx.createLinearGradient(0, 0, this.canvas.width, 0)
      grd.addColorStop(0, "#4CE8B2"); //起始颜色
      grd.addColorStop(1, "#EFD458"); //终点颜色
      ctx.fillStyle = grd;
      ctx.fill(); //闭合形状并且以填充方式绘制出来

      this.drawOrbit(ctx, {x: this.canvas.width - 200, y: this.canvas.height - 200}, 200)
    },
    drawOrbit (ctx, center, radius) {
      ctx.beginPath()
      var startAngle = Math.PI; // 开始点
      var endAngle = Math.PI * 2 // 结束点
      var anticlockwise = true; // 逆时针
      ctx.arc(center.x, center.y, radius, startAngle, endAngle, anticlockwise);
      ctx.stroke()
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
