<template>
  <div class="wrapper">
    <div class="content-wrapper">
    <router-link class="back-button" :to="{ name: 'Home' }" >
      <arrow-left-icon :size="16"/> Back
    </router-link>
      <router-view/>
    </div>
  </div>
</template>

<script>
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';

export default {
  components: {
    ArrowLeftIcon,
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: auto;
  }

  .content-wrapper {
    padding: 12px 36px 36px 36px;
  }

  .back-button {
    text-decoration: none !important;
    color: #41B883;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    box-sizing: border-box;
    padding: 6px 12px;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 14px;

    &:hover {
      border: 1px solid rgba(65, 184, 131, 0.6);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }
</style>
