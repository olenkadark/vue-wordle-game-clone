<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'info' // 'info', 'error', 'success'
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showToast(duration = 2000) {
      this.visible = true;
      if( this.timeoutHandle ){
        clearTimeout(this.timeoutHandle);
      }
      this.timeoutHandle = setTimeout(() => {
        this.visible = false;
      }, duration);
    }
  },
  watch: {
    message: function(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== '') {
        this.showToast();
      }
    }
  }
}
</script>

<style scoped>
.toast {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%); /* Align the center of the toast to the center of the game field */
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.toast.info {
  background-color: #3498db;
}
.toast.error {
  background-color: #e74c3c;
}
.toast.success {
  background-color: #2ecc71;
}
</style>
