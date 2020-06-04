<template>
  <div>
    <label>
      {{ field.name }}
      <span class="required" v-if="field.validations && field.validations.required">*</span>
    </label>
    <input
      v-if="isInput"
      v-model="value"
      :type="field.type.toLowerCase()"
      :maxlength="field.validations
      && field.validations.maxLength
      && field.validations.maxLength > 0"
      :max="field.validations
      && field.validations.maxValue
      && field.validations.maxValue > 0"
      :minlength="field.validations && field.validations.minLength"
      :min="field.validations && field.validations.minValue"
      @input="applyValidations"
    >
    <select
      v-if="isSelect"
    >
      <option></option>
      <option
        v-for="(option, index) in field.validations.options"
        :key="index"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    isInput() {
      return this.field.type === 'Text' || this.field.type === 'Number'
        || this.field.type === 'Email' || this.field.type === 'URL'
        || this.field.type === 'Checkbox';
    },
    isSelect() {
      return this.field.type === 'Selection';
    },
  },
  methods: {
    applyValidations() {
      if (this.field.validations
        && this.field.validations.maxValue
        && this.field.validations.maxValue > 0) {
        if (Number(this.value) > this.field.validations.maxValue) {
          this.value = this.field.validations.maxValue;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  div {
    width: 300px;
  }

  label {
    display: block;
    font-size: 12px;
    margin-bottom: 4px;
  }

  input, select {
    width: 100%;
    padding: 6px;
    margin-bottom: 12px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 2px;

    &:focus {
      border: 1px solid #41B883;
      outline: none;
    }
  }

  input[type=checkbox] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .required {
    color: #a90109;
  }
</style>
