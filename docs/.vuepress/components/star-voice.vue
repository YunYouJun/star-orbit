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

<script>
const SVG_NS = "http://www.w3.org/2000/svg";
export default {
  props: {
    src: String
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
  },
  methods: {
    startListen() {
      this.initAudioContext();
      this.getYourVoice();
    },
    stopListen() {
      this.track.stop();
    },
    resizeSVG() {
      let voiceSVG = this.$refs.voiceBox;
      this.svgWidth = parseInt(
        window.getComputedStyle(voiceSVG.parentNode).width
      );
      voiceSVG.setAttribute("width", this.svgWidth);
    },
    initAudioContext() {
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
    },
    initVoiceBar() {
      let barsGroup = this.$refs.voiceBars;

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
    },
    getYourVoice() {
      let source;
      let audioCtx = this.audioContext;
      let distortion = audioCtx.createWaveShaper();
      let gainNode = audioCtx.createGain();
      let biquadFilter = audioCtx.createBiquadFilter();
      let analyser = this.analyser;
      if (navigator.mediaDevices.getUserMedia) {
        let constraints = { audio: true };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            source = audioCtx.createMediaStreamSource(stream);
            source.connect(biquadFilter);
            biquadFilter.connect(gainNode);
            gainNode.connect(analyser);
            analyser.connect(audioCtx.destination);

            this.frequencyBars();
            // to stop
            this.track = stream.getTracks()[0];
          })
          .catch(function(err) {
            console.log("The following gUM error occured: " + err);
          });
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    }
  }
};
</script>
