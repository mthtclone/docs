const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const cheerio = require("cheerio");

module.exports = function (eleventyConfig) {

  /* =========================
     PASSTHROUGH FILES
  ========================= */
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets");

  /* =========================
     MARKDOWN CONFIG
  ========================= */
  const md = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "",
      placement: "after"
    })
  })
  .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", md);

  /* =========================
     SAFE JSON FILTER (fixes escaping issues)
  ========================= */
  eleventyConfig.addFilter("json", (value) => {
    return JSON.stringify(value);
  });

  /* =========================
     HEADINGS EXTRACTOR (for search index)
  ========================= */
  eleventyConfig.addFilter("extractHeadings", (content) => {
    if (!content) return [];

    const $ = cheerio.load(content);

    let headings = [];

    $("h2, h3, h4").each(function () {
      const el = $(this);

      const text = el.text();
      const id = el.attr("id");

      if (!id) return;

      headings.push({
        text,
        id,
        level: el.get(0).tagName
      });
    });

    return headings;
  });

  /* =========================
     TOC TRANSFORM (unchanged)
  ========================= */
  eleventyConfig.addTransform("toc", function (content, outputPath) {

    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    const $ = cheerio.load(content);

    let toc = [];

    $("h2, h3, h4").each(function () {
      const el = $(this);
      const text = el.text();
      const id = el.attr("id");

      if (!id) return;

      toc.push({
        level: el.get(0).tagName,
        text,
        id
      });
    });

    const tocHtml = `
      <ul class="toc">
        ${toc.map(item => `
          <li>
            <a data-level="${item.level}" href="#${item.id}">
              ${item.text}
            </a>
          </li>
        `).join("")}
      </ul>
    `;

    $("#toc").replaceWith(tocHtml);

    return $.html();
  });

  /* =========================
     ELEVENTY CONFIG
  ========================= */
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};