import express from "express";
import morgan from "morgan"
import route from './src/routes/index.js';
import db from "./src/config/db/index.js";
import methodOverride from 'method-override'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from 'http';
import chat from "./src/chat/chat.js";
const app = express();

// env
dotenv.config();

// create server
const server = createServer(app); 
const io = new Server(server, {
    cors: {
        origin: process.env.REACT_URL,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


// cookieParser
// Phân tích nội dung có yêu cầu POST và PUT
app.use(cookieParser());

//connect moongoseDB
db.connect();

// Đường dẫn tương đối
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tạo port cho sever
const port = process.env.PORT || 3001;

app.use(methodOverride('_method'));

const corsOptions = {
    origin: process.env.REACT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

// cho phép kết nối với địa chỉ website khác
app.use(cors(corsOptions));

// Thiết lập nhận file json
app.use(express.json({limit: '50mb'}));

// Thiết lập nhận file url
app.use(express.urlencoded({limit: '50mb', extended: true}));

// link tới file public
app.use(express.static(path.join(__dirname, 'public')));

// console sau mỗi lần ctrl + s
app.use(morgan("dev"));

// làm views để dùng Embedded
app.set('view engine', 'ejs');

// nếu chỉ có file views/index.js thì không cần câu lệnh dưới đây
app.set('views', path.join('src', 'resources', 'views'));

// kết nối với các đường dẫn
route(app);

// socket.io
chat(io);

// lắng  nghe port và kết nối
server.listen(port, () => {
    console.log("Listening port: " + port);
})