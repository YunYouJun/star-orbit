<template>
  <div>
    <svg
      id="voice-bar-container"
      ref="voiceBox"
      :height="boxHeight"
      :fill="color"
    >
      <defs>
        <g id="voice-bars" ref="voiceBars"></g>
        <linearGradient id="bar-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" :stop-color="color"></stop>
          <stop offset="1" stop-color="rgba(142,113,199,0)"></stop>
        </linearGradient>
      </defs>
      <use xlink:href="#voice-bars" />
      <use
        xlink:href="#voice-bars"
        :transform="`scale(-1, 1) translate(${-svgWidth}, 0)`"
      />
      <use
        xlink:href="#voice-bars"
        :transform="`rotate(180, ${svgWidth / 2}, ${boxHeight / 2})`"
      />
      <use
        xlink:href="#voice-bars"
        :transform="`scale(1, -1) translate(0, ${-boxHeight})`"
      />
    </svg>
  </div>
</template>

<style>
audio {
  outline: none;
}
</style>

<script>
export default {
  props: {
    src: String,
    audioID: String
  },
  data() {
    return {
      color: "#8e71c7",
      boxHeight: 600,
      svgWidth: 0,
      fftSize: 64,
      // small than half of fftSize
      // repeat display so size can be bigger
      displaySize: 56,
      bars: []
    };
  },
  mounted() {
    this.resizeSVG();
    this.initVoiceBar();
    this.getMusicByElement();
    // this.getMusicByXHR();
  },
  methods: {
    resizeSVG() {
      let voiceSVG = this.$refs.voiceBox;
      this.svgWidth = parseInt(
        window.getComputedStyle(voiceSVG.parentNode).width
      );
      voiceSVG.setAttribute("width", this.svgWidth);
    },
    initAudioContext() {
      const audio = document.getElementById(this.audioID);
      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.msAudioContext;
      this.audioContext = new AudioContext();
      // volume
      this.gainNode = this.audioContext.createGain();
      // analyser
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.fftSize;
      let audioCtx = this.audioContext;
    },
    initVoiceBar() {
      let barsGroup = this.$refs.voiceBars;

      const SVG_NS = "http://www.w3.org/2000/svg";
      const rectWidth = this.svgWidth / this.displaySize;
      const rectHeight = 1;
      for (let i = 0; i < this.displaySize; i++) {
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", this.svgWidth / 2 + rectWidth * i);
        rect.setAttribute("y", this.boxHeight / 2);
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", rectHeight);
        // rect.setAttribute("stroke", this.color);
        rect.setAttribute("fill", "url(#bar-grad)");
        // rect.setAttribute("fill", "none");
        barsGroup.appendChild(rect);
        this.bars.push(rect);
      }
    },
    connectSource(source) {
      let audioCtx = this.audioContext;
      let gainNode = this.gainNode;
      let analyser = this.analyser;
      source.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(audioCtx.destination);
    },
    getMusicByElement() {
      const audio = document.getElementById(this.audioID);
      let source;
      audio.addEventListener("play", () => {
        this.initAudioContext();
        source = this.audioContext.createMediaElementSource(audio);
        this.connectSource(source);
        this.frequencyBars();
      });
    },
    getMusicByXHR() {
      let source;
      let audioCtx = this.audioContext;

      let xhr = new XMLHttpRequest();
      xhr.open("GET", this.src);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        audioCtx.decodeAudioData(
          xhr.response,
          buffer => {
            source = audioCtx.createBufferSource();
            source.buffer = buffer;
            this.connectSource(source);
            this.frequencyBars();
          },
          function(e) {
            console.log("Error with decoding audio data" + e.err);
          }
        );
      };
      xhr.send();
    },
    // Todo: input file
    frequencyBars() {
      // half of fftSize
      let analyser = this.analyser;
      let bars = this.bars;
      // let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(this.displaySize);
      let drawBars = () => {
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < this.displaySize; i++) {
          bars[i].setAttribute("height", dataArray[i] + 1);
        }
        window.requestAnimationFrame(drawBars);
      };
      window.requestAnimationFrame(drawBars);
    }
  }
};
</script>
