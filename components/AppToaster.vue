<template>
  <Teleport to="body">
    <div class="app-toaster" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="app-toast"
          :class="`app-toast--${toast.tone}`"
          :role="toast.tone === 'error' ? 'alert' : 'status'"
        >
          <Icon :name="toast.tone === 'error' ? 'lucide:circle-alert' : 'lucide:circle-check'" aria-hidden="true" />
          <span>{{ toast.title }}</span>
          <button type="button" class="app-toast__close" :aria-label="$t('a11y.dismissNotification')" @click="remove(toast.id)">
            <Icon name="lucide:x" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts, remove } = useAppToast()
</script>

<style lang="scss" scoped>
.app-toaster {
  position: fixed;
  right: spacing(lg);
  bottom: spacing(lg);
  z-index: 10000;
  display: grid;
  gap: spacing(sm);
  width: min(420px, calc(100vw - 2rem));
  pointer-events: none;
}

.app-toast {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: spacing(sm);
  padding: spacing(md);
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary);
  border-radius: border-radius(lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  pointer-events: auto;

  &--error {
    border-left-color: var(--error);
  }

  &--success {
    border-left-color: var(--success);
  }
}

.app-toast__close {
  display: grid;
  width: 32px;
  height: 32px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: border-radius(md);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
