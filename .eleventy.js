const { addNunjucksFilters } = require('./eleventy/nunjucks-fitlers');
const { addNunjucksShortcodes } = require('./eleventy/nunjucks-shortcodes');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {

    eleventyConfig.setBrowserSyncConfig({ open: true});
    eleventyConfig.addPassthroughCopy('src/assets');


    addNunjucksFilters(eleventyConfig);
    addNunjucksShortcodes(eleventyConfig);

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        addPassthroughFileCopy: true,
        templateFormats: ['njk', 'md', 'png', 'jpg', 'svg', 'html'],
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "docs",
            includes: "includes",
            layouts: "layouts",
            data: "data",
        }
    }
}