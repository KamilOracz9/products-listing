<style>
.dialog {
    z-index: 999;
    border: 1px solid black;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: white;
    width: max-content;
    overflow: hidden;

    &>.dialog-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    &>.dialog-content>.message {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    &>.dialog-content>form {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }
}

.dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>

<template>
    <dialog ref="dialogRef" class="dialog" @click="handleBackdropClick">
        <div class="dialog-content" @click.stop>
            <div class="message">
                <slot name="message">
                </slot>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
interface Props {
    isOpen?: boolean
}

interface Emits {
    (e: 'close'): void
    (e: 'open'): void
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false
})

const emit = defineEmits<Emits>()

const dialogRef = ref<HTMLDialogElement>()

watch(() => props.isOpen, (newValue) => {
    if (!dialogRef.value) return

    if (newValue) {
        dialogRef.value.showModal()
        emit('open')
    } else {
        dialogRef.value.close()
    }
})

const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogRef.value) {
        closeDialog()
    }
}

const closeDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.close()
        emit('close')
    }
}

onMounted(() => {
    if (dialogRef.value) {
        dialogRef.value.addEventListener('close', () => {
            emit('close')
        })
    }
})
</script>