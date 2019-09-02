const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

let cats = [
  { id: 1, name: "Crookshanks" },
  { id: 2, name: "Garfield" },
  { id: 3, name: "Stewart" }
];
let nextId = 4;

const findCat = id => cats.filter(cat => cat.id === id)[0];
const createCat = name => ({ id: nextId++, name: name });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// INDEX
// GET /cats
app.get("/cats", (req, res) => {
  res.render("cats_index", { cats: cats });
});

// NEW FORM
// GET /cats/new
app.get("/cats/new", (req, res) => {
  res.render("cats_new");
});

// CREATE CAT
// POST /cats
app.post("/cats", (req, res) => {
  // ...
  if (!req.body.name) {
    res.redirect("/cats/new");
    return;
  }

  const cat = createCat(req.body.name);
  cats.push(cat);

  res.redirect(`/cats/${cat.id}`);
});

// SHOW
// GET /cats/:id
app.get("/cats/:id", (req, res) => {
  const cat = findCat(parseInt(req.params.id, 10));

  if (cat) {
    res.render("cats_show", { cat: cat });
  } else {
    res.sendStatus(404);
  }
});

// EDIT FORM
// GET /cats/:id/edit
app.get("/cats/:id/edit", (req, res) => {
  const cat = findCat(parseInt(req.params.id, 10));

  if (!cat) {
    res.redirect("/cats");
    return;
  }

  res.render("cats_edit", { cat: cat });
});

// DELETE CAT
// POST /cats/:id/delete
app.post("/cats/:id/delete", (req, res) => {
  const id = parseInt(req.params.id, 10);

  cats = cats.filter(cat => cat.id !== id);

  res.redirect("/cats");
});

// UPDATE HANDLER
// POST /cats/:id
app.post("/cats/:id", (req, res) => {
  if (!req.body.name) {
    res.redirect(`/cats/${req.params.id}/edit`);
    return;
  }

  const cat = findCat(parseInt(req.params.id, 10));

  if (!cat) {
    res.redirect("/cats");
    return;
  }

  cat.name = req.body.name;
  res.redirect(`/cats/${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
