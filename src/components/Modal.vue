<template>
  <transition v-if="value" name="fade">
    <div class="modal-backdrop">
      <CloseIcon class="modal-close" @click="close"></CloseIcon>
    </div>
  </transition>
</template>

<script>

import CloseIcon from 'vue-material-design-icons/Close.vue';

export default {
  name: 'Modal',
  components: {
    CloseIcon,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-backdrop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 1;
    transition: opacity 0.3s;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #ff5f4a;
    }
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to, .fade-leave {
    opacity: 1;
  }
</style>
