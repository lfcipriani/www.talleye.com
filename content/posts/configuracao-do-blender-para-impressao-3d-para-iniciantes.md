---
title: Configuração do Blender para impressão 3D para iniciantes
description: Um breve guia de como configurar essa ferramenta de modelagem 3D para criar seus próprios objetos 3D.
datePublished: '2021-03-13T00:00:00Z'
author: Luis Cipriani
tags: blender, 3d print, guide, setup, open source
image: /img-posts/bbs3pm-final.jpg
lang: pt-BR
alternate:
  - lang: en
    slug: beginner-blender-setup-for-3d-print-modeling
---

Uma das distrações que eu decidi comprar desde que a pandemia começou foi uma impressora 3D. Eu sempre tive curiosidade de como era ter uma mas nunca tive uma razão muito forte para comprar até que eu tive que arrumar algo interessante pra fazer com meu filho já que temos que ficar dentro de casa. E eu devo dizer que a experiência está sendo muito boa, uma impressora 3D abre um mundo de possibilidades para brinquedos, ferramentas, utensílios para a casa e [muito mais](https://www.thingiverse.com/).

Nas primeiras semanas com uma impressora 3D você normalmente utilizará modelos pré- projetados e encontrados nos vários repositórios de models de graça, mas é inevitável que um certo momento você irá querer projetar os próprios modelos. E entre as [várias ferramentas disponíveis](https://all3dp.com/1/best-free-cad-software-2d-3d-cad-programs-design/), eu escolhei Blender para aprender a usar.

Blender é uma suíte de criação 3D ultra completa, profissional, grátis e open source. Eu pessoalmente gosto do combo software grátis, ótimo suporte da comunidade e o fato de ser uma ferramenta super profissional. No caso de eu me envolver muito com impressão 3D pelo menos eu não terei que mudar para outra ferramenta mais profissional porque o Blender não tem limites!

Eu vou mostrar como preparar um arquivo modelo do Blender que tem tudo o que você precisa para começar a modelar 3D e evitar os problemas comuns que podem afetar a sua impressão mais tarde. Esse artigo não irá ensinar como modelar ou como disponibilizar o modelo para a sua impressora, mas eu vou dar umas dicas e direções de como você pode chegar lá.

## Aprendendo Blender

Primeiro você precisa instalá-lo: [www.blender.org/download/](https://www.blender.org/download/). Para esse post eu estou usando Blender 2.90.1, mas mesmo que você tenha uma versão mais recente você deve conseguir seguí-lo.

Sendo a ferramenta popular que o Blender é, tem muitos cursos online ensinando pessoas à utilizar. Eu vou economizar seu tempo e recomendar o curso que eu assisti:

[![](/img-posts/bbs3pm-tutorial.jpg)](https://www.youtube.com/playlist?list=PLgO2ChD7acqH5S3fCO1GbAJC55NeVaCCp)

Ram Singh é o autor dessa série de vídeos nos quais ele [ensina Blender em 7 dias](https://www.youtube.com/playlist?list=PLgO2ChD7acqH5S3fCO1GbAJC55NeVaCCp). Você pode ver facilmente o quanto ele é profissional depois de assistir apenas alguns minutos dos vídeos dele. Eu pessoalmente gostei do ritmo do curso, que não é lento e você pode aprender bastante em um curto período do tempo. Para impressão 3D você precisará de pelo menos assistir até o dia 3 do curso, que cobre o básico, edição de objetos e os _modifiers_.

_Obs.: Me desculpe por recomendar um curso em inglês, se você souber de algum bom em Português por favor me avise e eu posso atualizar o post._

## Configurando para impressão 3D

A partir de agora, se você quiser, pode abrir o Blender e acompanhar junto comigo na configuração desse arquivo padrão para impressão 3D. Você pode ir salvando o arquivo ou também sobrescrever o arquivo padrão inicial do Blender acessando a opção _File > Defaults > Save Startup File_.

### 1. Limpando

Quando você inicia o Blender, a seguinte tela é mostrada pra você:

![](/img-posts/bbs3pm-blender01.jpg)

O primeiro passo é remover os elementos que não são necessários para impressão 3D, que são a **camera** e a **iluminação**. Para removê-los, selecione-os na barra lateral, aquela com a _Scene Collection_ e pressiona `X` enquanto seleciona _camera_ e _light_. Você também pode abrir o menu de contexto.

### 2. O que você vê deve ser o que você imprimirá

Impressoras 3D são instrumentos precisos e saberas medidas exatas quando vocês está modelando um objeto é crucial para obter uma impressão nas dimensões que você planejou. Com o objeto selecionado no Blender, pressione `N` para ver as dimensões do objeto, assim como mostra a imagem abaixo.

![](/img-posts/bbs3pm-dimensions-min.jpg)

O cubo na imagem possui uma aresta de 2 metros e o _grid_ onde o cubo está tem 1 metro de distância entre cada linha. Seria bem legal se tivéssemos uma impressora desse tamanho, mas não é o caso, então teremos que diminuir a escala das unidades e alterar o espaçamento do grid para que possamos modelar objetos menores.

#### Unidades

Para modelar com unidades de medida mais adequadas, abra a opção _Scene_ (Cena) assim como a imagem abaixo mostra e altere as seguintes opções:

- **Unit Scale**: de `1` para `0.001`. Isso define o fator de escala a se usar quando se converte das unidades internas do Blender para as unidades da interface do usuário.
- **Length**: mude as unidades de dist6ancia de `meters` (metros) para `millimeteres` (milímetros).

![](/img-posts/bbs3pm-scene.jpg)

Se você vir as dimensões do objeto acima, você irá perceber que agora suas arestas têm 2 milímetros de dist6ancia e não mais 2 metros.

#### Grid

Nós ainda temos um grid de 1 metro de espaçamento entre as linhas. Ter um grid de tamanho adequado é muito importante pois nos ajuda a rapidamente verificar os tamanhos ou nos ajuda a alinhar dois ou mais objetos quando estamos modelando. Idealmente nós queremos um grid de 1 milímetro de espaçamento.

Para configurar o grid basta clicar na opção _Overlays_ conforme indicado abaixo e mudar a escala do grid para `0.001`.

![](/img-posts/bbs3pm-grid.jpg)

Agora o grid está sendo mostrado com 1 mm de espaçamento.

#### Área de trabalho

O próximo passo é tornar visível os limites dos quais você deve se restringir quando modelar um objeto, pois a sua impressora também tem um limite de tamanho de impressão. Esse passo é opcional porque normalmente você pode mudar a escala do objeto no _Slicer_, que é o programa que converte objetos 3D para instruções de sua impressora, mas se você quer controlar isso no Blender, faça o seguinte:

1. Selecione o cubo com o `botão direito` do mouse
2. Configure suas dimensões para o volume de impressão da sua impressora (pressione `N` para ver a dimensão na aba "Item")
3. Configura a _location_ para `x = 0`, `y = 0` and `z = altura/2`(z está no centro de massa e não na base, por isso ele não é zero)
4. Clique nas propriedades do objeto como indicado na imagem abaixo
5. Na opção _Visibility_, remova a seleção `Selectable`
6. Na opcão _Viewport Display_, escolha `Bounds` para _Display As_

O resultado é que agora você pode ver a Àrea de Trabalho como na imagem. Eu renomeei o objeto na barra lateral para não misturar com outros objetos do modelo.

![](/img-posts/bbs3pm-workingarea.jpg)

### 3. Acertando todos os detalhes

#### Medidas das arestas

É comum ter partes do seu modelo que você precisa saber as medidas das arestas com exatidão, tais como vãos, buracos, partes que vão se encaixar com outras, como um parafuso, por exemplo. Para ajudar você a saber essas medidas exatas, o Blender tem uma opção no _Viewport Overlays_, chamada _Edge length_ (medidas das arestas):

![](/img-posts/bbs3pm-measurement.jpg)

Uma vez ativada, essa opção vai mostrar o tamanho de cada aresta selecionada. Tem um detalhe importante, se você mudar o tamanho de um objeto essas medidas podem ser mostradas com o valor errado porque você precisa aplicar a transformação de escala ao selecionar o objeto. É só pressionar `CMD + A` ou `Ctrl + A` e escolher a transformação _Scale_ para ser aplicada.

#### 3D print add-on

Finalmente, tem um _add-on_ (extensão) do Blender que nos ajuda a verificar se o objeto a ser exportado é saudável, isto é, não tem nenhum problema estrutural, ou uma superfície muito fina, cantos muito acentuados or intersecções de faces. A melhor coisa sobre esse _add-on_ é que na maioria dos casos ele conserta os problemas automaticamente.

Para ativá-lo, vá em _Edit > Preferences_, aí selecione _Add-ons_, procure por "3D-print" e ative a extensão. Você terá uma aba nova chamada "3D-Print" quando pressionar `N`. Daí com o objeto selecionado, tente clicar em "Check All" para ver os resultados.

![](/img-posts/bbs3pm-addon.jpg)

Ao invés de explicar em detalhes esse _add-on_, eu rcomendo que você explore as funcionalidades com um objeto simples e tente "quebrá-lo" para ver como que os problemas são reportados pela ferramenta.

Uma vez que o objeto passar por todas as verificações, você pode usar o botão _Export_ para salvar no formato desejado para ser processado pelo _Slicer_.

## Agora é com você

É isso! Com esses passos você pode começar a modelar objetos garantindo que todas as arestas estão nas medidasnque você quer e que os seu modelo é imprimível sem nenhum problema. Nós apenas arranhamos a superfície do Blender e tem muito mais para se aprender, porém eu posso confirmar que essa configuração me ajudou muito desde que comecei a brincar com modelagem 3D.

Aqui está um [porta-chaves magnético](https://www.thingiverse.com/thing:4785703) que eu modelei e imprimi para usar em casa:

[![](/img-posts/bbs3pm-keyholderpic.png)](https://www.thingiverse.com/thing:4785703)

![](/img-posts/bbs3pm-final.jpg)

Como uma sugestão do que aprender, esses tópicos podem te interessar e vão te ajudar a resolver outros problemas que acontecem na impressão 3D:

- Aprenda a usar o modificar [Boolean](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/booleans.html) ou o add-on [BoolTool](https://docs.blender.org/manual/en/latest/addons/object/bool_tools.html).
- Aprenda a usar [Mesh Analysis](https://docs.blender.org/manual/en/latest/modeling/meshes/mesh_analysis.html).
