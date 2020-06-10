<template>
  <div>
    <FieldModal
      @create="updateField"
      @delete="deleteField"
      v-model="addFieldModalShowing"
      :data="addFieldModalData"
    />

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
          <div class="form-store-options">
            <button
              :disabled="!storeForm.length"
              class="form-store-load"
              @click="loadForm"
            >Load</button>
            <button class="form-store-clear" @click="clearForm">Clear</button>
            <button class="form-store-save" @click="saveForm">Save</button>
          </div>
        </div>

        <div>
          <div>Form preview</div>
          <div class="form-container">
            <form style="width: 300px;">
              <FormField
                v-for="(field, index) in buildForm"
                :field="field"
                :key="index"
              ></FormField>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable';
import FieldModal from '@/components/form-builder/FieldModal.vue';
import FormField from '@/components/form-builder/FormField.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    draggable,
    FieldModal,
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
  computed: {
    ...mapGetters({
      storeForm: 'formBuilder/getForm',
    }),
  },
  methods: {
    loadForm() {
      this.buildForm = this.storeForm;
    },
    saveForm() {
      this.$store.commit('formBuilder/setForm', this.buildForm);
    },
    clearForm() {
      this.buildForm = [];
    },
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

  .form-store-options {
    display: flex;
  }

  .form-store-load, .form-store-save, .form-store-clear {
    flex: 1;
    height: 30px;
  }
</style>
