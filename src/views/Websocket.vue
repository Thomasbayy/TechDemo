<template>
  <div>
    <h2>Simple websocket</h2>
    <div class="message-label">Message</div>
    <input v-model="inputMessage">
    <button @click="sendToWebsocket" :disabled="!inputMessage" class="send-button">Send</button>
    <div class="received-messages-title">
      Received messages
      <span v-if="connectionSuccess" class="connected">(connection successful)</span>
    </div>
    <div v-for="(message, i) in receivedMessages" :key="i">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocketConnection: null,
      inputMessage: '',
      receivedMessages: [],
      connectionSuccess: false,
    };
  },
  created() {
    this.websocketConnection = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);
    this.websocketConnection.onopen = () => {
      this.connectionSuccess = true;
    };
    this.websocketConnection.onmessage = (event) => {
      this.receivedMessages.push(event.data);
    };
  },
  methods: {
    sendToWebsocket() {
      this.websocketConnection.send(this.inputMessage);
      this.inputMessage = '';
    },
  },
};
</script>

<style scoped lang="scss">

  .message-label {
    font-size: 12px;
  }

  .send-button {
    background-color: #41B883;
    color: #fff;
    border: none;
    padding: 6px;
    margin-left: 4px;
    cursor: pointer;
  }

  .connected {
    color: #41B883;
    font-size: 12px;
    font-weight: normal;
  }

  .received-messages-title {
    margin-top: 30px;
    font-weight: bold;
  }
</style>
