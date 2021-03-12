![](/public/ogImage.jpg)

Source code of [talleye.com](https://www.talleye.com), my personal website.

## Features

- Posts written in Markdown
- Dark and light theme
- RSS feed
- Basic SEO capabilities
- Reading time calculation
- Multiple locales support

Built with:

- React
- [Next.js](https://nextjs.org/).
- [remark](https://remark.js.org/): for markdown processing
- [rehype](https://github.com/rehypejs/rehype): for HTML processing
- Among other dependencies

## Development Setup

Clone this repository, make sure to use Node.js `14.15.4` or greater. Then:

    > npm install
    > npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

To run unit tests:

    > npm test

Run `npm run ci` to also execute prettier and linter checks.

## Deploy

[Vercel](https://vercel.com) is used to host the website, this means that to deploy you just need to push code to `main` branch.

## Licensing

- Source code distributed under MIT License
- Content of the website under [Creative Commons](https://creativecommons.org/licenses/by-nc/4.0/)
