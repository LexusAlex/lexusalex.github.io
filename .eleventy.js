const fs = require('fs');
const htmlmin = require('html-minifier');
const markdown = require('markdown-it')({ html: true });
const prettydata = require('pretty-data');
const { DateTime } = require('luxon');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('src/favicon.ico');
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addPassthroughCopy('src/scripts');
    eleventyConfig.addPassthroughCopy('src/styles');
    eleventyConfig.addPassthroughCopy('src/fonts');

    eleventyConfig.setBrowserSyncConfig({ open: true});

    eleventyConfig.addFilter('readableDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd.LL.yyyy');
    });

    eleventyConfig.addFilter('htmlDateString', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('htmlmin', (value) => {
        return htmlmin.minify(
            value, {
                removeComments: true,
                collapseWhitespace: true
            }
        );
    });

    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.html')) {
            const result = htmlmin.minify(
                content, {
                    removeComments: true,
                    collapseWhitespace: true
                }
            );

            return result;
        }

        return content;
    });

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        addPassthroughFileCopy: true,
        templateFormats: ["html", "njk", "md"],
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