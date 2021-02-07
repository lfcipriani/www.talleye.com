---
title: Markdown test post
description: This post has all the formatting elements so we can work on markdown styles.
datePublished: '2021-01-02T00:00:00.000Z'
author: Luis Cipriani
tags: markdown, test
image: /img/brook.jpg
---

# Hello!

This post has all the formatting elements so we can work on markdown styles.

## H2

### H3

#### H4

##### H5

###### H6

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# Alt-H1

## Alt-H2

# text styles

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Lorem ipsum dolor sit amet, [consectetur adipiscing elit](https://www.talleye.com), sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. **Ut enim ad minim veniam**, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. _Duis aute irure dolor in reprehenderit_ in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ==occaecat cupidatat non proident==, sunt in <mark>culpa qui officia deserunt</mark> mollit anim id est laborum.

~~You can also strikeout texts.~~

# lists

1. First ordered list item
2. Another item

- Unordered sub-list.
  - Indentation
  - another one
- another one please
- back to normal

1. Actual numbers don't matter, just that it's a number
1. Ordered sub-list
1. And another item.

   Some text that should be aligned with the above item.

- Unordered list can use asterisks

* Or minuses

- Or pluses

# links

[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself][]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

# Images

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 2'

# Code

Inline `code` has `back-ticks around` it. Inline `code` has `back-ticks around` it. Inline `code` has `back-ticks around` it. Inline Inline Inline `code` has `back-ticks around` it. Inline `code` has `back-ticks around` it. Inline `code` has `back-ticks around` it. Inline `code` has `back-ticks around` it.

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);

const processedContent = await remark()
  .use(remark2rehype)
  .use(rehypePrism)
  .use(sanitize)
  .use(stringify)
  .process(matterResult.content);
const contentHtml = processedContent.toString();
```

A paragraph here just to check margins.

    Four spaces code style
    testing 1,2,3

# blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is [long enough to actually](google.com) wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

# tables

|                  | ASCII                           | HTML                          |        |
| ---------------- | ------------------------------- | ----------------------------- | ------ |
| Single backticks | `'Isn't this fun?'`             | 'Isn't this fun?'             |        |
| Quotes           | `"Isn't this fun?"`             | "Isn't this fun?"             |        |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash | # html |

Colons

| Tables        |      Are      |          Cool |
| ------------- | :-----------: | ------------: |
| col 3 is      | right-aligned | right aligned |
| col 2 is      |   centered    |            re |
| zebra stripes |   are neat    |            re |

Optional pipes

| Markdown | Less                                                                                                           | Pretty     |
| -------- | -------------------------------------------------------------------------------------------------------------- | ---------- |
| _Still_  | `renders`                                                                                                      | **nicely** |
| 1        | a very long cell with a lot of content on it so we can check how much it work bla bla bla iuehfieufheifuheifuh | 3          |

# HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

<table>
  <tr>
    <th></th>
    <th>Tables</th>
    <th>Are</th>
    <th>Cool</th>
  </tr>
  <tr>
    <th>Zebra</th>
    <td>Stripes</td>
    <td>Are</td>
    <td>Pretty</td>
  </tr>
  <tr>
    <th>Here</th>
    <td>Is</td>
    <td>Another</td>
    <td>Row</td>
  </tr>
</table>

# Horizontal rule

Three or more...

---

Hyphens

---

Asterisks

---

Underscores

# linebreaks

With only a single newline, this line and
this line will be a _single line_.

But this one is separated by two newlines and so will be a _separate paragraph_.

This line has two spaces at the end (hard for you to see, but trust me!).  
So this is a separate line in the _same paragraph_.

# youtube

<a href="https://www.youtube.com/watch?feature=player_embedded&v=ARted4RniaU
" target="_blank"><img src="https://img.youtube.com/vi/ARted4RniaU/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

Pure markdown version:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ARted4RniaU/0.jpg)](https://www.youtube.com/watch?v=ARted4RniaU)

# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |

## Tasklist

- [ ] to do
- [x] done
