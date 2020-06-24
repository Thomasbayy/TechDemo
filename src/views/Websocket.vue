<template>
  <div>
    <div>
      <h2>Coinbase BTC websocket</h2>
      <div class="btc-wrapper">
        <div class="btc-item">
          <div>Buy</div>
          <div>{{ btcBuyPrice }}</div>
        </div>
        <div class="btc-item">
          <div>Sell</div>
          <div>{{ btcSellPrice }}</div>
        </div>
      </div>
    </div>
    <div>
      <h2>Simple echo websocket</h2>
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
  </div>

</template>

<script>
export default {
  data() {
    return {
      coinbaseWebsocketConnection: null,
      coinbaseConnectionSuccess: false,
      btcBuyPrice: 0,
      btcSellPrice: 0,
      websocketConnection: null,
      inputMessage: '',
      receivedMessages: [],
      connectionSuccess: false,
    };
  },
  created() {
    // Connecting to coinbase ws
    this.coinbaseWebsocketConnection = new WebSocket('wss://ws-feed.pro.coinbase.com/');
    this.coinbaseWebsocketConnection.onopen = () => {
      this.coinbaseConnectionSuccess = true;
      // subscribe to btc channel
      this.coinbaseWebsocketConnection.send(JSON.stringify({
        type: 'subscribe',
        channels: [{
          name: 'level2_50',
          product_ids: ['BTC-USD'],
        }],
      }));
    };

    // react on changes
    this.coinbaseWebsocketConnection.onmessage = (event) => {
      // console.log(JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data.type === 'l2update') {
        data.changes.forEach((change) => {
          const [type, price] = change;
          if (type === 'buy') this.btcBuyPrice = price;
          if (type === 'sell') this.btcSellPrice = price;
        });
      }
    };

    // Connecting to echo ws
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

  .btc-wrapper {
    display: flex;
    justify-content: space-around;
    width: 500px;
  }

  .btc-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
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
