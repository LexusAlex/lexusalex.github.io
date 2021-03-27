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

    eleventyConfig.addFilter('clear', (value) => {
        //console.log(array.val.replace(/<(.|\n)*?>/g, ''));
        //str.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, 'ReplaceIfYouWantOtherWiseKeepItEmpty');
        //return array.val.replace(/<[^>]*(>|$)|#|&|;|&nbsp;|&zwnj;|&raquo;|&quot;|&laquo;|&amp|&gt;/g, '');
        //console.log(value);
        //return value.replace(/<\/?[a-zA-ZА-Яа-я]|&+>/gui,'');
        //return value.replace(/[^а-яА-Я!. ]/gu,'');
        return value.replace(/<(.)*?>/gu,'');

    });
    // Collections
    eleventyConfig.addCollection("searchable", (collection) =>
        collection.getFilteredByGlob("./src/notes/**/*.md")
    )
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