import express from "express"
import connectDB from "./config/key.js";
import router  from "./routes/userRoute.js";
 const app = express();
 const port = 1700

connectDB()

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


///////////////Targeting User routes///////////////////////
app.use('/', router);

app.listen(process.env.PORT || port, () => console.log(`Server runnig on http://localhost:${port}`));
