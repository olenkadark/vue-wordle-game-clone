<template>
  <transition name="fade">
    <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button type="button" class="modal-close-icon" @click="closeModal">
            <img src="@/assets/close-icon.svg" alt="Close" />
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    isVisible: Boolean,
    title: String
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}
.modal-header{
  padding: 0 0 15px 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
  border-bottom-style: solid;
  box-sizing: border-box;
}
.modal-title {
  font-size: 1.5rem;
  line-height: 2rem;
  color:rgb(17, 24, 39);
  font-weight: 600;
  margin: 0;
}
.modal-close-icon {
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.375rem;
  border-radius: 0.5rem;
  align-items: center;
  display: inline-flex;
  background: transparent;
  border: none;
}
.modal-close-icon:hover{
  background-color: rgb(229 231 235);
}
.modal-close-icon img{
  width: 25px;
}
</style>
