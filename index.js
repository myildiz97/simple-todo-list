import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const listItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const getToday = () => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date().toLocaleDateString();
  const day = weekday[new Date().getDay()];
  const today = `${day}, ${date}`;
  return today;
};

const addNewItem = (item) => item && listItems.unshift(item);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listItems: listItems,
    today: getToday(),
  });
});

app.post("/add", (req, res) => {
  const { todo } = req.body;
  addNewItem(todo);
  res.render("index.ejs", {
    listItems: listItems,
    today: getToday(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});