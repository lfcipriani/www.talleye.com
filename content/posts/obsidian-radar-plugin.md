---
title: Obsidian Radar
description: "Um plugin do Obsidian que te ajuda a responder a pergunta: 'O que está no seu radar?'"
datePublished: '2026-05-15T20:00:00Z'
author: Luis Cipriani
tags: obsidian, visualization, focus, project management
image: /img-posts/or-sample-radar.png
lang: pt-BR
alternate:
  - lang: en
    slug: obsidian-radar
---

Como CTO, a quantidade de tópicos que preciso prestar atenção é sempre demais. Começo minha semana com um plano claro de foco, mas já sabendo que tópicos inesperados inevitavelmente vão desviar da minha meta inicial. E é muito provável que você tenha a mesma experiência, especialmente agora que todos precisam entregar mais com menos. Deixa eu te contar como estou trabalhando para lidar melhor com essa realidade.

Sempre gostei do visual de um radar porque ele transmite prioridade de uma forma muito rápida de entender: blips próximos ao centro indicam objetos mais perto de você. Além disso, ele permite que você não perca de vista os objetos distantes também. Eles podem não ser uma ameaça no momento, mas serão se chegarem mais perto de você.

![](/img-posts/or-sailor-radar.jpg)
*Sailor, Us navy, Radar technician image. Free for use.*

A analogia se aplica naturalmente ao gerenciamento de foco: basta substituir ameaças por tópicos e direções por categorias, e você tem uma ótima ferramenta de foco. Basta uma rápida olhada no radar e você tem um panorama completo do que deveria estar focando e do que pode se tornar uma prioridade um dia. Nada de novo ou sofisticado, mas muito útil. Talvez o exemplo de radar mais famoso no mundo da tecnologia seja o [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar), que usa a mesma lógica, mas aplicada à adoção de boas práticas e ferramentas.

Eu costumava construir esses radares usando ferramentas de diagramação ou diretamente em quadros brancos com post-its — por exemplo, minhas anotações de resolução de ano novo são todas chamadas de "Radar 202x" porque seguem essa estrutura de priorização. Mas eu queria uma forma de construí-los mantendo a conexão entre os blips do radar e os dados que os descrevem. Como uso o [Obsidian](https://obsidian.md/) há mais de 6 anos, decidi escrever um plugin para construir radares usando minhas anotações.

Conheça o Obsidian Radar:

![](/img-posts/or-sample-radar.png)

Se você é usuário do Obsidian, pode [instalá-lo](https://community.obsidian.md/plugins/radar) para criar radares a partir das suas anotações — basta arrastá-las da barra lateral ou usar a paleta de comandos ou a barra de ferramentas. Você pode personalizar tudo: os níveis de prioridade, categorias, tamanhos e cores dos blips. Confira a lista completa de funcionalidades [no arquivo README](https://github.com/lfcipriani/obsidian-radar#features).

E porque sou um dicípulo da filosofia [File over App](https://stephango.com/file-over-app), criei um formato aberto chamado [JSON Radar](https://github.com/lfcipriani/obsidian-radar/blob/master/docs/JSON-radar.md), muito inspirado no [JSON Canvas](https://jsoncanvas.org/), um formato de canvas criado pela equipe do Obsidian para criar anotações mais visuais. Então, se um dia você se cansar do Obsidian e quiser migrar seus arquivos para outra ferramenta, os arquivos de radar são um único arquivo JSON com uma estrutura bem documentada — você pode renderizar uma visualização a partir dele muito facilmente, e até lê-lo diretamente.

Apesar de o Markdown se tornar um formato muito popular para trabalhar com agentes, vamos admitir que nem sempre é o mais fácil de consumir como leitor humano, especialmente quando a resposta da inferência é longa. [Andrej Karpathy tweetou recentemente](https://x.com/karpathy/status/2053872850101285137) sobre explorar formatos mais expressivos e visuais para as saídas de IA generativa, a fim de facilitar a compreensão.

Se você ainda está pensando "Por que eu me importaria com esse formato de radar aberto?", posso explicar. Um formato aberto e documentado permite que seus agentes de IA leiam, criem e modifiquem radares a partir dos seus prompts. Tudo o que você precisa é [instalar a skill `/obsidian-radar`](https://github.com/lfcipriani/obsidian-radar/tree/master#ai-skill-obsidian-radar).

O radar de exemplo acima foi criado com o seguinte prompt:

> `/obsidian-radar` Crie um arquivo Radar para priorizar meus projetos, disponíveis na pasta `@Projects/`. As categorias que quero são Engineering, Marketing, Backoffice e Product. Para cada anotação e com base no seu conteúdo, crie um blip, coloque-o no quadrante correto e sugira um nível de prioridade. Crie o arquivo como `Project Focus.radar`.

Como a especificação de um arquivo de radar explica claramente como o JSON está estruturado, um agente consegue trabalhar bem com visualizações de radar.

Para encerrar, aqui está um experimento divertido tentando reproduzir digitalmente um radar que desenhei à mão no papel:

![](/img-posts/or-radrawing.png)

Este foi o prompt:

> `/obsidian-radar` Olhe a imagem anexada e crie um radar usando a skill, mantendo a posição dos blips igual à do desenho. Replique também o número de níveis de prioridade e categorias. Dê nomes aleatórios aos blips e crie-os como blips de texto. `[Imagem #1]`

E o arquivo de radar resultante:

![](/img-posts/or-json-radrawing.png)

Não é uma cópia perfeita, mas ficou bem próximo. Acredito que com um prompt melhor é possível chegar lá. Experimente e depois me conta como foi!

- [Página do plugin na comunidade](https://community.obsidian.md/plugins/radar)
- [Código-fonte no Github](https://github.com/lfcipriani/obsidian-radar)
- Instale a skill: `npx skills add lfcipriani/obsidian-radar`
- Reporte bugs e compartilhe suas idéias no [Github](https://github.com/lfcipriani/obsidian-radar/issues)
