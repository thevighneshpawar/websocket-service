import { createServer } from "node:http";
import { Server } from "socket.io";

const wsServer = createServer();

const io = new Server(wsServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (data) => {
    socket.join(String(data.tenantId));
    socket.emit("join", `Joined room for tenant ${data.tenantId}`);
  });
});

export default {
  wsServer,
  io,
};
