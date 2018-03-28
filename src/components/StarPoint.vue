<template>
  <canvas id="star-point"></canvas>
</template>

<script>
export default {
  name: 'StarPoint',
  data () {
    return {
      c_size: {
        width: 500,
        height: 500
      },
      id: 'bg',
      zIndex: 0,
      opacity: 0.5,
      color: '#8e71c1',
      count: 66,
      random_points: [],
      current_point: {
        x: 5,
        y: 5,
        max: 20000
      }
    }
  },
  computed: {
    all_array () {
      return this.random_points.concat(this.current_point)
    }
  },
  mounted () {
    this.sp_c = document.getElementById('star-point')
    this.ctx = this.sp_c.getContext('2d')
    this.sp_c.id = 'sp_c_' + this.id
    this.sp_c.style.cssText = "position:fixed;top:0;left:0;z-index:" + this.zIndex + ";opacity:" + this.opacity;

    this.setCanvasSize()
    this.drawStarPoint()

    const _this = this
    window.onresize = this.setCanvasSize
    window.onmousemove = function(e) {
      e = e || window.event
      _this.current_point.x = e.clientX
      _this.current_point.y = e.clientY
    }, window.onmouseout = function() {
      _this.current_point.x = null
      _this.current_point.y = null
    }
  },
  methods: {
    drawStarPoint () {
      //随机生成 n 条线位置信息
      for (let i = 0; i < this.count; i++) {
        let x = Math.random() * this.c_size.width
        let y = Math.random() * this.c_size.height
        let xa = 2 * Math.random() - 1 //随机运动方向
        let ya = 2 * Math.random() - 1
        // 随机点
        this.random_points.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 6000 //沾附距离
        })
      }

      // 跟随鼠标 
      this.random_points = this.random_points.concat([this.current_point])

      const _this = this
      setTimeout(function () {
        window.requestAnimationFrame(_this.drawStarLine);
      }, 100)
    },
    setCanvasSize () {
      this.c_size.width = this.sp_c.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.c_size.height = this.sp_c.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    },
    drawStarLine () {
      let ctx = this.ctx

      ctx.clearRect(0, 0, this.c_size.width, this.c_size.height)
      let e, i, d, x_dist, y_dist, dist //临时节点
      const _this = this

      this.random_points.forEach(function (r, idx) {
        r.x += r.xa,
        r.y += r.ya,
        r.xa *= r.x > _this.c_size.width || r.x < 0 ? -1 : 1, 
        r.ya *= r.y > _this.c_size.height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
        ctx.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
        // 此处未用 all_array 可在静止时释放
        for (i = idx + 1; i < _this.random_points.length; i++) {
          e = _this.random_points[i];
          // 当前点存在
          if (null !== e.x && null !== e.y) {
            x_dist = r.x - e.x; //x轴距离 l
            y_dist = r.y - e.y; //y轴距离 n
            dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

            dist < e.max && (
              e === _this.current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
              d = (e.max - dist) / e.max,
              ctx.beginPath(),
              ctx.lineWidth = d / 2,
              ctx.strokeStyle = "rgba(" +  _this.color + "," + (d + 0.2) + ")",
              ctx.moveTo(r.x, r.y),
              ctx.lineTo(e.x, e.y),
              ctx.stroke()
            )
          }
        }
      }), window.requestAnimationFrame(_this.drawStarLine)
    }
  }
}
</script>

<style>

</style>
