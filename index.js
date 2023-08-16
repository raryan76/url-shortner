require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require("cors")

const app = express();
const PORT = 8001;

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.log(error.message))

app.use(express.json());
app.use(cors())

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
console.log()

module.exports = app;