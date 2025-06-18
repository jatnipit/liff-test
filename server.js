import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 8888;

const baseUrl = "https://api.line.me/v2/bot";

const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

app.post("/send-message", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const body = {
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };

    const response = await axios.post(`${baseUrl}/message/push`, body, {
      headers,
    });

    console.log("response: ", response.data);

    res.json({ message: "Send message success!", responseData: response.data });
  } catch (error) {
    console.log("error: ", error.response);
  }
});

app.get("/", (req, res) => {
  console.log("GET / requested");
  res.status(200).json({ message: "request success" });
});

app.listen(port, (req, res) => {
  console.log(`listening at port:${port}`);
});
