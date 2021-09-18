let ws: WebSocket | null = null;

let subscribers = {
  'messages-received': [] as MessagedReceivedType[],
  'status-changed': [] as StatusChangedType[]
}

const handleClose = () => {
  notifyAboutStatus('pending');
  setTimeout(createChannel, 5000);
}
const handleMessage = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach(s => s(newMessages));
}
const handleOpen = () => {
  notifyAboutStatus('ready');
}
const handleError = () => {
  notifyAboutStatus('error');
}

const cleanUp = () => {
  ws?.removeEventListener('close', handleClose);
  ws?.removeEventListener('message', handleMessage);
  ws?.removeEventListener('open', handleOpen);
  ws?.removeEventListener('error', handleError);

}

const notifyAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status));
}

function createChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifyAboutStatus('pending')
  ws.addEventListener('close', handleClose);
  ws.addEventListener('message', handleMessage);
  ws.addEventListener('open', handleOpen);
  ws.addEventListener('error', handleError);
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(eventName: EventsNames, callback: MessagedReceivedType | StatusChangedType) {
    //@ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe(eventName: EventsNames, callback: MessagedReceivedType | StatusChangedType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  }
}
type MessagedReceivedType = (messages: ChatMessageType[]) => void;
type StatusChangedType = (status: StatusType) => void;
type EventsNames = 'messages-received' | 'status-changed';
export type StatusType = 'pending' | 'ready' | 'error';
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}
