<template>
  <div>
    <button class="so-btn" @click="toggleStatus">
      {{ btnText }}
    </button>
    <StarVoice ref="control" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnText: "Start",
      isListening: false
    };
  },
  methods: {
    toggleStatus() {
      if (!this.isListening) {
        this.$refs.control.startListen();
        this.btnText = "Stop";
      } else {
        this.$refs.control.stopListen();
        this.btnText = "Start";
      }
      this.isListening = !this.isListening;
    }
  }
};
</script>
