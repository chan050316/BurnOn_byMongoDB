const express = require("express");
const router = express.Router();
const fs = require("fs");
const Quote = require("../models/quote");

const musicFolder = "./public/audios";
const alarmFolder = "./public/alarmSounds";
const cafeteriaMenusData = "./public/data/cafeteriaMenus.json";
let randumQuote;
const getQuoteData = async () => {
  try {
    const quotes = await Quote.find();
    console.log(quotes);
    return quotes;
  } catch (e) {
    console.log(e);
  }
};

router.get("/", (req, res) => {
  fs.readFile(cafeteriaMenusData, "utf8", (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.render("home", { cafeteriaMenusData: data });
  });
});

router.get("/timer", async (req, res) => {
  await getQuoteData();

  fs.readdir(musicFolder, "utf8", (err, musicfilelist) => {
    for (i in musicfilelist) {
      const fileName = musicfilelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      musicfilelist[i] = fileName.substr(0, mp3TextNum);
    }
    fs.readdir(alarmFolder, function (err, alarmfilelist) {
      for (i in alarmfilelist) {
        const fileName = alarmfilelist[i];
        const mp3TextNum = fileName.indexOf(".mp3");
        alarmfilelist[i] = fileName.substr(0, mp3TextNum);
      }
      res.render("timer", {
        musicNames: musicfilelist,
        alarmNames: alarmfilelist,
        quoteData: randumQuote,
      });
    });
  });
});

router.get("/pomodoro", async (req, res) => {
  await getQuoteData();
  const cookie = JSON.stringify(req.cookies.json);
  if (!cookie) {
    console.log("You come this page first time!");
    res.cookie(
      "json",
      {
        visitRecord: "FirstTime",
      },
      { path: "/pomodoro" }
    );
  } else {
    res.cookie(
      "json",
      {
        visitRecord: "moreFirstTime",
      },
      { path: "/pomodoro" }
    );
    console.log("You come this page not first time!");
  }
  fs.readdir(musicFolder, "utf8", (error, musicfilelist) => {
    for (i in musicfilelist) {
      const fileName = musicfilelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      musicfilelist[i] = fileName.substr(0, mp3TextNum);
    }
    fs.readdir(alarmFolder, function (err, alarmfilelist) {
      for (i in alarmfilelist) {
        const fileName = alarmfilelist[i];
        const mp3TextNum = fileName.indexOf(".mp3");
        alarmfilelist[i] = fileName.substr(0, mp3TextNum);
      }
      res.render("pomodoro", {
        musicNames: musicfilelist,
        alarmNames: alarmfilelist,
        quoteData: randumQuote,
      });
    });
  });
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

router.get("/settingQuote", async (req, res) => {
  await getQuoteData();
  // console.log(quotes);

  res.render("settingQuote", { quotes });
});

router.post("/settingQuote/addQuote", (req, res) => {
  try {
    const quote = new Quote(req.body.author, req.body.quote);
    quote.save();
    console.log("Create data success!");
  } catch (e) {
    console.log(e);
  }
  Quote.create({
    quote_text: req.body.quote,
    quote_author: req.body.author,
  })
    .then(result => {
      console.log(result);
      res.redirect("/settingQuote");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
