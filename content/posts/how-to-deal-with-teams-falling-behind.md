---
title: How to deal with teams falling behind
description: What's my strategy to keep an engineering team stable when there's a shortage of talent and hiring is not an option.
datePublished: '2022-02-04T00:00:00Z'
author: Luis Cipriani
tags: people, management, engineering, teams, hiring, performance
image: /img-posts/htdwtfb-thumb.png
alternate:
  - lang: pt-BR
    slug: aliviando-a-pressao-quando-o-time-de-desenvolvimento-esta-pequeno-demais
---

It can be for many reasons: your business was impacted by Covid and had to lay off people, or your company grew too fast and recruiting could not keep up, or you received an unusual amount of resignation letters in a short period of time. Suddenly your team has not enough talent to keep the rhythm and is falling behind.

**Teams at a low capacity lose their ability to contribute fast and well**, morale will go down because they see less work being delivered, more reports of regression bugs and the feeling that there's no time to work on ideal solutions. In the end, most of the work is to fulfill the pressure of the business.

In the book "The elegant puzzle", [Will Larson](https://twitter.com/lethain) introduces [the four stages of a team](https://lethain.com/durably-excellent-teams/) and what they need to be able to increase performance. He shares that for teams that are falling behind, the fix is to hire more people while providing tactical support, which is a logical step given the low stock of talent. Furthermore, he emphasizes that changing a team from one state to the other is a slow process, which demands patience and a solid reaction from the manager.

I've been working for the past 6 years in startups and this scenario is very familiar to me, including situations where not even hiring was an option. I would like to share what's on my playbook to keep a team stable. And I hope these tips help your teams as well.

![](/img-posts/htdwtfb-thumb.png)

## Adapt the workflow to a new reality

The first hard truth to swallow is that **your team won't be able to handle too many parallel initiatives as before**. The reason being that working in simultaneous different tasks demands switching contexts frequently. This will, as a consequence, increase the stress in the development team and reflect poorly on the code being released to customers.

**They also will be taking longer to complete their tasks** because you don't have the collaborative environment you had before. No pair programming, not enough peers to review code, less people to share ideas and discuss problems.

Find the balance by making your development process sustainable again:

- **Tame the backlog**: the tendency is that it will only grow. Backlogs always get messy with time anyway and you should review it and remove any tasks that are not a top priority. Don't underestimate the power of simply hiding it from the team and keeping tasks in a backlog of the backlog.
- **Start less, finish more**: finishing a feature brings more value to customers than starting new ones. Make sure every epic or initiative that's started has an end before picking the next big thing. Even if to make it happen we concentrate the whole team on it. This will help to decrease context switching.
- **Shutdown external requests channels**: I'm all in for software engineers collaborating with customers and business teams, but embrace the reality that this can drain their focus now. It might be a good moment to put someone (or yourself) in between representing the team and optimizing their time.
- **Never trade off quality over speed**: it can be contradictory, but you need to empower your team to accept the lower speed of delivery. It's easy to sacrifice quality over speed in these situations, but the pay back is expensive and it comes in the form of regression bugs and unexpected fires to put out. It's better to do it right, instead of faster.

These tips are targeted to help us to deal with the work in progress, but remember that the backlog will continue to grow. Let's see how we can take care of that.

## Focus!

Given that hiring is a slow process, the only option we have to avoid the team burning out is to narrow the focus of work.

**Break it down, work on smaller things**. Developing a feature with large scope and complexity increases the chance that the team will spend a long time on it. It can steal time that would be used to solve tech debts or even fix a critical issue in production. Work with the product team to create smaller iterations that can be released as early as possible to users. As a consequence, your team will feel that they are always progressing and delivering often.

This exercise can also be applied to tasks. Small tasks are easy to code, review and release. It will pump up the cycle time and throughput metrics.

It might be good to even stop feature development at all and focus only on tech debts. It is hard to negotiate with the product team, but worth a try, especially if you can demonstrate that fixing them will improve users happiness more than any other new feature they propose.

**Be rigorous in the refinement process**. When a cross-functional team is working together for a long time, the specifications tend to omit details and cover only the surface of the requirements. It's understandable, teams involved trust each other and the fine details are sorted out during development. Now, with low capacity, people are not as available as before and clarifying topics will take longer.

I'm assuming that at least product research and discovery is done well, if that's not the case, challenge every product assumption that's not backed by irrefutable evidence. And of course don't turn this into a petty revenge.

Being more criterious over the specification input will shift the workload back to the product team, decreasing the overhead of communication once the feature is started. This can even have a positive effect on the test results and numbers of regressions.

**Avoid committing to deadlines or estimations**. The reason is that now there's too many uncontrollable variables influencing how long a task will take. With fewer people to work on the project, every interruption, incident or meeting will have a greater influence on the deadline compared to a team with an adequate size. If a company wants to get serious about deadlines, then get serious about building great teams first.

Estimating well is an important skill to have, don't get me wrong, especially when the deadline is defined by an external factor. You should still make the effort to have at least a baseline to share with your team and compare with the final result. Then use these outcomes to negotiate scope of the next features.

**Organize special activities**. We call it Hackday, in your company you might use a different name for it. Software engineers have a whole day to work on whatever project they want. It may sound counterintuitive, but allowing them to relax from the daily pressure and work on their favorite initiatives, develop themselves and accomplish personal career goals is a great way to keep a good cadence during a crisis.

In more than 10 years doing these hackdays, I never had the feeling that I was wasting company money or time. There were always good outcomes from it, being a fix to an old tech debt or bringing joy and satisfaction to the teams.

## Care about people

The level of stress will increase when teams have a shortage of talents. People will start to question themselves whether they should find some other place to work. It's your responsibility as a manager to know how this situation is affecting the team and help them to overcome the problems.

**Ensure you have a psychologically safe environment**. There's a good chance that failures will happen more often now. It's your job to encourage your team to speak up about their ideas, concerns and failures without fearing retaliation or bad judgment. This behavior will promote more trust between the team and also increase transparency in the environment.

**Be honest**. The worst that you can do is to try to hide from the team the reality when the side effects are so perceptible. Sharing the problem with them opens the door to discussions that can lead to solutions, put them in control of the situation and promote an inclusive environment. In addition, be calm and be pragmatic about the actions you take because if the team perceive you as impatient, irritated or desperate then you can transfer these emotions to them.

**Pay attention to burnout**. Keep an eye on whether people are overworking, being invited to too many meetings, getting interrupted a lot during work or getting requests outside of work hours. Use 1:1 meetings well so you and them can be open about the main issues that are leading them to stress out.

If you see strong signs of burnout, act to improve their work life on whatever is in your power and advise them to look for external help if necessary.

**If you plan well, you can decrease the impact of a person leaving**. The transition process will be smooth if you have a clear plan. You should look to hire a replacement, define how the communication to the team will be done and how the handover will be.

## Setting expectations

I have been so far sharing tips on how to take some pressure off the team and create a sustainable environment. However, **don't forget that you are running a business**. While it's inevitable that there will be an impact on performance, it's crucial to stay in tune with business demands and set clear expectations.

In a healthy organization we expect a good collaboration among all the cross-functional teams to solve the low capacity problem, but let's not be naive, they will come for you once the releases are getting late or customers are complaining.

**Match the scope of your team's ownership to the people available**. I do that with a table:

- Columns are all components of the product the team takes care;
- Rows are team members;
- Values are the percentage of rough estimation of allocation of a given person, a row of values should always sum to 100%, because no overwork;
- The last row is a sum of values in the column, representing how much allocation a given component usually has;
- If you are negotiating headcount, add another row to indicate what's the ideal number of people in a given topic.

This approach makes it very easy to visualize which components we are ignoring due to having fewer people in the team. In my experience this table always helped business teams and top management to understand the situation. In addition, it's a great tool to bring to their awareness that software development is not only about building new features, but it requires maintenance, quality and infrastructure management.

**Have your metrics in hand**. The allocation table, despite being helpful, is a bit subjective. Nowadays it is not hard to extract metrics from the software development tools we use. The key takeaway is to have a baseline to compare previous performance with the current one.

- Cycle time, the time from when the first commit is done till the task is released in production, tends to increase. Applies also to Pull Request merge time or any duration-based metric;
- Throughput or number of deploys/releases tend to get lower. Burndown charts get flatter;
- The size of the backlog increases. You can also observe task columns in the board having more tickets than normal;
- Ratio of failed builds or regressions also tend to increase;
- If you have any product or business metric that's impacted by the low capacity, it can make even a better case for investing in the team.

**Celebrate wins**. I mean, this should be done independently of having a team falling behind or not. But any injection of happiness and optimism is always good to keep them motivated. Plus it will show to the rest of the company how valuable your team contributions are.

## Now what?

_Could it happen that by trying all these tips my team starts to perform better and better to the point that it's not necessary to hire anymore?_

The answer is... **No**.

Just like the [Covid vaccine](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines/advice) won't be protecting you 100% from infection, but will definitely increase your chances of having just mild symptoms and surviving. These tips will help your team to go through a tough time with a solid foundation to rely on.

Nevertheless, don't fool yourself. **Hire as soon as you can!** There's always a limit for patience and it will be a bumpy road. I myself collect some successes but also failures trying to keep a falling behind team together.

---

A short appendix:

Is your company trying to shut down your project or department? It can be pretty unpleasant to realize this when you're the non informed.

In that case the tips in this article won't be that helpful. I recommend planning a transition with your manager and helping your team to do the same, being in the same company or outside of it.

---

_Thanks to [Luiz Rocha](https://twitter.com/lsdr) for reviewing this post._
