<template>
  <div>
    <button class="so-btn" @click="playOrPause">{{ btnText }}</button>
    <hr />
    <svg
      id="clock"
      viewBox="0 0 100 100"
      width="300"
      height="300"
      :stroke="color"
      stroke-linecap="round"
    >
      <symbol id="scale-small">
        <line x1="50" y1="11" x2="50" y2="13" stroke-width="1"></line>
      </symbol>
      <symbol id="scale-big">
        <line x1="50" y1="9" x2="50" y2="13" stroke-width="2"></line>
      </symbol>
      <circle id="face" cx="50" cy="50" r="45" stroke-width="2" fill="none" />
      <circle id="face" cx="50" cy="50" r="3" :fill="color" />
      <g id="scale-big-container">
        <use xlink:href="#scale-big"></use>
        <use xlink:href="#scale-big" transform="rotate(90,50,50)"></use>
        <use xlink:href="#scale-big" transform="rotate(180,50,50)"></use>
        <use xlink:href="#scale-big" transform="rotate(270,50,50)"></use>
      </g>
      <g id="scale-small-container">
        <use xlink:href="#scale-small" transform="rotate(30,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(60,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(120,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(150,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(210,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(240,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(300,50,50)"></use>
        <use xlink:href="#scale-small" transform="rotate(330,50,50)"></use>
      </g>
      <g id="hands">
        <line id="hourHand" x1="50" y1="44" x2="50" y2="25" stroke-width="3" />
        <line
          id="minuteHand"
          x1="50"
          y1="44"
          x2="50"
          y2="16"
          stroke-width="2"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "StarTimer",
  data() {
    return {
      btnText: "Start",
      run: false,
      color: "#8e71c7",
      intervalID: null,
      minute: 0
      // color: "#6200ee"
    };
  },
  methods: {
    playOrPause() {
      if (this.run) {
        clearInterval(this.intervalID);
        this.btnText = "Start";
      } else {
        this.timeFlies();
        this.btnText = "Pause";
      }
      this.run = !this.run;
    },
    timeFlies() {
      clearInterval(this.intervalID);
      let hour = 0;
      this.intervalID = setInterval(() => {
        this.minute += 0.12;
        hour = this.minute / 60;
        this.updateTimerByTime(hour, this.minute);
      }, 16.6);
      // must small than 16 to more than 60fps
    },
    updateTimerByTime(hour, minute) {
      let minuteAngle = minute * 6;
      let hourAngle = hour * 30;

      let minuteHand = document.getElementById("minuteHand");
      let hourHand = document.getElementById("hourHand");

      minuteHand.setAttribute("transform", "rotate(" + minuteAngle + ",50,50)");
      hourHand.setAttribute("transform", "rotate(" + hourAngle + ",50,50)");
    },
    realTime() {
      setInterval(() => {
        let now = new Date();
        let minute = now.getMinutes();
        let hour = (now.getHours() % 12) + minute / 60;
        this.updateTimerByTime(hour, minute);
      }, 60000);
    }
  }
};
</script>
