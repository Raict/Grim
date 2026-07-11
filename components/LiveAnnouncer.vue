<template>
  <div
    id="live-announcer"
    aria-live="polite"
    aria-atomic="true"
    class="sr-only"
  >
    {{ announcement }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

const props = defineProps<Props>()

const announcement = ref('')

const announce = (message: string) => {
  announcement.value = ''
  nextTick(() => {
    announcement.value = message
  })
}

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    announce(newMessage)
  }
})

// Глобальна функція для сповіщень
if (process.client) {
  ;(window as Window & { announceToScreenReader?: typeof announce }).announceToScreenReader = announce
}

defineExpose({
  announce
})
</script>

<style lang="scss" scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
