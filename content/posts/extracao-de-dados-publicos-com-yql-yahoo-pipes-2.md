---
title: Extração de dados públicos com YQL e Y!Pipes, parte 2
description: Artigo que apresenta como consumir conteúdo não estruturado na Web com YQL.
datePublished: '2010-04-16T00:00:00Z'
author: Luis Cipriani
tags: yql, yahoo, dados, publicos, yql
image: /img-posts/edpyy-thumb.png
lang: pt-BR
---

Na [primeira parte dessa série](/pt-BR/posts/extracao-de-dados-publicos-com-yql-yahoo-pipes-1), expliquei os problemas que o desenvolvedor enfrentam ao tentar extrair dados públicos e iniciamos um exemplo com a motivação de se tentar plotar num mapa os endereços de feiras livres de São Paulo, no dia da semana e zona da cidade que o usuário escolhesse. O principal resultado que obtivemos até esse ponto foi uma Open Table da Yahoo Query Language que nos permite realizar a pesquisa para obter os endereços. Sucintamente, ao executar a seguinte query:

```sql
USE "http://github.com/lfcipriani/yql-feira-livre-sp/raw/master/yql-feira-livre-sp.xml" AS feiras;
SELECT * FROM feiras
  WHERE zone = 'SUL' AND dayOfTheWeek = 'DOMINGO';
```

Obtemos o resultado:

```xml
<markets>
   <market>
     <dayOfTheWeek>DOMINGO</dayOfTheWeek>
     <address>RUA  CONDE DE PORTO ALEGRE, Sao Paulo, Brazil</address>
   </market>
   <market>
     <dayOfTheWeek>DOMINGO</dayOfTheWeek>
     <address>AV   AMADEU DA SILVA SAMELLO, Sao Paulo, Brazil</address>
   </market>
   ...
</markets>
```

Você pode relembrar como funciona o YQL [executando esse exemplo diretamente no YQL Console](http://developer.yahoo.com/yql/console/#h=use%20%22http%3A//github.com/lfcipriani/yql-feira-livre-sp/raw/master/yql-feira-livre-sp.xml%22%20as%20feiras%3B%0Aselect%20*%20from%20feiras%20where%20zone%20%3D%20%27SUL%27%20and%20dayOfTheWeek%20%3D%20%27DOMINGO%27).

A proposta dessa segunda parte é utilizar esse resultado, a conversão do HTML em uma estrutura XML fácil de ser lida por um software, no [Yahoo Pipes](http://pipes.yahoo.com/pipes/) e plotar o mapa. Dessa forma o usuário pode facilmente saber se tem uma feira livre perto da casa dele, uma vez que agora a informação está num formato mais apropriado.

## Yahoo Pipes

![](/img-posts/edpyy-ypipes.png)

Da própria definição no site: _“Pipes é uma ferramenta poderosa de composição para agregar, manipular e misturar conteúdo (feeds, RSS, Atom, etc) da Web”_.

O legal do Yahoo Pipes é que o usuário não precisa ter conhecimentos avançados de programação ou de como manipular vários formatos, pois a interface é bem fácil de usar. Basta criar conexões entre vários módulos (daí o nome Pipes), sendo que cada módulo faz alguma ação sobre o conteúdo que está passando por ele. A idéia é combinar vários desses módulos para no fim obter um novo fluxo de informações, ou um fluxo enriquecido, modificado.

Nosso objetivo é enriquecer o conteúdo, pois queremos pegar meros endereços e representá-los como pontos em um mapa. Então vamos direto ao ponto!

## O mashup de feira livre

O Pipes que vamos criar deve fazer o seguinte:

- Receber do usuário o dia da semana e o zona da cidade;
- Executar a query YQL para obter os endereços de cada feira livre;
- Para cada endereço, realizar um geocoding para obter as coordenadas geográficas;
- Plotar essas coordenadas em um mapa.

Para ajudar no entendimento, você pode [visualizar o Pipes de Feira Livre](http://pipes.yahoo.com/lfcipriani/feiraslivressp) enquanto lê cada passo abaixo (para ver o “código-fonte” do Pipes você precisa estar logado com algum id do Yahoo). Se tiver dúvida no comportamento de um módulo, clique nele e observe a barra inferior apresentando o resultado parcial do mashup.

### Recebendo do usuário o dia da semana e zona da cidade

As entradas de usuários podem ser feitas utilizando o [Text Input Module](http://pipes.yahoo.com/pipes/docs?doc=user_inputs#Text), veja a figura abaixo apresentando como configuramos este módulo para as duas entradas necessárias no Pipes de feira livre.

![](/img-posts/edpyy-pipes02.png)

Como se pode ver, com o Text Input, basta configurar o nome da variável, o texto que aparecerá para o usuário (prompt), um opcional valor default e por fim um valor de debug, utilizado quando o criador do Pipes está testando os resultados. Cada entrada dessa é jogada para um [String Builder Module](http://pipes.yahoo.com/pipes/docs?doc=string#StringBuilder), cujo objetivo é bem simples, concatenar strings. Veja que é bem simples, no nosso caso, bastou conectar a saída do Text Input na parte da string que eu quero gerar. A string final obtida com esse módulo será a query YQL que eu vou executar. Aonde? No [YQL Module](http://pipes.yahoo.com/pipes/docs?doc=sources#YQL), é claro. Vamos dar uma olhada como fica essa segunda parte do Pipes de feira livre.

### Executando a query YQL na Open Table de feira livre

![](/img-posts/edpyy-pipes03.png)

A saída do String Builder é plugada no módulo que executa YQL’s, como mostra a figura acima. O resultado da execução da YQL é uma estrutura de árvore, hierárquica, ou seja, nesta situação, há vários níveis entre a raiz da árvore e a informação que nos interessa (a estrutura XML apresentada no início desse artigo), portanto, temos que usar um [Sub-element Module](http://pipes.yahoo.com/pipes/docs?doc=operators#SubElement).

O Sub-Element apresentado na figura irá pegar a árvore de resultado retornada pela YQL query e vai retornar apenas a sub-árvore indicada no campo dele, isto é, queremos apenas a sub-árvore que no fim será representada por uma lista de mercados (item.market), que por sua vez contêm dia da semana e endereço de uma feira livre. Nesse ponto o Pipes mostra a sua eficiência, quando focamos o campo do módulo Sub-Element, o Pipes abre um dropdown menu contendo todos os nós dessa árvore retornada pela query, facilitando muito a vida do criador do mashup.

Por fim, temos um [Rename Module](http://pipes.yahoo.com/pipes/docs?doc=operators#Rename), e o objetivo dele é renomear atributos de um feed. Esse passo é importantíssimo para a criação desse mashup, pois o Yahoo Pipes, assim como a própria definição dele diz, é um agregador de feeds (RSS, Atom, etc). Portanto, o módulo Rename está sendo usado justamente para esta causa, que é criar o menor feed possível que o Pipes entenda, com título da entrada e descrição.

Se não realizássemos essa renomeação, o Pipes (e outros consumidores desse Pipes de feira livre) não saberia como consumir os dados. Então guarde essa dica: mesmo com a capacidade de trabalhar com várias formatações de dados, todo Pipes deve “cuspir” feeds, dessa maneira você facilita até que outros criadores de Pipes reutilize o seu mashup. Só existe uma exceção para essa regra e vamos apresentá-la na próxima etapa.

### Realizando o geocoding para obter as coordenadas geográficas

![](/img-posts/edpyy-pipes04.png)

Esta etapa foi a mais complicada. Inicialmente, colocamos um [Loop Module](http://pipes.yahoo.com/pipes/docs?doc=operators#Loop), cujo objetivo é iterar sobre os elementos do feed e realizar alguma operação neles. Essa operação pode ser qualquer outro módulo do Pipes. Olhando no Loop da figura acima, temos o Google Maps Location Extractor, que se você procurar nos módulos padrões disponíveis do yahoo Pipes você não vai encontrar. A explicação é simples, esse módulo é um outro Yahoo Pipes criado por mim. Esse eu não vou explicar como eu fiz, vou apenas passar a URL pra vocês e aí fica como “lição de casa” entender como ele funciona, OK? Aí vai: [http://pipes.yahoo.com/lfcipriani/gmapslocationextractor](http://pipes.yahoo.com/lfcipriani/gmapslocationextractor).

O único detalhe importante que vale o comentário é que esse Pipes não retorna um feed válido, mas apenas uma estrutura contendo o resultado da geolocalização, e assim, fugindo da regra citada na etapa anterior. Fiz isso porque o objetivo principal desse Pipes de geolocalização é ser reutilizado somente dentro de outro Pipes, e com restrição na forma de utilizar o seu resultado.

Mas aí vocês podem se perguntar: peraí, o Yahoo Pipes já não tem um módulo de extração de geolocalização? Sim, ele tem, e se chama [Location Extractor Module](http://pipes.yahoo.com/pipes/docs?doc=operators#LocationExtractor), e para utilizá-lo basta plugá-lo em qualquer saída de feed que ele irá pesquisar por coordenadas geográficas nos campos do feed que são endereços. Se usássemos ele não precisaríamos criar esse Loop, pois ele itera automaticamente nos feeds, mas então porque não usamos?

A resposta é simples, após alguns testes com esse Location Extractor eu percebi que as coordenadas que ele encontrava não era do endereço correto, ou seja, o geolocation não era confiável para os endereços de feiras de São Paulo, talvez ele seja mais eficiente para outras situações. Eu testei alguns endereços no [Google Maps Geocoding Webservice](http://code.google.com/apis/maps/documentation/geocoding/) e ele foi capaz de acertar mais, mas ainda assim comete alguns erros de vez em quando (vocês podem ver ao executar o Pipes que alguns endereços caem em outras cidades, mas não deveria porque as feiras são todas na cidade de São Paulo). Enfim, como o Google Maps se comportou melhor, não me prendi ao Location Extractor que está disponível no Yahoo Pipes e decidi criar um outro usando um geocoding melhor para a minha necessidade.

### Plotando no mapa

O Yahoo Pipes possui uma convenção para coordenadas geográficas, dessa forma, feeds que possuem os campos nesse padrão são automaticamente mapeados quando o Pipes é executado (e você achando que ia ter que aprender a API do Yahoo Maps, hein! :-) ).

O jeito mais simples de utilizar esse padrão é criar o nó **y:location** e colocar dentro dele os atributos **y:location.lat** e **y:location.lon** (você também pode [incluir outras informações](http://pipes.yahoo.com/pipes/docs?doc=operators#LocationExtractor)). Como o webservice de geocoding do Google Maps não me retorna esses campos no formato que o Yahoo Pipes precisa, eu utilizo o Rename Module novamente para renomear a longitude para a forma correta e pronto! Jogo a saída disso tudo no Pipe Output e o Pipes está finalizado.

## O resultado final

Se no modo de edição clicarmos no Pipe Output, poderemos ver na barra de debug inferior da interface do Yahoo Pipes a seguinte estrutura de resultados:

![](/img-posts/edpyy-pipes05.png)

Esse é o feed final que o usuário vai obter ao executar o Pipes, que pode ser utilizado assim como qualquer outro feed na Web: assinar em um feed Reader, consumir com outro Pipes (ou software), manipular as entradas, plotar em outro tipo de mapa, Google Earth, \[coloque o que quiser aqui\].

Você também pode acessar o Pipes de Feiras Livres de São Paulo [pelo próprio site dele](http://pipes.yahoo.com/lfcipriani/feiraslivressp), e aí obterá um resultado parecido com esse:

![](/img-posts/edpyy-thumb.png)

_Obs.: Lembro vocês que o serviço da prefeitura que serve os endereços é bem instável. Eu tive problemas para acessar principalmente após a meia-noite nos dias da semana e durante o dia todo no fim de semana._

## Recapitulando

Na [primeira parte desse artigo](/pt-BR/posts/extracao-de-dados-publicos-com-yql-yahoo-pipes-1), focamos em como usar a Yahoo Query Language para oferecer uma linguagem parecida com a SQL para transformar representações, no caso, um HTML desestruturado para um XML conciso e estruturado de forma melhor para ser processada por um software.

Já nesta segunda parte, utilizamos o resultado dessa query YQL para plotar os endereços das feiras livres de São Paulo. O interessante é que isso foi feito inteiramente dentro do Yahoo Pipes, sem a necessidade de escrever uma linha de código.

A minha recomendação de uso para esses serviços é a seguinte: claro que se formos construir uma aplicação mais robusta, processando muito mais dados e que terá uma alta carga num servidor, o Yahoo Pipes e talvez até o YQL não sejam as maneiras apropriadas de se fazer os mashups. Porém, como no caso do exemplo desse artigo (localização de feiras livres), a proposta for apenas de criar um mashup rápido para se ter um ganho no entendimento e visualização de uma informação, que não vai ser utilizada para fins muito críticos, aí sim, esses tipos de serviços são excelentes, pois os resultados vêm rapidamente.

Enfim, sugiro dar uma olhada nos Pipes existentes, tem sempre uma idéia interessante pra ser observada e é muito fácil ver como ela foi implementada, graças a interface que o Yahoo criou para isso. E se você criar ou já criou um Pipes, coloque num comentário desse artigo para que os leitores possam acessar também.
