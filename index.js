import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

const submissions = [
    {
        chapterName: "Space Wolves",
        chapterColour: "Grey-Blue",
        foundingChapter: "N/A",
        chapterDescription: "Angry Space Vikings"
    },
    {
        chapterName: "Blood Angels",
        chapterColour: "Blood Red",
        foundingChapter: "N/A",
        chapterDescription: "Melancholic, depressed space vampires"
    },
    {
        chapterName: "Dark Angels",
        chapterColour: "Green, Beige or Black (Depending on the section)",
        foundingChapter: "N/A",
        chapterDescription: "Space knights, based off a mix of Arthurian legend and Biblical demons"
    }
];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { submissions });
});

app.get("/new-chapter", (req, res) => {
    res.render("create-chapter.ejs");
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

