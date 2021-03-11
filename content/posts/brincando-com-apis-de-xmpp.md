---
title: Brincando com APIs de XMPP
description: Introdução e exemplo de como consumir APIs que usam o protocolo XMPP.
datePublished: '2010-02-03T00:00:00Z'
author: Luis Cipriani
tags: xmpp, web, arquitetura, intro, api
image: /img-posts/bax-thumb.png
lang: pt-BR
---

Primeiramente, antes de ler este artigo, se quiser saber o básico sobre XMPP, leia meu artigo anterior: [Breve introdução ao XMPP](/pt-BR/posts/breve-introducao-ao-xmpp).

Hoje em dia, todo indivíduo envolvido com Web já consumiu alguma API HTTP, isso já é parte do dia a dia de qualquer desenvolvimento de aplicação web. Porém, nos últimos meses, começaram a aparecer alguns websites oferecendo APIs em outros protocolos, entre eles, o XMPP. Consumir uma API com esse protocolo é um pouco mais complicado que uma versão HTTP, mas o escopo e os benefícios obtidos são bem diferentes, como demonstraremos neste artigo.

## XMPP em aplicações Web

Enquanto não temos suporte completo aos [websockets](http://dev.w3.org/html5/websockets/ 'Especificação de websockets na W3C') do HTML5, que seria uma maneira de criar conexões TCP a partir do browser, a alternativa é usar a extensão [BOSH](http://xmpp.org/extensions/xep-0124.html 'Especificação do BOSH') do XMPP, que especifica como um cliente deve usar o XMPP via uma conexão HTTP. Vamos olhar com mais detalhe nos componentes envolvidos nesse tipo de conexão no diagrama abaixo, roubado diretamente da especificação da extensão:

    Servidor XMPP
        |
        |  [unwrapped data streams]
        |
    BOSH Connection Manager
        |
        |  [HTTP + <body/> wrapper]
        |
    Cliente (Browser)

- **Entre o browser e o BOSH Connection Manager**: por meio de long polling ou de qualquer outra técnica [Comet](http://en.wikipedia.org/wiki/Comet_%28programming%29 'Veja os tipos de técnicas Comet'), o browser envia requisições HTTP que respeitam a especificação BOSH (o HTTP + `<body>` wrapper no diagrama acima) para um gerenciador de conexões (BOSH connection manager), cuja responsabilidade é identificar a sessão XMPP e manter as informações dessa sessão.
- **Entre o BOSH connection manager e o servidor XMPP**: o connection manager deve criar e manter uma conexão TCP para cada sessão aberta com o servidor XMPP e é dessa forma que a tradução HTTP para TCP é feita.

Esse BOSH connection manager pode ser tanto um componente da sua infra quanto implementado dentro do próprio servidor XMPP. Você pode encontrar mais informações sobre esses conectores em [http://xmpp.org/tech/bosh.shtml](http://xmpp.org/tech/bosh.shtml).

### Strophejs

O [Strophejs](http://code.stanziq.com/strophe 'Website do Strophejs') é uma biblioteca que implementa um cliente de XMPP em javascript, logo, pode ser utilizado em aplicações web. Entre as funcionalidades que essa biblioteca implementa, podemos citar:

- está em conformidade com a especificacão BOSH e o XMPP;
- é cross-browser;
- possui builders e usa jQuery, o que facilita o manuseio de XML;
- suporta vários métodos de autenticação;
- faz long polling e permite requisições HTTP cross-domain por meio de um componente flash;

## Mashup de comparação em tempo real

O objetivo dessa aplicação é permitir que o usuário possa comparar dois assuntos (palavras-chave) de sua escolha em tempo real. Por exemplo, podemos disparar uma busca para comparar as linguagens Java e Ruby em tempo real.

Para que isto seja possível, iremos utilizar a API XMPP do [Collecta](http://www.collecta.com 'Website do Collecta'), um site de busca em tempo real. A API do Collecta utiliza o modelo [Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html 'Especificação do PubSub') para publicar os resultados de busca em tempo real para os usuários da API. Então vamos rever o cenário:

- Logo ao abrir o site a aplicação web connecta anonimamente no servidor XMPP por meio do Strophe;
- O usuário entra com uma busca;
- A aplicação web se inscreve em um nó pubsub (no caso, a busca);
- Ao confirmar a inscricão, a aplicação web está pronta para receber os eventos publicados;
- Ao receber um evento, a aplicação web faz um parse do XML e apresenta o resultado em HTML;
- O usuário pode agora comparar os resultados;

Todo o código deste exemplo está no [Github](http://github.com/lfcipriani/real-time-comparison 'acesse o projeto no Github') caso queira acompanhar e executar o exemplo. Antes de detalharmos o que acontece em cada fluxo, as dependências dessa aplicação são as seguintes:

- jQuery: auxilia bastante no parsing de XML;
- flXHR.js: componente flash que permite requisições cross-domain, necessário para a aplicação se conectar num servidor XMPP em outro domínio;
- strophejs: sem ele não conseguimos usar o XMPP;
- dependências do strophejs: códigos para gerar md5, base64 e usar o componente flash;
- API key do Collecta: para usar a API do Collecta você precisa de uma [chave](http://developer.collecta.com/KeyRequest 'para requisitar a chave de API do Collecta').

Mesmo sendo todo implementado em HTML e Javascript, é importante servir essa página em um servidor web, para que o componente flash funcione.

Então vamos apresentar como se implementa cada fase do fluxo dessa aplicação (o foco será apenas no código javascript):

### Ao abrir o site

A inicialização da conexão ao servidor XMPP já é feita logo que o usuário abre o site.

```javascript
// config.js
var Config = {
  API_KEY: 'YOUR_COLLECTA_API_KEY',
  BOSH_SERVICE: 'http://collecta.com/xmpp-httpbind',
  HOST: 'guest.collecta.com',
};
```

No arquivo de configuração acima, temos 3 itens importantes: a chave da API, o BOSH connection manager ao qual iremos conectar (tente abrir essa URL no seu browser) e o host (servidor XMPP) que queremos conectar. Temos um problema nesse ponto, a chave da API vai ser exposta aos usuários. Para o caso da API do Collecta, o único problema seria outro usuário consumir o rate limit, mas mesmo assim o time da Collecta deve procurar alternativas ainda, uma vez que a API é nova.

```javascript
// real-time-comparison.js
// initiating a BOSH connection to create an anonymous connection to the Collecta XMPP server
connection = new Strophe.Connection(Config.BOSH_SERVICE);
connection.connect(Config.HOST, null, onConnect);
```

Graças ao strophejs, basta criar uma conexão como é feito acima, passando o serviço BOSH que deseja usar e depois chamar a função _connect_ desse objeto. Os parâmetros passados são o host desejado, o usuário (que é null porque desejamos conectar anonimamente) e a referência à função que deve ser chamada (callback) ao receber algum status do processo de conexão.

```javascript
// real-time-comparison.js
function onConnect(status) {
  if (status == Strophe.Status.CONNECTING) {
    // ... outros status
  } else if (status == Strophe.Status.CONNECTED) {
    // adding one handler for each type of XMPP stanza
    connection.addHandler(onPresence, null, 'presence', null, null, null);
    connection.addHandler(onIq, null, 'iq', null, null, null);
    connection.addHandler(onMessage, null, 'message', null, null, null);
    console.log('Sending presence...');
    // app is available to use only after sending and receiving presence from the server
    connection.send($pres().tree());
  }
}
```

A função _onConnect_, ao receber o status informando que está conectado, irá criar os 3 _handlers_ necessários para tratar o recebimento de cada um dos 3 stanzas existentes no XMPP. O primeiro parâmetro é o callback de referência e depois o tipo do stanza (leia a documentação do strophejs para saber quais são os outros parâmetros). Após a criação dos handlers, em toda conexão XMPP que é feita, o cliente deve enviar um stanza de presença para o servidor. Como estamos conectando anonimamente, neste caso, após o envio desse stanza, o servidor deve retornar um stanza de presença informando o Jabber ID do usuário anônimo.

```javascript
// real-time-comparison.js
function onPresence(prs) {
  // in this case, presence got from the XMPP server means to activate UI and allow user to enter the 2 terms to compare
  console.log('Got presence!');
  anonymous_jid = $(prs).attr('to');
  // ... outras coisas
  return true;
}
```

Sendo assim, quando o servidor retorna a presença, nós simplesmente parseamos o xml com jQuery e pegamos o atributo “to”, que indica pra quem o servidor está mandando essa presença, ou seja, o usuário da aplicação. É importante retornar _true_ no fim desse callback, pois sem ele o strophejs irá apagar esse handler. Com o return true, o handler não será apagado e deverá ser reutilizado no próximo stanza de presença que esse cliente receber.

### O usuário entra com uma busca

Neste momento o usuário pode entrar com a busca no campo, ao clicar no botão “Go”, a seguinte função é chamada:

```javascript
// real-time-comparison.js
function startComparison() {
  // creates 2 search subscriptions and send the request to Collecta XMPP API via Strophejs
  console.log('Subscribing to nodes: ' + terms[0] + ' and ' + terms[1]);
  connection.send(Collecta.subscribeSearchStanza(terms[0]).tree());
  connection.send(Collecta.subscribeSearchStanza(terms[1]).tree());
}
```

### Inscrição em um nó Pubsub de busca

Para evitar repetição de código, criamos uma pequena biblioteca chamada Collecta que monta os stanzas necessários para inscrever e desinscrever em um nó Pubsub, que representam as buscas. Nesta biblioteca também se encontra uma função para converter os resultados de busca de XML para JSON a fim de ser usado na hora de construir o HTML para o usuário.

```javascript
// real-time-comparison.js
var Collecta = {
    subscribeSearchStanza: function(searchName) {
    // generate XML for a search subscription on Collecta XMPP API
    return $iq({type: 'set', from: anonymous_jid, to: 'search.collecta.com', id: searchName })
      .c('pubsub', {xmlns: 'http://jabber.org/protocol/pubsub'})
        .c('subscribe', {node: 'search', jid: anonymous_jid})
      .up().c('options')
        .c('x', {xmlns: 'jabber:x:data', type: 'submit'})
          .c('field', {"var": 'FORM_TYPE', type: 'hidden'})
            .c('value').t('http://jabber.org/protocol/pubsub#subscribe_options')
          .up().up().c('field', {"var": 'x-collecta#apikey'})
            .c('value').t(Config.API_KEY)
          .up().up().c('field', {"var": 'x-collecta#query'})
            .c('value').t(searchName);
 },
 // ...
```

O trecho de código acima apresenta como devemos criar um stanza utilizando o XML Builder implementado no strophejs. No caso dessa função, estamos criando um stanza do tipo iq para realizar a inscrição do nosso usuário (observador) em um nó PubSub. A construção desse stanza respeita a especificação PubSub do XMPP. Dê uma olhada na [documentação da API do Collecta](http://developer.collecta.com/XmppApi/RealTime/) para ver como deve ser esse stanza que é enviado ao servidor.

### Confirmação da inscrição

```javascript
// real-time-comparison.js
function onIq(xml) {
  // in this case, the IQ stanzas handled are just subscription results
  xmlDom = $(xml);
  var iqId = xmlDom.attr('id');
  if (iqId == terms[0] || iqId == terms[1]) {
    if (xmlDom.find('subscription:first').attr('subscription') == 'subscribed') {
      console.log('Subscribed to ' + iqId);
    }
  }
  return true;
}
```

Após enviar o stanza de inscrição, devemos esperar uma resposta do servidor. Quem processa essa resposta é o handler que tínhamos criado anteriormente. O procedimento é simples, com jQuery podemos navegar no DOM da resposta, se o id da resposta for o mesmo da busca realizada e o status da inscrição é “subscribed”, então o usuário está inscrito e agora só precisa aguardar os itens publicados.

### Recebendo um evento publicado

```javascript
// real-time-comparison.js
function onMessage(msg) {
  // messages stanzas are converted to JSON and then prepended to the correspondent panel in the UI
  var result = Collecta.processItem($(msg));
  for (var i = 0; i < result.length; i++) {
    $('#term' + result[i].term + 'panel').prepend(
      '<p>[' +
        result[i].category +
        '] - <a href="' +
        result[i].url +
        '" target="_blank" title=" Access ' +
        terms[result[i].term] +
        ' information">' +
        result[i].title +
        '</a><br />...' +
        result[i].description +
        '...<br />Published in ' +
        result[i].published +
        '</p>'
    );
  }
  return true;
}
```

Os eventos publicados vêm em um stanza “message” e extendidos com a especificação PubSub. O único passo necessário e realizar o parse dessa resposta e convertê-lo para JSON, assim poderemos construir todo o HTML necessário para repassar esses resultados de busca para o usuário de forma mais fácil.

Após todo esse processo, o usuário já pode visualizar os resultados na página assim que eles forem sendo publicados no nó PubSub. Ufa!

![](/img-posts/bax-thumb.png)

Quando há a necessidade de se obter resultados em tempo real na web, o antigo modelo de puxar a informação (pull) por meio de uma requisição HTTP já não é tão eficiente, pois perde-se tanto no desempenho do servidor, que terá uma alta carga devido às inúmeras requisições desnecessárias feitas, quanto na velocidade da informação, pois entre uma requisição e outra pode-se perder o efeito tempo real desejado.

Está crescendo cada vez mais o push como modelo para aplicações Web, na qual o servidor deve fornecer a informação para os clientes web logo que ela for publicada. Juntamente com o modelo de push, o modelo Publish-Subscribe também está se provando efetivo, uma vez que não é só implementado em XMPP, mas também em Webhooks, Pubsubhubbub, entre outros.

O diferencial do XMPP neste caso é a especificação da extensão Publish-Subscribe, que é bastante detalhada e cobre vários fluxos que podem existir no modelo PubSub, além é claro dos vários servidores que já implementam este módulo. Vale a pena experimentar.
