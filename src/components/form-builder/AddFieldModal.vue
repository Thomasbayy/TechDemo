<template>
  <modal :value="value" @input="close">
    <div>temp</div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },
  props: {
    value: {
      required: true,
      type: Boolean,
      default: false,
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

</style>
