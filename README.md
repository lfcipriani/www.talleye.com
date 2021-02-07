New iteration of [talleye.com](https://www.talleye.com), my personal website.

Built with:

- React
- [Next.js](https://nextjs.org/).
- [remark](https://remark.js.org/): for markdown processing

## Setup development

Clone this repository, make sure to use Node.js `10.13.0` or greater. Then:

    > npm install
    > npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality assurance

To run unit tests:

    > npm run test

A prettier check and linter will run before the test. We use [husky](https://github.com/typicode/husky#readme) to setup a pre-commit hook that will run the test.

Other checks:

    > npm run lint     # this will run eslint
    > npm run prettify # this will run prettier and write in all the files that need fixes
