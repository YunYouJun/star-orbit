<template>
  <div>
    <label for="custom-audio">You can try your music.</label>
    <input
      name="custom-audio"
      type="file"
      accept="audio/*"
      @change="useCustomAudio"
    />
    <hr />

    <audio v-if="src" id="star-music" :src="src" controls crossorigin></audio>
    <StarMusic audioID="star-music" :src="src" />

    <audio
      v-if="src"
      id="star-music-circle"
      :src="src"
      controls
      crossorigin
    ></audio>
    <StarMusic audioID="star-music-circle" :src="src" type="circle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://cdn.jsdelivr.net/gh/YunYouJun/cdn/audio/star-timer.mp3"
      // "https://music.163.com/song/media/outer/url?id=1404797365.mp3"
      // avoid cors
      // "http://m10.music.126.net/20200311215123/69c708a15d8a6f1943d24873342621ce/ymusic/045c/555c/070e/367bdf0061b6fff4b6b70d4d24b81b4c.mp3"
    };
  },
  methods: {
    useCustomAudio(e) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      document.getElementById("star-music").src = url;
      document.getElementById("star-music-circle").src = url;
    }
  }
};
</script>
