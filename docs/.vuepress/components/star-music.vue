<template>
  <div>
    <svg ref="voiceBox" :height="boxHeight" :fill="color">
      <defs ref="defs">
        <linearGradient id="bar-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" :stop-color="color"></stop>
          <stop offset="1" stop-color="rgba(142,113,199,0)"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style>
audio {
  outline: none;
}
</style>

<script>
const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
export default {
  props: {
    src: String,
    audioID: String,
    type: {
      default: "histogram",
      type: String
    },
    fftSize: {
      default: 128,
      type: Number
    },
    // small than half of fftSize
    // do not include repeat
    displaySize: {
      default: 56,
      type: Number
    }
  },
  data() {
    return {
      color: "#8e71c7",
      boxHeight: 600,
      svgWidth: 0,

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
      this.repeatBars();
      const barsGroup = document.createElementNS(SVG_NS, "g");
      barsGroup.setAttribute("id", "voice-bars-" + this.type);
      this.$refs.defs.appendChild(barsGroup);

      let rectWidth = 20;
      const rectHeight = 1;
      if (this.type === "circle") {
        const circle = document.createElementNS(SVG_NS, "circle");
        const cx = this.svgWidth / 2;
        const cy = this.boxHeight / 2;
        const r = 150;
        rectWidth = ((Math.PI * r) / this.displaySize) * 0.8;
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        circle.setAttribute("stroke", this.color);
        circle.setAttribute("fill", "none");
        this.$refs.voiceBox.appendChild(circle);
        for (let i = 0; i < this.displaySize; i++) {
          const rect = document.createElementNS(SVG_NS, "rect");
          rect.setAttribute("x", cx);
          rect.setAttribute("y", cy - r);
          rect.setAttribute("width", rectWidth);
          rect.setAttribute("height", rectHeight);
          // rect.setAttribute("stroke", this.color);
          rect.setAttribute("fill", "url(#bar-grad)");
          // rect.setAttribute("fill", "none");
          rect.setAttribute(
            "transform",
            `rotate(${(i / this.displaySize) * 180},${cx},${cy})`
          );
          barsGroup.appendChild(rect);
          this.bars.push(rect);
        }
      } else {
        rectWidth = this.svgWidth / (this.displaySize * 2);
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
      }
    },
    repeatBars() {
      const svgBox = this.$refs.voiceBox;
      let use = document.createElementNS(SVG_NS, "use");
      use.setAttributeNS(XLINK_NS, "href", "#voice-bars-" + this.type);
      svgBox.appendChild(use);
      use = use.cloneNode();
      use.setAttribute(
        "transform",
        `scale(-1, 1) translate(${-this.svgWidth}, 0)`
      );
      svgBox.appendChild(use);
      use = use.cloneNode();
      use.setAttribute(
        "transform",
        `rotate(180, ${this.svgWidth / 2}, ${this.boxHeight / 2})`
      );
      svgBox.appendChild(use);
      use = use.cloneNode();
      use.setAttribute(
        "transform",
        `scale(1, -1) translate(0, ${-this.boxHeight})`
      );
      svgBox.appendChild(use);
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
        if (!this.audioContext) {
          this.initAudioContext();
          source = this.audioContext.createMediaElementSource(audio);
          this.connectSource(source);
        }
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
          const height =
            this.type === "circle" ? dataArray[i] / 2 : dataArray[i] + 1;
          bars[i].setAttribute("height", height);
        }
        window.requestAnimationFrame(drawBars);
      };
      window.requestAnimationFrame(drawBars);
    }
  }
};
</script>
