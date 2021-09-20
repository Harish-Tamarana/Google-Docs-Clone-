const mongoose = require("mongoose");
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});
const defaultValue = "";
mongoose.connect("mongodb://localhost/GoogleDocs", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
});
const Document = require("./document");

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await getorUpdateData(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      console.log("Yo");
      console.log(data);
      await Document.findByIdAndUpdate(documentId, { data: data });
    });
  });
});

async function getorUpdateData(id) {
  console.log("Hey bro ");
  if (id == null) return console.log("no id");
  const doc = await Document.findById(id);
  if (doc) {
    console.log("doc found");
    return doc;
  }
  return await Document.create({ _id: id, data: "Yo" });
}
