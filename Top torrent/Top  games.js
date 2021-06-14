const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const router = express.Router();
const top_shows_url = "https://thepiratebay10.org/top/205";
const app = express();
const fs = require("fs");
