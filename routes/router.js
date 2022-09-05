const router = require("express").Router();
const fs = require("fs");
const Quote = require("../models/quote");
const mongoose = require("mongoose");

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
  const quotes = await getQuoteData();

  res.render("settingQuote", { quotes });
});

router.put("/settingQuote/add", async (req, res) => {
  const quote = new Quote(req.body);
  try {
    quote.save();
    console.log("Create data success!");
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/settingQuote/delete", async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId(req.body.id);
    console.log(_id);
    res.redirect("/settingQuote");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
