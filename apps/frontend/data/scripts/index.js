const fs = require("fs");
const path = require("path");

const languages = ["en", "es", "de"];
const BASE_API_URL = "http://localhost:1337/api/contents";

const OUTPUT_DIR = path.resolve(__dirname, "../testFetch");

async function fetchAndStoreForLanguage(lang) {
  try {
    const res = await fetch(`${BASE_API_URL}?locale=${lang}`);
    const json = await res.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error(`Invalid response for locale ${lang}`);
    }

    for (const entry of json.data) {
      const fileName = `${lang}-${entry.collection}.json`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      fs.writeFileSync(filePath, JSON.stringify(entry.data, null, 2), "utf-8");
      console.log(`File generated ${fileName}`);
    }
  } catch (err) {
    console.error(`Error in processing ${lang}:`, err.message);
  }
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const lang of languages) {
    await fetchAndStoreForLanguage(lang);
  }

  console.log("Process successfully");
}

run();
