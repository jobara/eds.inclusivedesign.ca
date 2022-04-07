"use strict";

const config = require("../_data/config.json");
const TemplateConfig = require("@11ty/eleventy/src/TemplateConfig.js");
const eleventyConfig = new TemplateConfig();
const slugFilter = eleventyConfig.userConfig.getFilter("slugify");

module.exports = (data) => {
    /* If this page is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!Object.prototype.hasOwnProperty.call(data, "title")) {
        return false;
    }

    const locale = data.locale;
    const localeSlug = config.languages[locale].slug || locale;
    const slug = slugFilter(data.title);
    const root = (locale === config.defaultLanguage) ? "/" : `/${localeSlug}/`;

    if (locale === data.page.fileSlug) {
        return root;
    }

    return `${root}/${slug}/`;
};
