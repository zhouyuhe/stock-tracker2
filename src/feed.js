import { socketService } from "services/socketService";
const socket = socketService.get();
export default {
  onChange(callback) {
    socket.on("stock", callback);
  },
  subscribe(stock) {
    socket.emit("subToStock", stock);
  },
  unsubscribe(stock) {
    socket.emit("unSubToStock", stock);
  }
};
