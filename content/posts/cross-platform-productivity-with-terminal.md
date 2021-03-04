---
title: Cross platform productivity with Terminal
description: A proposal on how to keep your productivity up when you use different operating systems simultaneously.
datePublished: '2017-02-07T00:00:00.000Z'
author: Luis Cipriani
tags: article, tool, terminal, macos, linux, platform
image: /img-posts/cppwt-alfred.png
---

At work I use a Mac, at home I have a Lenovo notebook with [ArchLinux](https://www.archlinux.org/) installed. There's several reasons why people, and specially developers, adopt different platforms simultaneously and there's nothing wrong with that, in fact, we are just adopting the right tool for the right job… or budget.

However, it can be annoying when you depend on productivity tools that are not available on all platforms. You also start to think twice before buying a license for a tool that won't be available on one of the platforms you adopt. Cross platform consistent user experience is hard, but we can find ways to solve this issue. This article will focus on how to improve the experience for one kind of tool:

## Keyboard triggered Productivity and Assistant tool

The title above is my tentative to classify tools like [Mac Alfred](https://en.wikipedia.org/wiki/Alfred_%28software%29), [Ubuntu Unity Dash](https://en.wikipedia.org/wiki/Unity_%28user_interface%29#Dash), [Gnome Shell overview](https://en.wikipedia.org/wiki/GNOME) and [others](http://alternativeto.net/software/alfred/).

![](/img-posts/cppwt-alfred.png)
_Above a screenshot of Alfred in action._

The way they work is simple. After a global keyboard shortcut is hit by the user, they can type commands to:

- Launch applications
- Search desktop
- Open URLs and search specific sites
- Calculate something
- Manage clipboard
- Even trigger more complex workflows that can be customized

It's a true Swiss-army tool that saves a lot of time, but given that most of them are not cross-platform because of their deep relationship with the operating system, it's really hard to find a consistent experience. If we had a tool that was as powerful as these ones, reachable from a simple keyboard shortcut and available on all these platforms would be nice, right? Right?

## Introducing… Terminal

Nothing new here, just the plain and simple terminal you are used to have available in any operating system. Basically we just need to find a way to have the same experience as these keyboard triggered productivity and assistant tools. As I'll show below, it's totally possible to achieve something similar, sometimes even more powerful. Let's do it!

### **Keyboard Shortcut**

First important thing is to have a terminal that pops up by hitting a simple keyboard shortcut, luckily this is a feature that can be easily found in the most popular Terminal apps.

On Mac, I use [**iTerm2**](http://iterm2.com/features.html) support for Hotkey window and `CMD+space` to trigger that terminal.

On Linux, I use [**Guake**](http://guake.org/) with `Super+space` shortcut.

Usually I configure these terminals to hide when losing focus so you can have a better experience when executing a command that opens the browser, for example. You can also tweak the terminal fonts and color the way you want.

![](/img-posts/cppwt-terminal.png)
_Above: Guake terminal screen on ArchLinux with a Timezone custom command I created._

So far so good, we have a quick way of opening a Terminal, now we need a good set of commands and packages that reproduces the nice behavior we get with the other tools.

### Unix Shell

On both Mac and Linux I use [**zsh**](http://www.zsh.org/) and [**oh-my-zsh**](http://ohmyz.sh/) and this combination is perfect because already comes with a pretty good way of organizing the features I want to have on my productivity tool set. By creating a [oh-my-zsh plugin](https://github.com/robbyrussell/oh-my-zsh/wiki/Customization) you keep all configurations in one place and can easily edit them to tweak existing or add new features.

I have this file on my oh-my-zsh install (with a quite suggestive name):

```bash
$ ~/.oh-my-zsh/custom/plugins/terminalfred/terminalfred.plugin.zsh
```

All aliases and functions you add to that file will be available in your `PATH` when you open the terminal. In the next sections I'll show what I have on this file. If you are not patient, you can take a look on this [Gist](https://gist.github.com/lfcipriani/f6baa463fa1c600a5bf7ce3ecf764321#file-terminalfred-plugin-zsh).

What I also do is to keep that file on Dropbox and symlink to it from all machines I use. It's okay if you don't have any sensitive information in its content.

I'm confident that you can find a similar solution no matter the Unix Shell you use because in the end, what you need is only **installed packages, aliases and functions**.

### Searching the web

This is the most used feature and oh-my-zsh has a perfect plugin, called [web-search](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/web-search/web-search.plugin.zsh), that allows me to do this:

```bash
$ ddg how to ride a bicycle   # search duckduckgo
$ image beautiful bicycle     # search for images
$ map bicycle store           # search on a map
```

These commands will open a browser and do the search, more straightforward impossible. If you want to add your own custom searches, my approach to that was to copy that function in my custom plugin and add them manually:

```shell
alias urban=’terminalfred urban’
alias regex=’terminalfred regex’
alias shell=’terminalfred shell’
alias jsonb=’terminalfred jsonb’
alias aur=’terminalfred aur’

function terminalfred() {
	emulate -L zsh

	# define search engine URLS
	typeset -A urls
	urls=(
		urban "http://www.urbandictionary.com/define.php?term="
		regex "https://regex101.com/library?orderBy=RELEVANCE&search="
		shell "http://explainshell.com/explain?cmd="
		jsonb "http://codebeautify.org/jsonviewer"
		aur "https://www.archlinux.org/packages/?q="
	)

	if [[ -z "$urls[$1]" ]]; then
		echo "Check available searches"
		return 1
	fi
	if [[ $# -gt 1 ]]; then
		url="${urls[$1]}${(j:+:)@[2,-1]}"
	else
		url="${(j://:)${(s:/:)urls[$1]}[1,2]}"
	fi
	open_command "$url"
}
```

### Quick calculator

From time to time I need to do quick calculations, for that one I use [Calc — C-style arbitrary precision calculator](http://www.isthe.com/chongo/tech/comp/calc/):

```shell
$ calc 24 * 4
     96
$ calc
C-style arbitrary precision calculator (version 2.12.5.0)
Calc is open software. For license details type:  help copyright
[Type "exit" to exit, or "help" for help.]

; 365/12
 ~30.41666666666666666667
; .*12
 365
; exit
```

### Dictionary

Few people know [DICT](https://en.wikipedia.org/wiki/DICT), a dictionary network protocol and its command line companion [dictd](http://linuxcommand.org/man_pages/dictd8.html), a dictionary database server. After installing dictionaries, it's fairly simple to use and the result is formidable:

```shell
$ dict formidable
3 definitions found

From WordNet (r) 3.0 (2006) [wn]:

formidable
      adj 1: extremely impressive in strength or excellence; "a
             formidable opponent"; "the challenge was formidable";
             "had a formidable array of compositions to his credit";
             "the formidable army of brains at the Prime Minister's
             disposal"
      2: inspiring fear; "the formidable prospect of major surgery";
         "a tougher and more redoubtable adversary than the heel-
         clicking, jackbooted fanatic"- G.H.Johnston; "something
         unnerving and prisonlike about high grey wall" [syn:
         {formidable}, {redoubtable}, {unnerving}]
...
```

To make it easy to use a few dictionaries and make the result more brief, I have the following aliases:

```bash
$ alias | grep dict
define='dict -d gcide'          # english definitions
dicts='dict -d moby-thesaurus'  # synonym dictionary
```

Follow [these instructions](https://www.unixmen.com/look-dictionary-definitions-via-terminal/) if you want to install it.

### Translations

Being a Brazilian living in Berlin makes me a heavy user of translation services. [Translate Shell](https://github.com/soimort/translate-shell) is the best tool for that.

```bash
$ trans -brief ‘Super fácil traduzir com essa ferramenta!’
Super easy to translate with this tool!
```

Of course having some alias to make commands shorter is always good:

```bash
$ alias | grep trans
tre=’trans -b’                 # translate with brief output
trep=’trans -b :pt’            # translate to Portuguese
tres=’trans -shell -brief’     # open a REPL to translate
trev=’trans -v’                # view translation in terminal pager
```

### Task management

I use [Trello](https://www.trello.com) as task manager and I have a simple board to track my daily TODOs, tasks that I should be focusing during the day. Another wanted featured was to be able to add tasks easily to that board.

![](/img-posts/cppwt-trello.png)
_Above: Sample execution, now on Mac._

Implementation is done using the [API](https://developers.trello.com/apis). I could have installed a Trello command line tool, but I decided to keep it simple and I have the following:

```shell
alias tasks='curl -s -X GET -H "Cache-Control: no-cache" -H "Terminalfred" "https://api.trello.com/1/lists/569623d6blablabla309c4d301?cards=open&card_fields=name&fields=cards&key=`cat ~/.secrets/trello.key.secret`&token=`cat ~/.secrets/trello.token.secret`" | jq ".cards[].name"'

function taskadd {
    str="$*"
    if [ -z "$str" ]; then
        echo usage: $0 task
    else
        curl -s -X POST -H "Cache-Control: no-cache" --data-urlencode "name=${str}" -H "Terminalfred" "https://api.trello.com/1/cards/?idList=569623d660blablablad301&key=`cat ~/.secrets/trello.key.secret`&token=`cat ~/.secrets/trello.token.secret`" | jq ".url"
    fi
}
```

In the code above I have one alias that basically do a request to fetch cards from a specific list on a board of mine. The result is in JSON format, then I use [jq tool](https://stedolan.github.io/jq/), a json command line processor to have a nice output like the snapshot shows above. The function to add a task is basically doing another request to create a card on the same list and as a result, I just add the link on the response.

Given that I want to sync zsh plugin file on Dropbox, the code expects to fetch Trello API secrets from a specific folder in my machines with the right permissions. Be safe!

### Launching applications

To mention one limitation of using exclusively the terminal, I didn't find a good way to replace GUI application launch and sometimes I still rely on Alfred, Gnome Dash or simply global shortcuts to open them. Even so, I have found one function in a [StackOverflow thread](http://stackoverflow.com/questions/13384139/elegant-and-efficient-way-to-start-gui-programs-from-terminal-without-spamming-i) that works if the GUI app command is available on the PATH:

```shell
o() {
    if [ $# -gt 0 ] ; then
        # Expand if $1 is an alias
        if [ $(alias | awk -F "[ =]" '{print $2}' | grep -x $1) > 0 ] ; then
            set -- $(alias $1 | awk -F "['']" '{print $2}') "${@:2}"
        fi
        ($@ &) &>/dev/null
    else
        echo "missing argument"
    fi
}
```

The main benefit is that you start the GUI app detached from terminal and avoiding `stdout` flooding your shell. However, to be honest, I don't use that much.

## Everything is possible

If you achieved that point in the article I believe you get the point, we just scratched the surface of what can be done with a Terminal and basically there's no limit on what you can do to automate tasks and be more productive. You can find other tools I use, such as consulting timezones or finding files, in [**my plugin file**](https://gist.github.com/lfcipriani/f6baa463fa1c600a5bf7ce3ecf764321#file-terminalfred-plugin-zsh).

Hope the lives of cross platform users are improved a little bit with that approach. As a last note, I purposely ignored Windows because I'm not an active user, but if you are able to have a similar setup using it let me know and I can update this article or link to yours.

_This post was originally published on [Hackernoon](https://hackernoon.com/cross-platform-productivity-tool-with-terminal-7dd0487ead93#.z4ve1oeuo)._
