"use strict";

const generatePermalink = require("../../utils/generatePermalink.js");

module.exports = {
    layout: "layouts/page.njk",
    eleventyComputed: {
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => {
            if (data.page.fileSlug === data.locale) {
                return "index";
            }

            return data.page.fileSlug;
        },
        eleventyNavigation: data => {
            if (data.order) {
                return {
                    parent: data.locale,
                    order: data.order,
                    key:  data.key || data.title
                };
            }
            return false;
        },
        /* Build a permalink using the title and language key, or to the 404 page. */
        permalink: data => {
            if (data.page.fileSlug !== "404") {
                return generatePermalink(data);
            }

            if (data.locale !== data.config.defaultLanguage) {
                return `/${data.config.languages[data.locale].slug}/404.html`;
            }
            return "/404.html";
        }
    }
};
