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
        <input class="checkbox-field" type="checkbox" v-model="form.validations.required">
      </div>

      <div v-if="'minLength' in form.validations">
        <label>Minimum length</label>
        <input class="number-field" type="number" v-model="form.validations.minLength">
      </div>

      <div v-if="'maxLength' in form.validations">
        <label>Max length</label>
        <input class="number-field" type="number" v-model="form.validations.maxLength">
      </div>

      <div v-if="'minValue' in form.validations">
        <label>Minimum value</label>
        <input class="number-field" type="number" v-model="form.validations.minValue">
      </div>

      <div v-if="'maxValue' in form.validations">
        <label>Max value</label>
        <input class="number-field" type="number" v-model="form.validations.maxValue">
      </div>

      <div v-if="'options' in form.validations">
        <label>Options</label>
        <div
          v-for="(item, index) in form.validations.options"
          :key="index"
          class="option-box"
        >
          <input
            class="option-input"
            v-model="form.validations.options[index]"
            type="text"
          >
          <div class="option-remove" @click="removeOption(index)">X</div>
        </div>

        <div class="add-option" @click="addOption">Add option</div>
      </div>

      <div class="submit-box">
        <button @click="remove" class="delete-button">Delete</button>
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
    remove() {
      this.$emit('delete', this.form.id);
      this.close();
    },
    close() {
      this.$emit('input', false);
    },
    submit() {
      if (this.form.name) {
        this.$emit('create', this.form);
        this.close();
      }
    },
    addOption() {
      const index = this.form.validations.options.length;
      this.form.validations.options.push(`Option-${index}`);
    },
    removeOption(index) {
      this.form.validations.options.splice(index, 1);
    },
    setForm() {
      this.form = { ...this.data };
      if (this.form.validations) return;

      switch (this.data.type) {
        default:
          this.form = this.data;
          break;
        case 'Text':
          this.form.validations = {
            required: false,
            maxLength: '0',
            minLength: '0',
          };
          break;
        case 'Number':
          this.form.validations = {
            required: false,
            maxValue: '0',
            minValue: '0',
          };
          break;
        case 'Email':
          this.form.validations = {
            required: false,
          };
          break;
        case 'URL':
          this.form.validations = {
            required: false,
          };
          break;
        case 'Checkbox':
          this.form.validations = {
            required: false,
          };
          break;
        case 'Selection':
          this.$set(
            this.form,
            'validations',
            {
              required: false,
              options: [],
            },
          );
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

  .option-box {
    display: flex;
  }

  .option-input {
    flex: 1;
    height: 30px;
    margin-bottom: 4px;
    padding: 0px 2px;
    border: 1px solid #ccc;
    margin-right: 2px;
  }

  .option-remove {
    width: 30px;
    height: 30px;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .add-option {
    width: 100%;
    height: 36px;
    border: 1px dashed black;
    line-height: 36px;
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #f4f4f4;
    }
  }

  .submit-box {
    display: flex;
    justify-content: flex-end;
  }

  .submit-button, .cancel-button, .delete-button {
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

  .delete-button {
    margin-right: auto;
    background-color: #ffa324;

    &:hover {
      background-color: #ff8732;
    }
  }

</style>
