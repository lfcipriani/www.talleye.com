---
title: 'Rubygem: cheatorious'
description: Manager and generator of simple, searchable, command line cheatsheets
datePublished: '2012-01-19T00:00:00Z'
author: Luis Cipriani
tags: code, ruby, tool, command line, CLI, cheatsheet
image: /img-posts/rc-thumb.jpg
---

> Being victorious through a means so amazing it cannot possibly be achieved without cheating.
>
> _\- Urban Dictionary_

[cheatorious](https://github.com/lfcipriani/cheatorious) is a generator of simple, searchable, shareable, modular command-line cheatsheets.

Cheatsheets are very good to start learning or keep knowledge of some language or tool, but very often you just don't have the proper cheatsheet at hand when you need to remember that cryptic keyboard shortcut. Furthermore, wouldn't be nice to keep or create your own cheatsheets in a neat ruby DSL? Wouldn't be great if you have easy access to them, such as via command-line interface?

## TL;DR;

- Install Cheatorious: gem install cheatorious
- Import a cheatsheet from [cheatorious cheatsheet repository](https://github.com/lfcipriani/cheatorious-cheatsheets).
- Create your cheatsheet
- Check examples folder in repository
- Type `cheatorious search CHEATSHEETNAME KEYWORD` or `cheatorious view` to access your cheatsheets
- If you use Alfred 2, download the Cheatorious workflow in examples folder

## Install

```
gem install cheatorious
```

Cheatorious is compatible with ruby 1.8.x, 1.9.x, 2.0.x, rubinius, jruby, ree and more.

## [](https://github.com/lfcipriani/cheatorious#creating-your-cheatsheet)

## Creating your Cheatsheet

Create a file and use the following syntax, shown in the example below:

```ruby
cheatsheet_for "Simple VIM" do
    # put some info about you, if you want to share this later
    description "A simple VIM cheatsheet for tests"
    author      "Luis Cipriani", "github.com/lfcipriani"
    version     "1.0.0"

    # you can configure some keyboard keys variables, you can change it later to fit your personal preferences
    key :control, "^"
    key :esc    , "<esc>"
    key :leader , ","

    # your prefered keyboard keys separators (default is empty string)
    key_separator " "

    # this is an cheatsheet entry, the first parameter is what the entry does, the other are the shortcuts or descriptions
    __ "Enter insertion mode", "i"
    __ "Exit insertion mode" , _esc

    # you can create sections, that will be searchable
    section "Basic Movement" do
        __ "character left, right, line up, line down", "h", "l", "k", "j"
        __ "word/token left, right"                   , "b", "w"
    end

    section "Scrolling" do
        # this is how you use the pre-configured keyboard keys
        __ "scroll line up, down", (_control "E"), (_control "Y")
        __ "scroll page up, down", (_control "F"), (_control "B")
        __ "crazy scroll", (_leader _control "A") # this is just to show you can combine keys \o/
    end

    section "Files" do
        __ "Open file", ":e"

        # you can go infinitely deep with sections (seriously)
        section "Saving" do
            __ "Save file", ":w"
        end
    end
end
```

## Using cheatorious

The basic CLI usage goes as follows:

```bash
$ cheatorious                                        # get help
$ cheatorious view CHEATSHEET [OPTIONS]              # view a CHEATSHEET. The CHEATSHEET variable could be a name (for imported cheatsheets) or a file that describes a cheatsheet.
$ cheatorious search CHEATSHEET [KEYWORD] [OPTIONS]  # search for KEYWORD in CHEATSHEET entries only. The CHEATSHEET variable could be a name (for imported cheatsheets) or a file that describes a che...
$ cheatorious alias NAME CHEATSHEET                  # return a shell alias command with NAME for easy access to searching a CHEATSHEET. The CHEATSHEET variable must be an imported cheatsheet. Exampl...
$ cheatorious edit CHEATSHEET                        # edit an existent CHEATSHEET. Will open it in the default terminal editor, use CHEATORIOUS_EDITOR environment variable to use another.
$ cheatorious import FILE                            # import a cheatsheet description FILE. Check https://github.com/lfcipriani/cheatorious to learn how to create your own cheatsheets. Check https:/...
$ cheatorious list                                   # lists the available cheatsheets. See 'import' command.
$ cheatorious reload CHEATSHEET                      # reload a CHEATSHEET after editing it with 'edit' command
$ cheatorious remove CHEATSHEET                      # remove a CHEATSHEET. The original file is kept for later recovering
$ cheatorious writers [OPTIONS]                      # lists the available writers or set a default
$ cheatorious help [COMMAND]                         # Describe available commands or one specific command
```

### Searching

To search on your cheatsheets:

```bash
$ cheatorious help search
Usage:
  cheatorious search CHEATSHEET [KEYWORD] [OPTIONS]

Options:
  -s, [--section]        # matches KEYWORD only on section names, returning all entries and sections inside it.
  -r, [--reverse]        # reverse means to search only the values of a cheatsheet (and not entries, as usual). For example, search by shortcuts.
  -S, [--sensitive]      # case sensitive search (insensitive is default).
  -w, [--writer=WRITER]  # writer to use for the output. If not set, uses the default.

search for KEYWORD in CHEATSHEET entries only.
The CHEATSHEET variable could be a name (for imported cheatsheets) or a file that describes a cheatsheet.
Omit KEYWORD to view the full cheatsheet.
```

### Alias

If you are tired to type everything above to do a simple search, use the alias command:

```bash
$ bin/cheatorious help alias
Usage:
  cheatorious alias NAME CHEATSHEET

return a shell alias command with NAME for easy access to searching a CHEATSHEET.
The CHEATSHEET variable must be an imported cheatsheet.
Example: cheatorious alias svim simple_vim >> ~/.bashrc
         next time just use: svim KEYWORD [OPTIONS]
```

It will just **show** the alias command, it's up to you to decide where to put it.

### Editing, reloading, removing

```bash
$ cheatorious edit CHEATSHEET    # edit an existent CHEATSHEET. Will open it in the default terminal editor, use CHEATORIOUS_EDITOR environment variable to use another.
$ cheatorious reload CHEATSHEET  # reload a CHEATSHEET after editing it with 'edit' command
$ cheatorious remove CHEATSHEET  # remove a CHEATSHEET. The original file is kept for later recovering
```

## Writers

Cheatorious has a default Text writer to give a fairly nice output for your cheatsheet. Since we can have multiple writers avaiable, you can list and set a default writer through the command _writers_:

```bash
$ bin/cheatorious help writers
Usage:
  cheatorious writers [OPTIONS]

Options:
  -d, [--default=DEFAULT]  # set a default writer for next searches.

lists the available writers or set a default
```

I'll work to provide more options of output as soon as possible (markdown, colored, HTML, etc), but you can also contribute writing your own writers and sending a pull request to this project. Check the examples folder to see a Writer sample, you just need to implement that interface.

## Tips to improve the experience!

- Create aliases to save typings in the cheatsheets you use more
- Sync your cheatsheets with Dropbox by creating a symlink for the `~/.cheatorious` folder
