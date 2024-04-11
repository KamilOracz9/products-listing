import { Types } from "~/enums/flashMessage";

type State = {
    messages: Message[];
}

type Message = {
    id?: number;
    message: string;
    type: Types;
}

const useFlashMessageStore = defineStore('flashMessage', {
    state: (): State => ({
        messages: [],
    }),
    actions: {
        addMessage(message: Message) {
            if(!message.id) message.id = Date.now();

            this.messages.push(message);

            setTimeout(() => {
                this.messages = [...this.messages.filter(item => item.id !== message.id)];
            }, 5000)
        },
    },
})

export default useFlashMessageStore;