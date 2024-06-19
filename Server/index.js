const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World")
})


const server = http.createServer(app)
const PORT = 5000 || process.env.PORT

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("New connection established", socket.id)

    socket.on("send_message", (message) => {
        // console.log("Message received", message)

        io.emit("recevied_message",message)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})



server.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
