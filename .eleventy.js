/*
Copyright the EDS Site copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/eds.inclusivedesign.ca/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/eds.inclusivedesign.ca/raw/main/LICENSE.md.
*/

"use strict";

const fs = require("fs");

const fluidPlugin = require("eleventy-plugin-fluid");
const navigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const i18n = require("eleventy-plugin-i18n-gettext");

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

// Import data files
const siteConfig = require("./src/_data/config.json");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/admin/config.yml": "admin/config.yml"});
    config.addPassthroughCopy({"src/assets/icons": "/"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(navigationPlugin);
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(i18n, {
        localesDirectory: "src/locales"
    });

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {

                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync("dist/404.html");
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.writeHead(404);
                    res.end();
                });
            }
        }
    });

    config.on("beforeBuild", () => {
        if (!siteConfig.languages[siteConfig.defaultLanguage]) {
            process.exitCode = 1;
            throw new Error(`The default language, ${siteConfig.defaultLanguage}, configured in src/_data/config.json is not one of your site's supported languages.`);
        }
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        },
        passthroughFileCopy: true
    };
};
