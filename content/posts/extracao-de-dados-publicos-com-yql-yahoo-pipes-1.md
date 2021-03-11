---
title: Extração de dados públicos com YQL e Y!Pipes, parte 1
description: Artigo que apresenta como consumir conteúdo não estruturado na Web com YQL.
datePublished: '2010-04-13T00:00:00Z'
author: Luis Cipriani
tags: yql, yahoo, dados, publicos, yql
image: /img-posts/edpyy-thumb.png
lang: pt-BR
---

Não dá mais para acessar a Web sem esbarrar nos famosos _mashups_, que são aplicações web, complexas ou simples, que misturam fontes de dados de várias origens com o objetivo de fornecer um novo ponto de vista, uma nova maneira de se divertir ou mais conhecimento sobre um determinado assunto.

Menos comum mas muito importantes, mashups que utilizam dados públicos (aqueles que se utilizam de dados de órgãos públicos ou outras instituições com esse mesmo caráter) também são criados, porém os desenvolvedores enfrentam muitas dificuldades, por exemplo:

- Falta de interesse da população e dos usuários da Web;
- Nem todos os dados necessários estão publicados ou disponíveis para acesso;
- Algumas vezes os dados podem não estar atualizados ou serem pouco confiáveis;
- Servidores dos dados podem ser mal administrados e os dados podem ficar indisponíveis temporariamente;
- A forma como os dados são disponibilizados pode ser “ilegível” ou “burocrática” para um software;

Eliminar essas dificuldades depende de boa vontade desses órgãos públicos e dos cidadãos. Enquanto não temos uma solução, nós, como desenvolvedores, podemos utilizar ferramentas e nossa criatividade para extrair esses dados, certo? Sendo assim, vamos implementar uma simples extração de dados utilizando 2 ferramentas que facilitam a nossa vida: a **Yahoo Query Language (YQL)** e o **Yahoo Pipes (Y!Pipes)**.

Nessa primeira parte, o foco será apenas no YQL, mas eu pretendo publicar a parte do Y!Pipes em 1 dia ou 2.

## A motivação

Eu costumo ir sempre numa mesma feira livre, aqui em São paulo, nos sábados. Porém, sempre quis saber se existem feiras livres mais próximas de casa e os dias em que elas ocorrem. Tinha duas opções, ou saía de casa todo dia e andava pela redondeza procurando feiras ou dava uma “googlada” para ver se encontrava localização delas aqui em São Paulo. Acabei encontrando o seguinte site da prefeitura:

> [](http://www.prodam.sp.gov.br/semab/mercados/pesqt.htm 'Acessar o site de pesquisa de feiras')[http://www.prodam.sp.gov.br/semab/mercados/pesqt.htm](http://www.prodam.sp.gov.br/semab/mercados/pesqt.htm)

Sensacional, funciona direitinho e escolhendo região e dia da semana eu obtenho uma lista com os endereços. Aí é que aparece mais um problema, eu reconheci poucas ruas e decidi procurar no Google Maps, mas isso não é muito produtivo, tinha que copiar rua por rua e isso se tornou uma tarefa tediosa. Então decidi colocar a mão na massa pra plotar todos esses endereços num mapa, utilizando o que a Web oferece.

## Os problemas dessa fonte de dados

Não apenas o design da página, mas todo o código HTML parece que foi criado nos anos 90. Ele utiliza frames, tags `<center>`, `<font>`, `<table>`’s aninhadas, em resumo, uma tristeza para qualquer programador que precisar fazer um parsing. Vamos dar uma olhada na situação:

```html
<HTML>
<HEAD></HEAD>
<BODY>
<HEAD><TITLE>ENDERECO DAS  FEIRAS POR DIA  </TITLE>
</HEAD>
<BODY  bgcolor="f9cd8a">
<!--BODY background="/img_feiras/feiras.GIF"--><br>
<center>
<!--img src="/img_feiras/logo1.GIF" border=0 align=top><BR>
<font color=#006666 size=5><B><I>RELAÇÃO DE FEIRAS</I></B></FONT><BR-->
</CENTER>
<PRE>
<center><table border=0><tr><td>
 <CENTER><TABLE BORDER=1 background=http://www.prodam.sp.gov.br/semab/mercados/img_feiras/Gray.jpg><TR><TD ALIGN=CENTER COLSPAN=4><FONT COLOR=#006666  SIZE=5>ZONA CENTRAL</FONT></TD></TR><TR><TD ALIGN=CENTER><FONT COLOR=Black Size=3><b>DIA</b></TD>
 <TD><FONT COLOR=Black Size=3><b>ENDERECO</b></TD>
 <TD ALIGN=CENTER><FONT COLOR=Black Size=3><b>NRO.</b></TD>
 <TD ALIGN=CENTER><FONT COLOR=Black Size=3><b>BAIRRO</b></TD></TR>
 <TR>
 <TD ALIGN=CENTER><FONT COLOR=Red Size=2>DOMINGO</TD>
 <TD><FONT COLOR=Red Size=2>RUA  SANTO AMARO                  </TD>
 <TD ALIGN=CENTER><FONT COLOR=Red Size=2>  S/N&nbsp;</TD>
 <TD ALIGN=CENTER><FONT COLOR=Red Size=2>BELA VISTA          </TD>
 </TR>
 ... omiti de propósito algumas linhas que se repetem ...
```

Além disso, o servidor nem sempre está disponível (percebi que de fim de semana a instabilidade aumenta) e o tempo de execução médio de requisições que eu enfrentei foi de 10 a 15 segundos. Solução para esse problema, só cacheando todos os dados em outro servidor (não, obrigado) ou quando eles realizarem melhorias na infraestrutura (mas convenhamos, isso não deve ser prioridade).

## O objetivo

A tarefa parece simples:

- Executo uma requisição POST passando os parâmetros de zona e dia da semana (via wget, curl, API HTTP de qualquer linguagem);
- Realizo um DOM parsing no HTML retornado, e recupero a tabela contendo os endereços (via navegação de DOM, XPATH);
- Para cada endereço, faço um geocoding usando qualquer API disponível para obter as coordenadas geográficas (via Yahoo Maps, Google Maps, Geonames, etc);
- Jogo essas coordenadas em qualquer serviço de mapas (via Yahoo Maps, Google Maps, etc).

Tinha apenas uma preguiça premissa: não queria usar nenhum programa feito por mim nem por ninguém, mas sim apenas serviços na Web.

## Yahoo Query Language

A [Yahoo Query Language](http://developer.yahoo.com/yql/ 'Acessar site da Yahoo Query Language') ou apenas YQL, é uma linguagem parecida com a SQL, largamente utilizada nos bancos de dados, porém cujo objetivo é acessar fontes de dados na Internet. Por exemplo, uma query possível de se realizar com ela é:

```sql
SELECT * FROM LOCAL.search WHERE query="sushi" AND location="san francisco, ca";
```

Bem simples, essa query vai pesquisar por restaurantes em San Francisco, California, que servem sushi. O interessante é que o serviço da YQL centraliza as fontes de dados e fornece uma interface única para todos eles, facilitando a vida do programador, pois fica muito mais fácil utilizar os resultados das queries e também de combinar vários serviços. Se você ainda não conhece, sugiro dar uma brincada com o [YQL Console](http://developer.yahoo.com/yql/console/ 'Acessar o Console'), que possui inúmeros exemplos.

Para os serviços que não possuem tabelas disponíveis, o YQL nos dá duas opções. A primeira é simples, basta executar a seguinte query:

```sql
SELECT * FROM html WHERE url="[qualquer URL aqui]" AND xpath='[uma query XPATH aqui]
```

Com essa query obtemos o resultado da query [XPATH](http://www.w3schools.com/xpath/default.asp) no código HTML no formato JSON ou XML. Contudo, essa opção não nos ajuda, pois precisamos realizar uma requisição POST e passar parâmetros para ela.

Nos resta a segunda opção, Open Tables!

## YQL Open Tables

Mais interessante que a própria YQL, são as [YQL Open Tables](http://developer.yahoo.com/yql/guide/yql_dev_guide.html), que permitem expor qualquer serviço ou API na web como uma tabela na YQL. Basicamente, para isso, basta criar a especificação de sua Open Table com XML, que pode inclusive possuir código javascript para permitir uma manipulação mais flexível dos dados.

Vamos então ver como fica a nossa Open Table para o caso da nossa fonte de dados de feiras livres em São Paulo. Se você está ansioso, pode acessar o [código fonte](http://github.com/lfcipriani/yql-feira-livre-sp) final no GitHub.

O primeiro passo é colocar a meta-informação da sua Open Table, para que os usuários dela possam saber a forma correta de utilizá-la. Todos as tags XML utilizadas estão detalhadas na [documentação de Open Tables da YQL](http://developer.yahoo.com/yql/guide/yql-opentables-reference.html), portanto, vou explicar somente aquelas mais relevantes para o entendimento deste artigo.

```html
<table xmlns="http://query.yahooapis.com/v1/schema/table.xsd">
 <meta>
 <author>Luis Cipriani (@lfcipriani)</author>
 <description>
 Busca por Feiras Livres em São Paulo, por dia da semana e zona da cidade.
 - As zonas possíveis são: CENTRAL, NORTE, SUL, LESTE e OESTE.
 - Os dias da semana possíveis são: DOMINGO, TERCA, QUARTA, QUINTA, SEXTA, SÁBADO.
 - Deixe o dia da semana em branco para pesquisar em todos os dias de uma vez só.
 </description>
 <sampleQuery><![CDATA[ SELECT * FROM {table} WHERE zone = 'CENTRAL' ]]></sampleQuery>
 <sampleQuery><![CDATA[ SELECT * FROM {table} WHERE dayOfTheWeek = 'DOMINGO' AND zone = 'OESTE' ]]></sampleQuery>
 <documentationURL></documentationURL>
 </meta>
</table>
```

Agora precisamos criar a parte da especificação que cria a estrutura da query que desejamos expor para os usuários:

```html
<table>
 <meta>...</meta>
 <bindings>
   <select itemPath="" produces="JSON" >
     <urls>
       <url>http://www3.prefeitura.sp.gov.br/feiras/feiras.asp</url>
     </urls>
     <inputs>
       <key id="dayOfTheWeek" type="xs:string" paramType="variable" default="todos" />
       <key id="zone" type="xs:string" paramType="variable" required="true" />
     </inputs>
     <execute>...</execute>
   </select>
 </bindings>
</table>
```

Dentro da tag `<bindings>` podemos ter as tags `<select>`, `<insert>`, `<update>` e `<delete>`, dependendo do tipo de queries que queremos criar, no nosso caso, somente uma query SELECT. Deixamos o attributo **itemPath** porque não queremos colocar nenhum namespace precedendo a resposta retornada e escolhemoso JSON como format padrão no atributo **produces**.

Na tag `<url>` colocamos a URL do serviço que vamos acessar, no caso, essa é a URL que vamos fazer a requisição POST e passar os parâmetros necessários para obter a lista de endereços de feiras livres.

Só nos falta agora definir quais os parâmetros desejamos na query, o que é feito pela tag `<key>`. No exemplo acima, ao atribuir o tipo _variable_ para as duas tags, eu estou informando que _dayOfTheWeek_ e _zone_ são duas variáveis que podem (ou devem) ser utilizadas como cláusulas no WHERE da query.

Munido de todas as configurações de nossa query, se o tipo de fonte de dados utilizado exigir, podemos ainda incluir um código javascript para permitir um manuseio mais flexível dos dados obtidos pela query. No nosso caso, nós precisaremos fazer isso, pois a forma como o HTML é entregue após essa requisição não é muito fácil de lidar. Além disso, desejamos que ao executar essa query, o desenvolvedor obtenha apenas os dados necessário, então seria interessante retornarmos os dados limpos e bem estruturados.

Queremos, a partir do código HTML da fonte de dados apresentado acima, obter o seguinte:

```html
<markets>
  <market>
    <dayOfTheWeek>DOMINGO</dayOfTheWeek>
    <address>RUA CONDE DE PORTO ALEGRE, Sao Paulo, Brazil</address>
  </market>
  <market>
    <dayOfTheWeek>DOMINGO</dayOfTheWeek>
    <address>AV AMADEU DA SILVA SAMELLO, Sao Paulo, Brazil</address>
  </market>
  ...
</markets>
```

Vamos então analisar por partes o código javascript, que é incluído dentro da tag `<execute>`. Veja bem que vamos apenas focar nas partes mais importantes:

```javascript
var postData = 'zona=' + zone + '&dia=' + dayOfTheWeek;
var data = request
  .accept('text/html')
  .contentType('application/x-www-form-urlencoded')
  .post(postData).response;
var xdata = y.xpath(data, "//font[@color='Red']");
```

Como a nossa requisição é do tipo POST e por padrão uma Open Table faz um GET, precisamos usar o objeto _request_ fornecido pelo YQL para realizar a requisição manualmente. O objeto _request_ possui a propriedade de chaining, então fica bem tranquilo realizar a requisição. Só lembrando que a URL utiliza é aquela especificada lá na tag URL.

Depois pegamos o resultado dessa requisição e realizamos uma query XPATH. Diante do HTML totalmente sem estrutura que recebemos da requisição, a query XPATH que busca os resultados que mais precisamos foi:

    //font[@color='Red']

Ou seja, todas as tags do tipo `<font>` que possuem o atributo color igual a “Red”. Se o HTML fosse semanticamente válido com certeza essa query seria diferente e até faria mais sentido, mas ao extrair dados públicos é bastante comum se deparar com esse tipo de estrutura. Mas é aí tá a diversão do negócio!

Calma que ainda não acabou, agora temos que utilizar o resultado da query XPATH e recuperar dessa lista o dia da semana e estruturar o endereço de uma forma que seja ideal para o geocoding.

```javascript
default xml namespace = '';
for each (var item in xdata) {
  if (i == 0) {
    day = item.toString().trim();
  } else if (i == 1) {
    address += item.toString().trim() + ", ";
  } else if (i == 2) {
    number = item.toString().trim();
    if (number != "S/N" && number.length != 0) {
      address += number + ", ";
    }
  } else if (i == 3) {
    address += "Sao Paulo, Brazil";
    marketList.push({day: day, address: address});
    address = "";
    i = -1;
  }
  i++;
}
```

No código acima, nós iteramos sobre o resultado da query anterior. Para cada 4 items, o primeiro é o dia da semana, e do 2o. ao 4o. constitui o endereço, que incrementamos em uma variável _address_ para no final, montarmos um JSON que possui os atributos relevantes: dia da semana e endereço. Um leitor atento vai perceber que tem código meio estranho nesse trecho acima, o fato é que o YQL aceita na tag `<execute>`, além do javascript, o [E4X](http://www.w3schools.com/e4x/default.asp) (Ecmascript for XML), que adiciona suporte nativo ao manuseio de XML no javascript e é por isso que existe a declaração de namespace _default xml namespace = “_. Vamos dar uma olhada na última parte desse algoritmo para entender melhor como o E4X funciona.

```javascript
default xml namespace = '';
var result = <markets />
for (i = 0; i < marketList.length; i++) {
  result.markets += <market><dayOfTheWeek>{marketList[i].day}</dayOfTheWeek><address>{marketList[i].address}</address></market>;
}
response.object = result;
```

A resposta da query YQL deve ser enviada para a variável _response.object_ e deve ser criada com o E4X, e veja que isso é feito escrevendo XML diretamente no código javascript. Esse algoritmo foi necessário apenas para converter a estrutura HTML do site de pesquisa de feiras livres para um formato XML mais adequado para ser “lido” por um software.

Pronto! A Open Table está pronta, um exemplo de query que podemos fazer é:

```sql
USE "http://github.com/lfcipriani/yql-feira-livre-sp/raw/master/yql-feira-livre-sp.xml" AS feiras;
SELECT * FROM feiras
  WHERE zone = 'SUL' AND dayOfTheWeek = 'DOMINGO';
```

[Veja o resultado no YQL Console](http://developer.yahoo.com/yql/console/#h=use%20%22http%3A//github.com/lfcipriani/yql-feira-livre-sp/raw/master/yql-feira-livre-sp.xml%22%20as%20feiras%3B%0Aselect%20*%20from%20feiras%20where%20zone%20%3D%20%27SUL%27%20and%20dayOfTheWeek%20%3D%20%27DOMINGO%27).

Ou acesse o [todo o código no Github](http://github.com/lfcipriani/yql-feira-livre-sp).

## Conclusão

Enfim, apesar de todos os problemas com as fontes de dados públicos, é possível extraí-los e convertê-los para uma representação melhor. Vimos também que serviços na Web como o Yahoo Query Language (YQL) permitem expor esses dados com uma API tão fácil quanto realizar uma simples query SQL, por meio de uma interface padronizada e única. E só com a exposição desses dados, num formato apropriado para que possamos programar com eles, teremos vários mashups gerando novos conhecimentos, sejam eles de interesse público ou não.

Nesta primeira parte desse artigo, cobrimos somente a Yahoo Query Language, na próxima parte iremos criar um mashup com o [Yahoo Pipes](http://pipes.yahoo.com/pipes/) que irá mapear todos os endereços de feiras livres da zona da cidade que o usuário escolher. Está curioso para saber o resultado? [Não se aflija](http://pipes.yahoo.com/lfcipriani/feiraslivressp). E não perca a [segunda parte](/pt-BR/posts/extracao-de-dados-publicos-com-yql-yahoo-pipes-2) na qual explicaremos como criamos esse mashup.
