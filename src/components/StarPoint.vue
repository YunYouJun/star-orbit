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
      point_radius: 5,
      line_width: 2,
      id: 'bg',
      zIndex: 0,
      opacity: 1,
      color: '#8e71c7',
      count: 33,
      random_points: [],
      current_point: {
        x: null,
        y: null,
        max: 20000
      },
      moveV: 0.3,
      mouseV: 0.003 // 向鼠标移动的速度
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

    let _this = this
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
          max: 8100 //沾附距离
        })
      }

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
        r.x += _this.moveV * r.xa,
        r.y += _this.moveV * r.ya,
        r.xa *= r.x > _this.c_size.width || r.x < 0 ? -1 : 1, 
        r.ya *= r.y > _this.c_size.height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
        ctx.fillStyle = _this.color

        //圆点
        ctx.beginPath()
        ctx.arc(r.x, r.y, _this.point_radius, 0, Math.PI * 2);
        ctx.fill()

        for (i = idx + 1; i < _this.all_array.length; i++) {
          e = _this.all_array[i];
          // 当前点存在
          if (null !== e.x && null !== e.y) {
            x_dist = r.x - e.x; //x轴距离 l
            y_dist = r.y - e.y; //y轴距离 n
            dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

            dist < e.max && (
              e === _this.current_point && dist >= e.max / 2 && (r.x -= _this.mouseV * x_dist, r.y -= _this.mouseV * y_dist), //靠近的时候加速
              d = (e.max - dist) / e.max,
              ctx.beginPath(),
              ctx.lineWidth = d / 2 + _this.line_width,
              ctx.strokeStyle = "rgba(" +  _this.hex2rgb(_this.color) + "," + (d + 0.2) + ")",
              ctx.moveTo(r.x, r.y),
              ctx.lineTo(e.x, e.y),
              ctx.stroke()
            )
          }
        }
      }), window.requestAnimationFrame(_this.drawStarLine)
    },
    hex2rgb (color) {
      let sColor = color.toLowerCase()
      //十六进制颜色值的正则表达式
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
      // 如果是16进制颜色
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = "#"
          for (let i=1; i<4; i+=1) {
            sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));   
          }
          sColor = sColorNew
        }
        //处理六位的颜色值
        let sColorChange = []
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i+2)));   
        }
        // return "RGB(" + sColorChange.join(",") + ")";
        return sColorChange
      }
      return sColor
    }
  }
}
</script>

<style>

</style>
