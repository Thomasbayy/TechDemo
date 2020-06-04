<template>
  <div class="wrapper">
    <FieldModal
      @create="updateField"
      @delete="deleteField"
      v-model="addFieldModalShowing"
      :data="addFieldModalData"
    />

    <div class="content-wrapper">
      <router-link class="back-button" :to="{ name: 'Home' }" >
        <arrow-left-icon :size="16"/> Back
      </router-link>
      <h2>Form builder</h2>

      <div class="build-wrapper">
        <div style="margin-right: 24px;">
          <div>Available fields</div>
          <draggable
            class="build-options"
            v-model="buildOptions"
            :group="{ name: 'people', put: false, pull: 'clone' }"
            :sort="false"
          >
            <div
              :key="index"
              class="build-option"
              v-for="(element, index) in buildOptions"
              :type="element.type"
            >
              {{element.type}}
            </div>
          </draggable>
        </div>

        <div style="margin-right: 24px;">
          <div>Drag fields to build</div>
          <draggable
            class="build-area"
            v-model="buildForm"
            group="people"
            @add="addNewField"
          >
            <div
              @click="openFieldModal(element.id)"
              :key="index"
              class="build-option"
              v-for="(element, index) in buildForm"
            >
              {{element.name}}
            </div>
          </draggable>
        </div>

        <div>
          <div>Form preview</div>
          <div class="form-container">
            <form style="width: 300px;">
              <FormField v-for="field in buildForm" :field="field" :key="field.id"></FormField>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable';
import FieldModal from '@/components/form-builder/FieldModal.vue';
import FormField from '@/components/form-builder/FormField.vue';
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';

export default {
  components: {
    draggable,
    FieldModal,
    ArrowLeftIcon,
    FormField,
  },
  data() {
    return {
      addFieldModalShowing: false,
      addFieldModalData: {},
      buildOptions: [{
        type: 'Text',
        name: 'Text field',
      }, {
        type: 'Number',
        name: 'Number field',
      }, {
        type: 'Email',
        name: 'Email field',
      }, {
        type: 'URL',
        name: 'URL field',
      }, {
        type: 'Checkbox',
        name: 'Checkbox field',
      }, {
        type: 'Selection',
        name: 'Selection field',
      }],
      buildForm: [],
    };
  },
  methods: {
    assignIdAndType(index, type) {
      this.buildForm[index].id = Math.random().toString(36).substr(2, 9);
      this.buildForm[index].type = type;
    },
    addNewField(event) {
      this.assignIdAndType(event.newIndex, event.item.attributes.type.value);
      this.openFieldModal(this.buildForm[event.newIndex].id);
    },
    openFieldModal(id) {
      this.addFieldModalShowing = true;
      const fieldIndex = this.buildForm.findIndex((field) => field.id === id);
      this.addFieldModalData = this.buildForm[fieldIndex];
    },
    updateField(form) {
      const fieldIndex = this.buildForm.findIndex((field) => field.id === form.id);
      this.buildForm[fieldIndex] = form;
    },
    deleteField(id) {
      const index = this.buildForm.findIndex((field) => field.id === id);
      this.buildForm.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: auto;
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

  .content-wrapper {
    padding: 12px 36px 36px 36px;
  }

  .build-wrapper {
    display: flex;
  }

  .build-options {
    border: 1px solid #ccc;
  }

  .build-option {
    height: 40px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px solid #f4f4f4;
    }

    &:hover {
      background-color: #c4c7ff;
    }
  }

  .build-area {
    width: 300px;
    min-height: 100px;
    background-color: #dde9ff;
    padding: 6px 0px;
  }

  .form-container {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 24px;
  }
</style>
