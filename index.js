import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

const submissions = [];

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

app.get("/custom", (req, res) => {
    res.json(submissions);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

