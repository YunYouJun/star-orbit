<template>
  <div id="star-text-display-container" class="perspective-right"></div>
</template>

<style lang="scss">
.perspective-right {
  transform-style: preserve-3d;
  transform: rotateY(-30deg);
  animation: text-move 5s ease-out forwards;
}
@keyframes text-move {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: translate(20px, 20px) rotateY(-30deg);
  }
}
.star-text-line {
  display: flex;
  flex-direction: column;
  position: absolute;
  letter-spacing: 2px;
  text-shadow: 35px 30px 5px rgba(#8e71c7, 0.6);
  text-align: center;
}
</style>

<script>
import anime from "animejs/lib/anime.es.js";
import { getContainerWidth } from "../assets/js/utils";
export default {
  props: {
    color: {
      default: "#8e71c7",
      type: String
    }
  },
  data() {
    return {
      text: "新生与湮灭",
      position: {
        x: 200,
        y: 200
      },
      count: 0
    };
  },
  mounted() {
    this.container = document.getElementById("star-text-display-container");
    this.container.style.width = getContainerWidth(
      document.getElementById("star-text-display-container")
    );
    this.container.style.height = "690px";
    this.tl = anime.timeline();
    this.displayText(this.text, { x: 200, y: 200 });
    this.displayText("梦呓", { x: 250, y: 180 });
  },
  methods: {
    displayText(text, pos) {
      let createChar = this.createChar;
      let textLine = document.createElement("div");
      textLine.classList.add("star-text-line");
      textLine.style.left = pos.x + "px";
      textLine.style.top = pos.y + "px";
      textLine.append(createChar("-"));

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let charEl = createChar(char);
        charEl.style.transform = "translateY(-1rem) scale(0)";

        textLine.append(charEl);
      }
      textLine.append(createChar("-"));
      this.tl.add(
        {
          targets: textLine.children,
          scale: 1,
          translateY: 0,
          delay: anime.stagger(100)
        },
        "-=" + this.count * 800
      );
      this.container.append(textLine);
      this.count++;
    },
    createChar(content) {
      let char = document.createElement("span");
      char.classList.add("star-char");
      char.innerText = content;
      return char;
    }
  }
};
</script>
