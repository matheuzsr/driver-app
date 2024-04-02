import express from "express";
import Signup from "../Signup";
import AccountDAO from "../database/dao/AccountDAOPostgres";

const app = express();
app.use(express.json());

const dao = new AccountDAO();
const signup = new Signup(dao);


app.post("/signup", async function (req:any, res:any) {
  try {
    const output = await signup.execute(req.body);
    res.json(output);
  } catch (error:any) {
    
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);