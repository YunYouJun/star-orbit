<template>
  <div>
    <div class="form-inline-item">
      <label for="angle">Angle</label>
      <input
        class="zi-input"
        v-model.number="angle"
        name="angle"
        type="number"
        min="0"
        max="180"
      />
    </div>

    <div class="form-inline-item">
      <label for="count">Count</label>
      <input
        class="zi-input"
        v-model.number="count"
        name="count"
        type="number"
        min="0"
        max="12"
      />
    </div>

    <div class="form-inline-item">
      <label for="pathNumber">PathNumber</label>
      <input
        class="zi-input"
        v-model.number="pathNumber"
        name="pathNumber"
        type="number"
        min="0"
        max="20"
      />
    </div>

    <hr />

    <star-line
      :angle="angle"
      :count="count"
      :pathNumber="pathNumber"
    ></star-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
      angle: 60,
      count: 9,
      pathNumber: 1
    };
  }
};
</script>
