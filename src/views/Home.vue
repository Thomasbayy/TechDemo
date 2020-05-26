<template>
  <div class="home">
    <div class="built-with-button" @click="showModal">What's this built with?</div>
    <modal v-model="modalShowing"></modal>
    <div class="greeting">Welcome to yet another portfolio</div>
    <div class="choose-demo">Choose a demo</div>
    <div class="demo-box">
      <div class="demo-item-wrapper" @mouseenter="showTech = 1" @mouseleave="showTech = false">
        <div class="demo-item" :class="{ 'demo-item-show': showDemo[0] }">Form builder</div>
      </div>
      <div class="demo-item-wrapper" @mouseenter="showTech = 2" @mouseleave="showTech = false">
        <div class="demo-item" :class="{ 'demo-item-show': showDemo[1] }">Hey 2</div>
      </div>
      <div class="demo-item-wrapper" @mouseenter="showTech = 3" @mouseleave="showTech = false">
        <div class="demo-item" :class="{ 'demo-item-show': showDemo[2] }">Hey 3</div>
      </div>
      <div class="demo-item-wrapper" @mouseenter="showTech = 4" @mouseleave="showTech = false">
        <div class="demo-item" :class="{ 'demo-item-show': showDemo[3] }">Hey 4</div>
      </div>
    </div>

    <div class="tech-title" v-if="showTech">Techs</div>
    <div class="tech-box" v-if="showTech">
      <div class="tech-item" v-for="item in hoveredTech" :key="item.name">
        <component class="tech-icon" :is="item.icon"></component>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>

// icons
import VuejsIcon from 'vue-material-design-icons/Vuejs.vue';
import FirebaseIcon from 'vue-material-design-icons/Firebase.vue';

// components
import Modal from '@/components/Modal.vue';

export default {
  name: 'Home',
  components: {
    VuejsIcon,
    FirebaseIcon,
    Modal,
  },
  data() {
    return {
      showDemo: [],
      showTech: false,
      modalShowing: false,
      allTech: [
        {
          name: 'Vue',
          icon: VuejsIcon,
        },
        {
          name: 'Vuex',
          icon: VuejsIcon,
        },
        {
          name: 'Firebase',
          icon: FirebaseIcon,
        },
      ],
    };
  },
  computed: {
    hoveredTech() {
      let techs = [];
      switch (this.showTech) {
        case 1:
          techs = this.allTech.filter((item) => ['Vue', 'Vuex'].includes(item.name));
          break;

        case 2:
          techs = this.allTech.filter((item) => ['Vue', 'Vuex', 'Firebase'].includes(item.name));
          break;

        case 3:
          techs = this.allTech.filter((item) => ['Vue', 'Firebase'].includes(item.name));
          break;

        case 4:
          techs = this.allTech.filter((item) => ['Vue'].includes(item.name));
          break;

        default:
          break;
      }
      return techs;
    },
  },
  mounted() {
    // fade in demos
    let fadeInWait = 500;
    const demoCount = 4;
    for (let i = 0; i < demoCount; i += 1) {
      setTimeout(() => {
        this.showDemo.push(true);
      }, fadeInWait);
      fadeInWait += 100;
    }
  },
  methods: {
    showModal() {
      console.log('x');
      this.modalShowing = true;
    },
  },
};
</script>

<style scoped lang="scss">

  //TODO Add variables for colors

  .built-with-button {
    position: absolute;
    padding: 12px;
    color: #41B883;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #41B883;
      color: #fff;
      -webkit-box-shadow: inset -4px -4px 10px 2px rgba(51,138,99,1);
      -moz-box-shadow: inset -4px -4px 10px 2px rgba(51,138,99,1);
      box-shadow: inset -4px -4px 10px 2px rgba(51,138,99,1);
    }
  }

  .home {
    overflow: auto;
    min-height: 100vh;
  }

  .greeting {
    color: #41B883;
    font-size: 30px;
    margin-top: 200px;
    text-align: center;
    animation: slideDown 0.5s ease-in forwards;
  }

  .choose-demo {
    font-size: 18px;
    text-align: center;
    margin-top: 30px;
  }

  .demo-box {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 24px;
    height: 160px;
  }

  .tech-box {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .tech-title {
    color: rgba(0, 0, 0, 0.15);
    text-align: center;
    margin-top: 30px;
  }

  .tech-item {
    color: #41B883;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 10px;
    min-width: 80px;

    span {
      // Overrides material icon size, can not be done through component prop
      font-size: 30px !important;
      margin-bottom: 4px;
    }

    &:not(:last-child) {
      border-right: 1px solid rgba(65, 184, 131, 0.4);
    }
  }

  .demo-item-wrapper {
    transition: all 0.2s ease-in-out;
    padding-bottom: 0px;
  }

  .demo-item-wrapper:hover {
    padding-bottom: 10px;
  }

  .demo-item-wrapper:hover .demo-item {
    background-color: #41B883;
    color: #fff;
    border: 1px solid #41B883;
  }

  .demo-item {
    height: 150px;
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    -webkit-box-shadow: 6px 5px 8px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 5px 8px -4px rgba(0,0,0,0.75);
    box-shadow: 6px 5px 8px -4px rgba(0,0,0,0.75);
    border: 1px solid #f4f4f4;
    border-radius: 8px;
    margin: 0px 10px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .demo-item-show {
    animation: fadeIn 0.2s ease-in forwards;
  }

  @keyframes slideDown {
    0% { margin-top: 150px; opacity: 0; }
    100% { margin-top: 200px; opacity: 1; }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1 }
  }

</style>
