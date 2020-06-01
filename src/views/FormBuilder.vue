<template>
  <div class="wrapper">
    <AddFieldModal v-model="addFieldModalShowing"/>

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
              :type="element.name"
            >
              {{element.name}}
            </div>
          </draggable>
        </div>

        <div style="margin-right: 36px;">
          <div>Drag fields to build</div>
          <draggable
            class="build-area"
            v-model="buildForm"
            group="people"
            @add="openAddFieldModal"
          >
            <div
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
          <div>
            <div v-for="(item, index) in buildForm" :key="index">
              <div>{{ item.label }}</div>
              <input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable';
import AddFieldModal from '@/components/form-builder/AddFieldModal.vue';
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';

export default {
  components: {
    draggable,
    AddFieldModal,
    ArrowLeftIcon,
  },
  data() {
    return {
      addFieldModalShowing: false,
      buildOptions: [{
        name: 'Text',
      }, {
        name: 'Number',
      }, {
        name: 'Email',
      }, {
        name: 'URL',
      }, {
        name: 'Checkbox',
      }, {
        name: 'Selection',
      }],
      buildForm: [],
    };
  },
  methods: {
    openAddFieldModal(event) {
      console.log(event.item.attributes.type.value);
      this.addFieldModalShowing = true;
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
</style>
