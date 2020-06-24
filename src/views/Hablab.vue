<template>
  <div>
    <h2>Lablab websocket
      <span v-if="connectionSuccess" class="connected">(connection successful)</span>
    </h2>
    <button class="send-button" @click="requestName">Generate name</button>
    <div class="received-name" v-if="hablabName">Got name: {{ hablabName }}</div>
  </div>
</template>

<script>

import socketio from 'socket.io-client';

export default {
  data() {
    return {
      websocketConnection: null,
      connectionSuccess: false,
      hablabName: null,
    };
  },
  created() {
    this.websocketConnection = socketio('https://ws.assignment.klikkit-eu-2.k8s.hablab.io');

    this.websocketConnection.on('connect', () => {
      this.connectionSuccess = true;
    });

    this.websocketConnection.on('new name', (evt) => {
      this.hablabName = evt;
    });
  },
  methods: {
    requestName() {
      this.websocketConnection.emit('name');
    },
  },
};
</script>

<style scoped lang="scss">
  .connected {
    color: #41B883;
    font-size: 12px;
    font-weight: normal;
  }

  .send-button {
    background-color: #41B883;
    color: #fff;
    border: none;
    padding: 6px;
    margin-left: 4px;
    cursor: pointer;
  }

  .received-name {
    margin-top: 12px;
  }
</style>
