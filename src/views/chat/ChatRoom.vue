<template>
  <div id="app">
    <div class="left-panel">
      <toolbar></toolbar>
      <div class="content">
        <card></card>
        <list></list>
      </div>
    </div>
    <div class="main">
      <chattitle></chattitle>
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
import sidebar from '../../components/chat/sidebar.vue'
import card from '../../components/chat/card'
import list from '../../components/chat/list.vue'
import message from '../../components/chat/message.vue'
import usertext from '../../components/chat/usertext.vue'
import toolbar from "../../components/chat/toolbar";
import chattitle from "../../components/chat/chattitle"

export default {
  name: 'ChatRoom',
  mounted() {
    this.$store.dispatch('initData');
    this.$store.dispatch('connect');
  },
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state))
    })
  },
  components: {
    sidebar,
    toolbar,
    card,
    list,
    message,
    usertext,
    chattitle
  }
}
</script>

<style lang="scss" scoped>
#app {
  margin: 20px auto;
  width: 900px;
  height: 650px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  display: flex;
  background-color: #fafafa;
  background-image:
      radial-gradient(circle at 15% 30%, rgba(255, 200, 200, 0.3), transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(200, 255, 200, 0.3), transparent 40%),
      radial-gradient(circle at 50% 80%, rgba(200, 200, 255, 0.3), transparent 40%);
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.left-panel {
  display: flex;
  height: 100%;
}

.toolbar {
  width: 60px;
  height: 100%;
}

.content {
  width: 240px;
  height: 100%;
  background: rgba(236, 234, 232, 0.25);
  backdrop-filter: blur(10px);
  color: #000;
}

.main {
  flex-grow: 1;
  height: 100%;
  background: rgba(238, 238, 238, 0.25);
  backdrop-filter: blur(10px);
}
</style>
