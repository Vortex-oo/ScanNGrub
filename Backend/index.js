import connectDB from "./DataBase/db.js";
import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ownerRoute from "./routes/owner.routes.js";
import restaurantRoute from "./routes/re.routes.js";

const app = express();
const port = 3000;

await connectDB()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/user',userRoutes)
app.use('/owner',ownerRoute)
app.use('/restaurant',restaurantRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});