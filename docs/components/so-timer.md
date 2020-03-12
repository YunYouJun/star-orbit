# Star Timer

<StarTimer/>

此处使用 `setInterval` 实现，每 16.6ms 绘制一次。 `clearInterval` 实现停止。

::: tip 为什么不使用 `requestAnimationFrame`
`requestAnimationFrame` 在隐藏该页面时，会停止对动画的渲染。
且其可能由于浏览器性能、屏幕频率等因素，而不是以固定时间进行重绘。
这也就违背了 `Timer` 这个组件的定义。
:::
