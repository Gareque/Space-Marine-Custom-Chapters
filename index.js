import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

const submissions = [
    {
        chapterName: "Crimson Fists",
        chapterColour: "Dark blue with a red left fist",
        foundingChapter: "Imperial Fists",
        chapterDescription: "The Crimson Fists are known for their stoic resilience and tactical precision. "
    },
    {
        chapterName: "Angels of Absolution",
        chapterColour: "Bone-white armor with dark green and black accents",
        foundingChapter: "Dark Angels",
        chapterDescription: "A highly secretive successor of the Dark Angels, sharing in their ominous quest to hunt down the Fallen."
    },
    {
        chapterName: "Novamarines",
        chapterColour: "Blue and white quartered armor with gold trim",
        foundingChapter: "Ultramarines",
        chapterDescription: "Proud defenders of the Codex Astartes, known for their discipline and loyalty."
    }
];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { submissions });
});

app.get("/new-chapter", (req, res) => {
    res.render("create-chapter.ejs");
});

// Routes for the founding chapters
app.get("/dark-angels", (req, res) => {
  res.render("founding-chapters/dark-angels.ejs");
});

app.get("/white-scars", (req, res) => {
  res.render("founding-chapters/white-scars.ejs");
});

app.get("/space-wolves", (req, res) => {
  res.render("founding-chapters/space-wolves.ejs");
});

app.get("/imperial-fists", (req, res) => {
  res.render("founding-chapters/imperial-fists.ejs");
});

app.get("/blood-angels", (req, res) => {
  res.render("founding-chapters/blood-angels.ejs");
});

app.get("/iron-hands", (req, res) => {
  res.render("founding-chapters/iron-hands.ejs");
});

app.get("/ultramarines", (req, res) => {
  res.render("founding-chapters/ultramarines.ejs");
});

app.get("/salamanders", (req, res) => {
  res.render("founding-chapters/salamanders.ejs");
});

// Secret Route on clicking the Aquila
app.get("/emperor", (req, res) => {
  res.render("emperor.ejs");
});

app.post("/submit", (req, res) => {
    const newChapter = {
        chapterName: req.body.chapterName,
        chapterColour: req.body.chapterColour,
        foundingChapter: req.body.foundingChapter,
        chapterDescription: req.body.chapterDescription
    };

    submissions.push(newChapter);
    console.log(newChapter);
    res.redirect('/');
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const chapter = submissions[id];

  if (chapter) {
    res.render("edit-chapter.ejs", { chapter, id });
  } else {
    res.status(404).send("Chapter not found");
  }
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (submissions[id]) {
    submissions[id] = {
      chapterName: req.body.chapterName,
      chapterColour: req.body.chapterColour,
      foundingChapter: req.body.foundingChapter,
      chapterDescription: req.body.chapterDescription
    };
  }

  res.redirect("/"); // or "res.redirect('/index')" if that's your route
});

// DELETE route to remove data by ID
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && submissions[id]) {
    submissions.splice(id, 1);
  }
  res.redirect("/");
});

app.get("/custom", (req, res) => {
    res.json(submissions);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

