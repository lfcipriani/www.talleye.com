---
title: Breve introdução ao XMPP
description: Uma introdução ao protocolo XMPP, usado em várias aplicações web em tempo real.
datePublished: '2010-02-02T00:00:00Z'
author: Luis Cipriani
tags: xmpp, web, arquitetura, intro
image: /img-posts/bix-thumb.jpeg
lang: pt-BR
---

Apesar de ser um protocolo não muito novo (sim, 10 anos não é muito novo), o número de aplicações que utilizam [XMPP](http://www.xmpp.org 'Website do protocolo') (Extensible Messaging and Presence Protocol) vêm crescendo substancialmente apenas nos últimos anos. Exemplos de aplicações que usam XMPP para implementar a troca de mensagens entre componentes e usuários incluem: [Google Wave](https://wave.google.com 'Site do Google Wave'), [Chesspark](https://www.chess.com/chesspark.html 'Xadrez online Chesspark'), [Collecta](http://www.collecta.com 'Busca em tempo real'), [Superfeedr](http://www.superfeedr.com 'Agregador de feeds Superfeedr'), entre outros.

Ele muitas vezes é lembrado apenas como um protocolo para criar _chats_ e restrito apenas à plataforma cliente, mas não nos prendamos a esse pensamento simplista, existe muito mais poder que pode ser extraído das mensagens trafegadas por essa camada de aplicação.

Segundo os autores do protocolo, o XMPP é uma tecnologia aberta para comunicação em tempo real que permite a criação de vários tipos de aplicações, tais como instanting messaging, presença, chats multi-usuários, chamadas de voz e vídeo, colaboração, middleware, content syndication e qualquer transmissão de dados via [XML](http://en.wikipedia.org/wiki/XML 'XML na wikipedia'). Talvez a definição mais curta possível seja: **é um protocolo para a criação de middlewares orientado a mensagens**. E canais de troca de mensagens existem em qualquer sistema distribuído, e acredite, XMPP pode ser usado em cada um deles, desde que, é claro, isso traga benefícios ao sistema ou ao desenvovimento.

## Do que é feito o XMPP?

O protocolo XMPP situa-se na camada de aplicação e é comumente transportado por conexões [TCP](http://en.wikipedia.org/wiki/Transmission_Control_Protocol 'TCP na Wikipedia'). Ele constitui-se de XML e possui apenas 3 unidades básicas de transporte, chamados _stanzas_: presence, message e iq. Iremos apresentar brevemente cada stanza, mas se quiser mais detalhes acesse o [RFC do XMPP](http://xmpp.org/rfcs/rfc3921.html#stanzas 'Seção de stanzas do RFC do XMPP'):

### Presence

```xml
<presence from="cipriani@talleye.com/casa">
	<status>Ouvindo música...</status>
</presence>
```

O stanza de presença tem a funcionalidade de notificar servidores e a lista de contatos sobre o status de um usuário na rede XMPP. Essa é uma das grandes vantagens do XMPP em relação à outros protocolos de mensageria, pois a propagação de presença faz parte da especificação e portanto deve ser implementado por clientes e servidores por padrão. No exemplo acima, o usuário `cipriani@talleye.com/casa` está notificando a rede XMPP de que ele está online, e mais, ouvindo música.

Outro detalhe importante é a forma de endereçamento dos stanzas, ou melhor, de que forma você identifica unicamente um usuário na rede XMPP. No exemplo, o usuário é o `cipriani@talleye.com/casa`. “cipriani” é o nome do usuário, “talleye.com” é o host ao qual esse usuário pertence e a palavra “casa” é o recurso, utiliza-se o recurso para permitir que um mesmo usuário esteja conectado ao mesmo tempo em vários clientes diferentes (o usuário poderia ter um recurso de nome “escritório” por exemplo). Esses três pedaços constituem o **Jabberd ID**, ou _JID_, e é utilizado em todos os tipos de stanzas.

### Message

```xml
<message to="pedro@shorteye.com/escritorio"  from="cipriani@talleye.com/casa"  type="chat">
	<body>Cadê você?</body>
</message>
```

No stanza acima, um usuário envia uma mensagem para outro, do tipo “chat” com o conteúdo (body) “Cadê você”. Os stanza de mensagem é enviado e o cliente não deve esperar nenhuma resposta do servidor informando que a entrega foi feita, ele apenas envia para o usuário destino ou armazena caso o usuário esteja offline.

### IQ (Info Query)

```xml
<iq type="set" id="an_id"
     from="cipriani@talleye.com/casa"
     to="talleye.com">
    <query xmlns="jabber:iq:roster"/>
</iq>
```

Diferente do stanza message, cada stanza iq enviado ao servidor deve obter uma resposta, por isso existe o atributo type, que pode ter valores set ou get, e como resposta o usuário recebe um outro iq de tipo result ou error, dependendo do status.

No caso do stanza acima, estamos requisitando ao servidor XMPP a lista de contatos de um usuário. E a tag query dentro do iq nos remete a uma outra funcionalidade do protocolo XMPP, talvez a mais importante, que são as extensões!

## Extensões

O significado da sigla XML é Extensible Markup Language. O XMPP usa XML para implementar o protocolo. Opa, peraí, quer dizer então que eu posso extender o XMPP? Sim!

O desenvolvedor é livre para incluir qualquer XML dentro ou fora dos stanzas, desde que seu cliente e servidor XMPP conheçam o seu significado. Para que o protocolo não virasse bagunça e todos pudessem usufruir de servidores e bibliotecas que implementam extensões, contruiu-se uma comunidade para especificar e publicar as especificações.

Após 10 anos, há um número alto de exensões, por exemplo, algumas disponíveis são:

- Service Discovery: extensão para que um usuário possa acessar quais serviços um servidor XMPP oferece.
- Multi-User Chat: extensão para criar salas de bate-papo multi usuários.
- Jingle: extensão que permite chamadas via vídeo.
- Bidirectional-streams Over Synchronous HTTP (BOSH): essa extensão permite um cliente HTTP conectar em um servidor XMPP por meio de um connection manager, cuja responsabilidade é converter uma sessão XMPP de HTTP para TCP.
- Publish-Subscribe (PubSub): essa extensão implementa o modelo Publicador/Observador, no qual um observador pode assinar um canal do publicador. E cada vez que um item for publicado nesse canal, o observador irá recebê-lo.
- Tem muito mais de onde essas vieram, sugiro [dar uma olhada](http://xmpp.org/extensions/ 'Lista de extensões do XMPP').

## Por quê XMPP?

Quais as razões que faria com que eu utilizasse o XMPP como protocolo ao invés de qualquer outra implementação, como [AMQP](http://en.wikipedia.org/wiki/AMQP 'AMQP na Wikipedia') ou até um protocolo mais simples escrito por mim mesmo?

Como tudo na computação, não tem nenhuma tecnologia que é boa para todos os casos, por isso a melhor resposta é aquela de sempre: depende! Primeiro vamos dar uma olhada em alguns motivos que favorecem o uso do XMPP:

Por ter uma comunidade forte o XMPP é um protocolo sólido, vários fluxos já foram pensados, testados e é um protocolo ativo, que se adapta às necessidades dos seus usuários. Além disso ele é apoiado por bibliotecas e servidores que implementam e oferecem as principais extensões, é descentralizado (e por isso, escalável), seguro e extensível.

Por outro lado, dependendo da complexidade da aplicação, o XMPP pode ser muito burocrático e um protocolo mais simples é bem mais efetivo. O mesmo acontece se você tentar utilizar uma extensão XMPP quando na verdade já existe algum outro protocolo especialista em um modelo de mensagem.

Por experiência própria, já iniciei um sistema que nem imaginava utilizar XMPP, mas à medida que a arquitetura foi crescendo ele foi se tornando um protocolo interessante e por fim se transformou no principal componente. Enfim, o importante é conhecer suas opções, estudar e experimentar. Mas sempre tenha na sua lista o XMPP e suas extensões, pois muito do que o arquiteto de software precisa criar já está escrito em algumas de suas especificações.
