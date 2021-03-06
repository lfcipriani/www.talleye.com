---
title: 'Projeto: @oquevernaCP'
description: Robô no Twitter para ajudar os participantes da Campus Party Brasil 2014 a encontrar algo legal para assistir.
datePublished: '2014-01-29T00:00:00Z'
author: Luis Cipriani
tags: code, ai, ruby, bot, twitter, campus party
image: /img-posts/po-thumb.jpg
lang: pt-BR
---

Para ba Campus Party Brasil 2014, eu criei um bot do Twitter que ajudava os participantes a descobrir quais palestras acompanhar, dado que no evento acontecem inúmeras palestras simultâneas. Eu também apresentei o projeto em uma palestra no mesmo evento. O bot funcionava mais ou menos assim:

![](/img-posts/po-tweet.png)

O texto que segue é de um post compartilhado na Campus Party.

## Quer saber como criar um robô como esse?

O Twitter fará duas palestras na Campus Party Brasil para mostrar o potencial da Plataforma, suas APIs e o código do @oquevernaCP. A agenda é a seguinte:

- **Quarta, 29/01 as 14:30** - O Twitter e suas APIs de Streaming. [Palco #pitagoras](http://www.campus-party.com.br/2014/agenda-pitagoras.html)
- **Quinta, 30/01 as 10:30** - Workshop: Capture o momento com as APIs do Twitter. [Palco #workshop2](http://www.campus-party.com.br/2014/agenda-workshop2.html)

## Como tweetar para @oquevernaCP?

Se quiser apenas obter uma sugestão rápida, apenas crie um tweet com o texto "[@oquevernaCP](https://twitter.com/intent/tweet?related=TwitterDevBr&text=%40oquevernaCP)" que ele vai retornar a próxima palestra ou evento do calendário. Você também pode usar as hastags [#agora](https://twitter.com/intent/tweet?related=TwitterDevBr&text=%40oquevernaCP+%23agora) ou [#depois](https://twitter.com/intent/tweet?related=TwitterDevBr&text=%40oquevernaCP+%23depois).

## Tecnologias utilizadas

- ruby 2.0.0
- [API de Streaming do Twitter (GET user)](https://dev.twitter.com/docs/api/1.1/get/user)
- [Redis](http://redis.io/)
- gem tweetstream

Se estiver interessado em como o bot foi feito, você pode [acessar o código-fonte](https://github.com/lfcipriani/oquevernaCP).
