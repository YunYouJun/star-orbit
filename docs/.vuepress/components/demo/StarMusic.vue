<template>
  <div>
    <audio v-if="src" id="star-music" :src="src" controls crossorigin></audio>
    <StarMusic audioID="star-music" :src="src" />
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
  }
};
</script>
