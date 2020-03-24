# Star Line

<label for="angle">Angle</label>
<input v-model.number="angle" name="angle" type="number" min="0" max="180">

<label for="count">Count</label>
<input v-model.number="count" name="count" type="number" min="0" max="20">

> Do not set count too big!

<label for="pathNumber">PathNumber</label>
<input v-model.number="pathNumber" name="pathNumber" type="number" min="0" max="20">

<hr>

<star-line :angle="angle" :count="count" :pathNumber="pathNumber"></star-line>

<script>
export default {
  data() {
    return {
      angle: 60,
      count: 9,
      pathNumber: 1
    }
  }
}
</script>
