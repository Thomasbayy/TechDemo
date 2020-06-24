<template>
  <div>
    <h2>Lablab websocket</h2>
    <button @click="requestName">Generate name</button>
  </div>
</template>

<script>

import socketio from 'socket.io-client';

export default {
  data() {
    return {
      websocketConnection: null,
    };
  },
  created() {
    this.websocketConnection = socketio('http://ws.assignment.klikkit-eu-2.k8s.hablab.io');
  },
  methods: {
    requestName() {
      console.log('hej');
    },
  },
};
</script>
