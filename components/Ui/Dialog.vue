<style>
.dialog {
    z-index: 999;
    border: 1px solid black;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: white;
    width: max-content;

    &>.message {
        margin-bottom: 2rem;
    }

    &>form {
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
        <div class="dialog-content min-h-[90vh] flex flex-col" @click.stop>
            <div class="message flex-1">
                <slot name="message">
                    <!-- <p>Domyślna wiadomość dialogu</p> -->
                </slot>
            </div>

            <form method="dialog">
                <slot name="actions">
                    <!-- <button type="submit" @click="closeDialog">OK</button> -->
                </slot>
            </form>
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