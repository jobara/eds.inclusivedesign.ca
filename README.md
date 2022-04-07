# Future of Work: Equitable Digital Systems website

[![Netlify Status](https://api.netlify.com/api/v1/badges/7e15b6e3-eade-491e-8410-ccbdfa06bf07/deploy-status)](https://app.netlify.com/sites/eds-site/deploys)

The codebase for the [Future of Work: Equitable Digital Systems](eds.inclusivedesign.ca) website.

## Running

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t eds .`
* Run the container: `docker run --name eds -p 8000:80 eds`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./dist/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./dist/`
directory to the web root of your server.

## Working with Netlify CMS

The [Netlify CMS](https://netlifycms.org/) configuration can be edited in [`src/admin/config.yml`](src/admin/config.yml).
For full documentation, see the [Netlify CMS documentation](https://www.netlifycms.org/docs/).

## Internationalization

The EDS site includes internationalization support for English (Canada) and French (Canada). To add a language, the
following changes need to be made:

1. Update the `languages` object of [`src/_data/config.json`](src/_data/config.json) to add the new language. For
   example, to add Farsi, you would use the [IETF language code](https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json)
   as the key, and add the following object values:

   * a short form of the language code for use in permalinks
   * a short form of the language code that corresponds to an available message bundle locale for Infusion's
     [User Interface Options](https://github.com/fluid-project/infusion/tree/main/src/framework/preferences/messages)
   * the direction (`ltr` for left to right or `rtl` for right to left)
   * the localized language name (endonym)

   ```json
   {
      "languages": {
         "fa-IR": {
            "slug": "fa",
            "uioSlug": "fa",
            "dir": "rtl",
            "name": "فارسی"
         }
      }
   }
   ```

   You can set the site's default language by changing the `defaultLanguage` value in [`src/_data/config.json`](src/_data/config.json)
   to the [IETF language code](https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json)
   of the desired default language.

2. Add the new language to [`src/_data/site.json`](src/_data/site.json), translating the content from the English
   source. The key will always be the language code as used in `config.json`.
3. Add folders in each collection for translated content. For example, you would add a folder called `fa-IR` to
   [`src/collections/pages`](src/collections/pages).
4. Create a localized version of the 404 page, following the example of [`src/404.fr-CA.md`](src/404.fr-CA.md).
   (Note: as per Eleventy's [default configuration](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files),
   Markdown files are processed with the Liquid template language. If for some reason one decides to modify this to use
   Nunjucks or another template language, the permalink syntax in all pages will need to be modified to use
   the chosen template language.)
5. To ensure that the 404 page is displayed in the appropriate language, verify that a redirect block has been added to
   the [netlify.toml](netlify.toml) file for each language following the examples. This feature is described in
   Netlify's [redirects documentation](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling).

For more information about how Netlify CMS works with internationalized content, see the
[internationalization support documentation](https://www.netlifycms.org/docs/beta-features/#i18n-support).

## License

Code is available under the
[New BSD License](https://raw.githubusercontent.com/inclusive-design/eds.inclusivedesign.ca/master/LICENSE.md).

Content is available under the
[Creative Commons Attribution 4.0 International License (CC BY 4.0)](http://creativecommons.org/licenses/by/4.0/).
