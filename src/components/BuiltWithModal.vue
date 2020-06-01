<template>
  <modal :value="value" data-testid="modal" @input="toggleModal" close-everywhere>
    <div class="content">
      <div class="item">
        <div class="item-headline">Javascript</div>
        <div>Vue</div>
        <div>VueX <span>State management</span></div>
        <div>Vue Router</div>
        <div>Babel</div>
        <div>Webpack</div>
        <div>Jest <span>Unit testing</span></div>
        <div>Axios <span>HTTP requests</span></div>
      </div>
      <div class="item">
        <div class="item-headline">Tooling</div>
        <div>NPM</div>
        <div>Git</div>
        <div>Yarn</div>
        <div>ESLint <span>Linting</span></div>
        <div>Webstorm <span>Editor</span></div>
        <div>Firebase / Firestore <span>Database</span></div>
      </div>
      <div class="item">
        <div class="item-headline">Deployment</div>
        <div>Netlify</div>
      </div>
    </div>
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
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    toggleModal(val) {
      this.$emit('input', val);
    },
  },
};

</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    justify-content: center;
  }

  .item {
    color: #fff;
    margin: 0px 50px;

    div {
      margin-bottom: 6px;

      span {
        font-size: 10px !important;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .item-headline {
    font-weight: 600;
    margin-bottom: 20px !important;
  }
</style>
