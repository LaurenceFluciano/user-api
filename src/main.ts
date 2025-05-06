import express from "express"
import userRoute from "./routes/user.routes.js";  // Corrigido para a importação correta
import authRoute from "./routes/user.auth.routes.js";  // Corrigido para a importação correta
const app = express() 
app.use(express.json())
app.use("/users/", userRoute)
app.use("/auth/", authRoute)

app.listen(3000)
