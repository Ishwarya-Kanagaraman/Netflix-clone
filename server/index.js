const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.port || 5000;
const dotenv = require("dotenv");
const {MONGO_URL} = require("./config/dev.js")
const authRoute=require("./routes/auth.js");
const userRoute=require("./routes/users.js");
const movieRoute=require("./routes/movies.js");
const listRoute=require("./routes/lists.js")

dotenv.config();
// 7zZcBrIbP5g25sff mongo password for netflix clone

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("MongoDB is successfully connected!"))
.catch(err=>console.log(err))

app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists",listRoute)

app.get("/",(req,res)=>{
  res.send("Welcome to Netflix clone project")
})

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
