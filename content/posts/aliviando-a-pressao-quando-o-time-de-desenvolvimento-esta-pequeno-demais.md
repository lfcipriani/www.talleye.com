---
title: Aliviando a pressão quando o time de desenvolvimento está pequeno demais
description: Qual é a minha estratégia para manter um time de desenvolvimento estável quando existe uma falta de pessoas e contratar não é uma opção.
datePublished: '2022-02-04T00:00:00Z'
author: Luis Cipriani
tags: people, management, engineering, teams, hiring, performance
image: /img-posts/htdwtfb-thumb.png
lang: pt-BR
alternate:
  - lang: en
    slug: how-to-deal-with-teams-falling-behind
---

Pode ser por muitas razões: seu negócio foi impactado pela Covid e teve que demitir pessoas, ou sua empresa cresceu muito rápido e o recrutamento não pôde acompanhar, ou você recebeu uma quantia incomum de cartas de demissão em um curto período de tempo. De repente, sua equipe não tem pessoal suficiente para manter o ritmo e não está dando conta de entregar a tempo.

**Equipes com baixa capacidade perdem sua habilidade de entregar com alta qualidade e rapidamente**, a moral do time vai baixar porque vêem menos trabalho sendo entregue, mais relatos de erros de regressão e a sensação de que não há tempo para trabalhar nas soluções adequadamente. No final, a maior parte do trabalho é para cumprir a pressão do negócio.

No livro "The elegant puzzle", [Will Larson](https://twitter.com/lethain) apresenta [os quatro estágios de uma equipe](https://lethain.com/durably-excellent-teams/) e o que ela precisa para poder aumentar a performance. Ele compartilha que para as equipes que não estão dando conta de entregar a tempo, a solução é contratar mais pessoas e ao mesmo tempo fornecer apoio tático, o que é um passo lógico dado a baixa quantidade de pessoas. Além disso, ele enfatiza que mudar uma equipe de um estado para o outro é um processo lento, que exige paciência e uma reação sólida do gestor.

Trabalho há 6 anos em startups e este cenário é muito familiar para mim, incluindo situações em que nem mesmo contratar era uma opção. Eu gostaria de compartilhar qual  é a minha estratégia para manter essas equipes estáveis. E espero que estas dicas também ajudem seus times.

![](/img-posts/htdwtfb-thumb.png)

## Adapte o fluxo de trabalho para um nova realidade

A primeira verdade difícil de engolir é que **sua equipe não será capaz de lidar com muitas iniciativas paralelas como antes**. A razão é que trabalhar em diferentes tarefas simultâneas exige uma mudança frequente de contexto. Isto aumentará, como consequência, o estresse na equipe de desenvolvimento e refletirá mal no código que está sendo lançado aos clientes.

**Eles também estarão levando mais tempo para completar suas tarefas** porque não têm o ambiente de colaboração que tinham antes. Sem pair programming, sem colegas suficientes para rever o código, menos pessoas para compartilhar idéias e discutir problemas.

Encontre o equilíbrio, tornando seu processo de desenvolvimento sustentável da seguinte forma:

- **Domine o backlog**: a tendência é que ele só cresça. Os backlogs sempre ficam bagunçados com o tempo de qualquer forma e você deve rever e remover quaisquer tarefas que não sejam uma prioridade máxima. Não subestime o poder de simplesmente escondê-lo da equipe e manter as tarefas em um backlog de backlogs.
- **Comece menos, termine mais**: terminar uma tarefa traz mais valor para os clientes do que iniciar novas. Certifique-se de que cada épico ou iniciativa iniciada tenha um fim antes de escolher a próxima grande coisa. Nem que você precise concentrar toda a equipe nisso. Isto ajudará a diminuir a mudança de contexto frequente.
- **Feche os canais externos de solicitação**: Eu sou totalmente a favor da colaboração de engenheiros de software com clientes e equipes comerciais, mas encare a realidade de que isto pode roubar todo seu foco agora. Talvez seja um bom momento para colocar alguém (ou você mesmo) representando a equipe e a otimização de seu tempo.
- **Nunca troque qualidade por velocidade**: pode ser contraditório, mas você precisa capacitar sua equipe a aceitar a menor velocidade de entrega. É fácil sacrificar a qualidade sobre a velocidade nestas situações, mas o retorno é caro e vem na forma de bugs de regressão e incidentes inesperados. É melhor fazer isso corretamente, em vez de mais rápido.

Estas dicas são direcionadas para nos ajudar a lidar com o trabalho em andamento, mas lembre-se de que o atraso continuará a crescer. Vamos ver como podemos cuidar disso.

## Foco!

Dado que a contratação de pessoas é um processo lento, a única opção que temos para evitar o esgotamento da equipe é focar mais o escopo do trabalho.

**Divida a tarefa em pedaços menores**. Desenvolver uma funcionalidade de grande escopo e complexidade aumenta as chances de que a equipe passe muito tempo nela. Vai roubar tempo que seria usado para resolver débitos técnicos ou mesmo consertar um bug crítico em produção. Trabalhe com o time de produto para criar iterações menores que possam ser lançadas o mais cedo possível para os usuários. Como consequência, sua equipe sentirá que eles estão sempre progredindo e entregando com frequência.

Este exercício também pode ser aplicado às tarefas. Tarefas pequenas são fáceis de codificar, revisar e lançar. Além de melhorar as métricas de tempo de desenvolvimento e velocidade.

Pode ser bom até mesmo parar o desenvolvimento de funcionalidades e concentrar-se apenas nos débitos técnicos. É difícil negociar com o time de produto, mas vale a pena tentar, principalmente se você puder demonstrar que consertá-los melhorará a felicidade dos usuários mais do que qualquer outra funcionalidade nova que eles propõem.

**Seja rigorosa(o) no processo de refinamento**. Quando uma equipe multifuncional trabalha em conjunto por um muito tempo, as especificações tendem a omitir detalhes e cobrir os requisitos superficialmente. É compreensível, as equipes envolvidas confiam umas nas outras e os menores detalhes são resolvidos durante o desenvolvimento. Agora, com baixa capacidade, as pessoas não estão tão disponíveis como antes e o esclarecimento dos tópicos levará mais tempo.

Estou assumindo que pelo menos as fases de pesquisa de usuário e discovery de funcionalidades é bem feita, se este não for o caso, desafiar todas as suposições de produtos que não são apoiadas por provas irrefutáveis. E, é claro, não transforme isto em uma vingança mesquinha.

Ser mais criterioso em relação às especificações irá transferir a carga de trabalho de volta para a equipe do produto, diminuindo a sobrecarga de comunicação uma vez que o trabalho seja iniciado. Isto pode até mesmo ter um efeito positivo nos resultados dos testes e no número de regressões.

**Evite se comprometer com prazos ou estimativas**. A razão é que agora há muitas variáveis incontroláveis influenciando o tempo que uma tarefa levará. Com menos pessoas trabalhando no projeto, cada interrupção, incidente ou reunião terá uma influência maior no prazo em comparação com uma equipe com um tamanho adequado. Se uma empresa quer levar a sério os prazos, então, que comece a investir na contratação dos times.

Não me entenda mal, estimar bem é uma habilidade muito importante, especialmente quando o prazo é definido por um fator externo. Você ainda deve fazer o esforço de ter pelo menos uma estimativa base para compartilhar com sua equipe e comparar com o resultado final. Depois use esses resultados para negociar o escopo das próximas funcionalidades.

**Organize eventos especiais**. Chamamos isso de Hackday, em sua empresa você pode usar um nome diferente. Os engenheiros de software têm um dia inteiro para trabalhar em qualquer projeto que queiram. Pode parecer contra-intuitivo, mas permitir dar uma relaxada da pressão diária e trabalhar no que eles mais gostam, aprender coisas novas e atingir objetivos pessoais de carreira é uma ótima maneira de manter uma boa cadência durante uma crise.

Em mais de 10 anos fazendo estes hackdays, eu nunca tive a sensação de estar desperdiçando dinheiro ou tempo da empresa. Sempre houve bons resultados, seja uma correção de um débito técnico ou trazendo alegria e satisfação às equipes.

## Cuide das pessoas

O nível de estresse aumentará quando as equipes estiverem em baixa capacidade. As pessoas começarão a se questionar se devem encontrar algum outro lugar para trabalhar. É sua responsabilidade como gerente saber como esta situação está afetando a equipe e como ajudá-los a superar os problemas.

**Assegure-se de que você tenha um ambiente psicologicamente seguro**. Há uma boa chance de que as falhas aconteçam com mais frequência agora. É seu trabalho encorajar sua equipe a falar sobre suas idéias, preocupações e falhas sem temer retaliações ou mau julgamento. Este comportamento promoverá mais confiança entre a equipe e também aumentará a transparência no ambiente.

**Seja honesto**. O pior que você pode fazer é tentar esconder da equipe a realidade quando os efeitos colaterais são tão perceptíveis. Compartilhar o problema com eles abre a porta para discussões que podem levar a soluções, colocá-los no controle da situação e promover um ambiente inclusivo. Além disso, tenha calma e seja pragmático sobre as ações que você tomar, pois se a equipe perceber você como impaciente, irritada(o) ou desesperada(o), você poderá transferir essas emoções para eles.

**Preste atenção ao burnout**. Fique atento se as pessoas estão trabalhando demais, sendo convidadas para muitas reuniões, sendo interrompidas muito durante o trabalho ou recebendo solicitações fora do horário de trabalho. Use bem os one-on-ones para que você e eles possam ser francos sobre as principais questões que os estão levando ao stress.

Se você vir fortes sinais de burnout, aja para melhorar a vida profissional da pessoa em tudo que estiver ao seu alcance e aconselhe-as a procurar ajuda externa, se necessário.

**Se você planejar bem, poderá diminuir o impacto da saída de uma pessoa**. O processo de transição será tranquilo se você tiver um plano claro. Você deve procurar contratar um substituto, definir como será feita a comunicação com a equipe e como será feita a entrega.

## Deixando claro as expectativas

Até agora eu compartilhei dicas sobre como tirar a pressão da equipe e criar um ambiente sustentável no trabalho. No entanto, não se esqueça de que você está gerindo um negócio. Embora seja inevitável que haja um impacto no desempenho, é crucial estar em sintonia com as exigências dos negócios e estabelecer expectativas claras.

Em uma organização saudável, esperamos uma boa colaboração entre todas as equipes multifuncionais para resolver o problema de baixa capacidade, mas não sejamos ingênuos, eles virão para você quando as entregas estiverem atrasadas ou os clientes estiverem reclamando.

**Cruze o escopo da responsabilidade de sua equipe com o time disponível**. Eu faço isso com uma tabela:

- As colunas são todos os componentes do produto que a equipe é responsável;
- As fileiras são membros da equipe;
- Os valores são a porcentagem da estimativa aproximada da alocação de uma determinada pessoa, uma linha de valores deve sempre somar 100%, porque não deve ter excesso de trabalho;
- A última linha é uma soma de valores na coluna, representando a quantidade de alocação que um determinado componente normalmente tem;
- Se você estiver negociando o efetivo de pessoal, acrescente outra linha para indicar qual é o número ideal de pessoas em um determinado tópico.

Esta abordagem torna muito fácil visualizar quais os componentes que estamos ignorando devido ao fato de termos menos pessoas na equipe. Em minha experiência, esta tabela sempre ajudou as equipes comerciais e a alta gerência a entender a situação. Além disso, é uma ótima ferramenta para conscientizá-los de que o desenvolvimento de software não é apenas a construção de novas funcionalidades, mas requer manutenção, qualidade e gerenciamento de infra-estrutura.

**Tenha suas métricas em mãos**. A tabela de alocação, apesar de ser útil, é um pouco subjetiva. Hoje em dia não é difícil extrair métricas das ferramentas de desenvolvimento de software que usamos. É importante ter uma base para comparar o desempenho anterior com o atual.

- O cycle time, o tempo desde quando o primeiro commit é feito até o lançamento da tarefa na produção, tende a aumentar. Aplica-se também ao tempo de merge de Pull Request ou qualquer métrica baseada em tempo;
- A velocidade ou o número de deploys tendem a ser menores. Os gráficos de Burndown ficam mais planos;
- O tamanho do backlog aumenta. Você também pode observar a coluna de tarefas no board tendo mais tickets do que o normal;
- A proporção de builds falhos ou regressões também tende a aumentar;
- Se você tiver qualquer métrica de produto ou de negócio que seja impactado pela baixa capacidade, use-a para comprovar a situação para os outros times.

**Comemore as vitórias**. Isto deve ser feito independentemente de ter uma equipe com baixa capacidade ou não. Mas qualquer injeção de felicidade e otimismo é sempre bom para manter a motivação alta. Além disso, isso mostrará ao resto da empresa o quanto são valiosas as contribuições de sua equipe.

## E agora?

Será que ao tentar todas essas dicas, a minha equipe começará a ter um desempenho cada vez melhor, a ponto de não ser mais necessário contratar ninguém?

A resposta é... Não.

Assim como a [vacina de Covid](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines/advice) não protege você 100% da infecção, mas definitivamente aumentará suas chances de ter apenas sintomas leves e sobreviver. Estas dicas ajudarão sua equipe a passar por um período difícil com uma base sólida na qual possa confiar.

Porém, não se engane. Contrate o mais rápido que puder! Há sempre um limite para a paciência e será um caminho duro de percorrer. Eu mesmo coleciono alguns sucessos, mas também fracassos ao tentar manter uma equipe faltando pessoas estável.

---

Um pequeno apêndice:

Sua empresa está tentando fechar seu projeto ou departamento? Pode ser bastante desagradável perceber isto quando você é pego de surpresa.

Nesse caso, as dicas deste post não serão tão úteis. Eu recomendo planejar uma transição com seu gerente e ajudar sua equipe a fazer o mesmo, seja na mesma empresa ou fora dela.

---

_Obrigado a [Luiz Rocha](https://twitter.com/lsdr) por revisar este post._
