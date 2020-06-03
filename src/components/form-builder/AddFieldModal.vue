<template>
  <modal :value="value" @input="close">
    <div class="content" v-if="value">
      <h2 class="headline">Add {{ data.type }} field</h2>
      <div>
        <label>Name</label>
        <input required class="text-field" v-model="form.name">
      </div>

      <div>
        <label>Required</label>
        <input class="checkbox-field" type="checkbox" v-model="form.required">
      </div>

      <div v-if="'minLength' in form">
        <label>Minimum length</label>
        <input class="number-field" type="number" v-model="form.minLength">
      </div>

      <div v-if="'maxLength' in form">
        <label>Max length</label>
        <input class="number-field" type="number" v-model="form.maxLength">
      </div>

      <div v-if="'minValue' in form">
        <label>Minimum value</label>
        <input class="number-field" type="number" v-model="form.minValue">
      </div>

      <div v-if="'maxValue' in form">
        <label>Max value</label>
        <input class="number-field" type="number" v-model="form.maxValue">
      </div>

      <div class="submit-box">

        <button @click="close" class="cancel-button">Cancel</button>
        <button @click="submit" class="submit-button">Save</button>
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
      required: true,
      type: Boolean,
      default: false,
    },
    data: {
      required: true,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) this.setForm();
      },
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    submit() {
      if (this.form.name) {
        this.$emit('create', { ...this.form, setIndex: this.data.index });
        this.close();
      }
    },
    setForm() {
      switch (this.data.type) {
        default:
          this.form = {};
          break;
        case 'Text':
          this.form = {
            name: '',
            required: false,
            maxLength: 0,
            minLength: 0,
          };
          break;
        case 'Number':
          this.form = {
            name: '',
            required: false,
            maxValue: 0,
            minValue: 0,
          };
          break;
        case 'Email':
          this.form = {
            name: '',
            required: false,
          };
          break;
        case 'URL':
          this.form = {
            name: '',
            required: false,
          };
          break;
        case 'Checkbox':
          this.form = {
            name: '',
            required: false,
          };
          break;
        case 'Selection':
          this.form = {
            name: '',
            required: false,
            options: [],
          };
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .content {
    background-color: #fff;
    padding: 24px;
    width: 300px;
  }

  .headline {
    margin: 0px 0px 12px 0px;
    font-weight: 400;
  }

  label {
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
  }

  .text-field {
    margin-bottom: 12px;
    padding: 6px;
    box-sizing: border-box;
    width: 100%;
  }

  .number-field {
    margin-bottom: 12px;
    padding: 6px;
    box-sizing: border-box;
    width: 100%;
  }

  .checkbox-field {
    margin-bottom: 12px;
    height: 20px;
    width: 20px;
    padding: 4px;
  }

  .submit-box {
    display: flex;
    justify-content: flex-end;
  }

  .submit-button, .cancel-button {
    padding: 8px 16px;
    background-color: #41B883;
    color: #fff;
    border-radius: 4px;
    float: right;
    border: none;
    display: block;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #15b868;
    }

    &:focus {
      outline: none;
    }
  }

  .cancel-button {
    margin-right: 6px;
    background-color: #ccc;

    &:hover {
      background-color: #bbb;
    }
  }

</style>
