/**
 * Localized narrative copy aligned 1:1 with `LIFE_MAPPING_TOPOLOGY` (reference: “connecting the dots” timeline).
 */

export interface LifeMappingNodeCopy {
  /** Must match a node id in `LIFE_MAPPING_TOPOLOGY` (e.g. `n1`). */
  id: string
  label: string
  date: string
  /** Tag shown in the detail panel meta line (e.g. “性格 / 爱好 / 价值观”). */
  tag?: string
  desc: string
}

const EN: readonly LifeMappingNodeCopy[] = [
  {
    id: 'n1',
    label: 'My First Big Hit',
    date: '2011',
    desc: 'In middle school, I casually sketched a simplified portrait of my math teacher on a scrap piece of paper (a polite version). Because it was both eerily accurate and unintentionally hilarious, the drawing quickly spread through the class like wildfire. For the rest of that day, students would deliberately come over during every break just to see it at my desk—and then we’d all end up laughing so hard we could barely stand upright.\n\nIn the midst of everyone doubling over with laughter, I found a strange but immense sense of satisfaction.\n\nOnly when I looked back as an adult did I realize that I had always had a strong sense of humor and an almost compulsive urge to make things funny. I was fascinated by the moment people burst out laughing in unison. Even now, I still gravitate toward anything that makes people laugh uncontrollably. Looking back, **“being funny”** has probably been one of my most instinctive and deeply felt impulses all along.',
  },
  {
    id: 'n2',
    label: 'Doodling and Having Fun',
    date: '2020',
    desc: 'I first picked up a paintbrush on a whim, expecting it to be just another passing phase. Unexpectedly, painting turned into something I’ve come to enjoy on a deeply instinctive, almost bodily level.\n\nI started by drawing people around me—family and friends—carrying over my loose, slightly irreverent way of sketching. Surprisingly, those “improvised” portraits were received with more affection than I had expected from them.\n\nOre drawn to the physical sensation of paint moving across the canvas under the brush—the richness, the weight, the fullness of color. There are moments when I lose track of time completely while painting, slipping into a kind of flow state. I find myself hoping to keep it that way: without the pressure to improve, and without assigning any fixed purpose—just free, unburdened doodling.',
  },
  {
    id: 'n3',
    label: 'My First “Business Project”',
    date: '2012',
    desc: 'During the summer after graduating from middle school, I sorted through a pile of unused tutoring books and extracurricular reading materials. It felt wasteful to just throw them away, so I wanted to pass them on to people who might actually need them.\n\nThe first thing I came up with was to design flyers—writing humorous, attention-grabbing copy and adding hand-drawn doodles—then photocopying a stack to distribute around the neighborhood.\n\nI roped in my dad and my cousin as part-time “manual labor,” and we chose to go out every evening, carrying bags of books and enthusiastically pitching them as if we were running a real operation.\n\nThere’s a kind of natural lack of defensiveness among kids, and this little second-hand book “business,” aimed at even younger students, went surprisingly smoothly. Looking back, that experience—designing the flyers, coordinating people, and stepping into a real-world market—was probably my **first improvised, full-cycle business project**.',
  },
  {
    id: 'n4',
    label: 'Urban Planning',
    date: '2016',
    desc: 'Seven years of studying urban planning marked the starting point of how I began to understand society.\n\nIntroductory aesthetics courses planted the seed of my interest in visual expression and creative methods, nudging me toward more intentional and design-driven forms of communication. Through fieldwork and internships, I moved deeper into real-world contexts and even stepped into professional environments, where, in several project highlight moments, I experienced the simple joy of having my capabilities recognized.\n\nUrban planning gave me a kind of dual skill set. On one hand, I learned to dissect complex situations through **rational research and data gathering**; on the other, I developed **a sensitivity to aesthetics** that allows me to construct and communicate visions of the future. What attracts me most is the latter—the storytelling aspect: weaving together data, geography, and human needs into a spatial narrative with a beginning, tension, and resolution.',
  },
  {
    id: 'n5',
    label: 'An Unexpected Highlight in Writing',
    date: '2021',
    desc: 'Graduate school brought an unexpected opportunity: contributing to a book project led by my advisor, exploring the grand themes of urban axes and city skylines. At first, the task felt intimidating. But once I immersed myself in the literature, case studies, and research trails, I discovered the peculiar satisfaction of slowly untangling a complex problem. In the end, I completed nearly 60,000 words for the first draft of the book’s second chapter.\n\nThe first time I saw my name printed in a published book, it planted a quiet seed of confidence in my ability to write.\n\nLater came my master’s thesis—a different kind of challenge, but equally demanding. It was a long period of concentrated, high-pressure output. I simply focused on doing the work, and was pleasantly surprised when the thesis was nominated for an Outstanding Thesis award during the external blind-review process.\n\nLooking back, I realized that I have more endurance—and more confidence—when it comes to **writing and research** than I had ever given myself credit for.',
  },
  {
    id: 'n6',
    label: 'A Small Win',
    date: '2020',
    desc: 'After receiving my entrance exam results for graduate school, nearly every piece of advice and conventional wisdom pointed to the same conclusion: my score was probably not high enough to make it into the interview round.\n\nFaced with that overwhelming consensus, I decided to make my own assessment. I gathered every piece of publicly available information I could find—from prep organizations, score reports, and admission lists—and considered the unusual circumstances surrounding that year’s exam. My conclusion was that the usual score patterns from previous years were unlikely to hold. Based on all the information available to me, I believed I still had a realistic chance of advancing to the next stage.\n\nAs it turned out, the outcome matched my analysis. I made it into the interview round and ultimately secured admission through a strong interview performance.\n\nLooking back, that small victory revealed something about myself: I enjoy navigating uncertainty, piecing together scattered clues, and **finding signals hidden within complex information**.',
  },
  {
    id: 'n7',
    label: 'Wild Physics Tutor',
    date: '2020',
    desc: 'During the summer before I started my master’s program, my middle school cousin was suffering terribly from physics. I casually stepped in to help (physics happened to be one of my stronger subjects). While tutoring her, I learned that she and three of her close friends were also struggling—each of them scoring around 20 to 30 out of 100 on average. That’s when I decided to run a “physics rescue crash course” for the four of them (for a small fee).\n\nI assigned problem sets, prepared teaching slides, and over a six-week period conducted intense weekend training sessions. By the time the school exams came around, all four girls pulled off a dramatic turnaround—their physics scores jumped by an average of 40 points.\n\nThe sense of accomplishment inflated my ambitions a bit. Later, I even used my graphic design skills to create personal tutoring business cards and asked my cousin to help promote them. Although I ultimately enrolled zero students, it still felt like a small experiment in moving from “targeted academic rescue” to early-stage personal branding and marketing.',
  },
  {
    id: 'n8',
    label: 'Snippets of a Digital Native',
    date: '2010s',
    desc: '**I’ve been someone who "loves surfing the web" since I was a kid. To my younger self, the internet was a space where I could break through boundaries and grow outward.**\n\nWhat I appreciate most now are the beautiful, serendipitous connections the internet brought my way. Through a pen-pal app, I met a fellow bird-loving friend; we transitioned from an offline meetup to friends who stay in close touch. I also connected with a language partner from Canada; we exchanged glimpses of our lives across the ocean and eventually met up in person in Beijing and Shanghai.\n\nThat inspiration from afar and a far-reaching curiosity have truly helped me expand the horizons of my world.',
  },
  {
    id: 'n9',
    label: 'Career Pivot',
    date: '2023',
    desc: 'After seven years in urban planning, there was still much about the field that I loved: its concern for people, its appreciation of visual aesthetics, and its emphasis on rigorous analysis. Yet broader economic shifts were impossible to ignore. The industry entered a downturn, and the path ahead seemed to narrow with each passing year.\n\nFaced with the uncertainty and anxiety that come with seven years of sunk costs, I spent a great deal of time reflecting. Eventually, I arrived at an answer that felt right to me: the value of a discipline lies in what it teaches you and how it expands you. It adds possibilities to your life; it does not confine you to a single path.\n\nA major is, after all, **a category created by the education system. It can equip me with skills, perspectives, and confidence, but it cannot define the full extent of what I am capable of.**\n\nSo I decided to let go of the label and start experimenting more freely. A podcast episode sparked my interest in Web3, so I went off to explore it. The video-editing skills I had picked up from making comedic vlogs found a second life in content creation. Once I entered the workforce, I met more people who were constantly reinventing themselves through bold experimentation.\n\nWatching them, I came to realize that almost everything is learned by doing. In a world that changes faster than any curriculum can keep up with, **the ability to keep learning matters more than any single specialization**. Whatever I choose to learn next can become my new field of expertise.',
  },
  {
    id: 'n10',
    label: 'A New Chapter in Beijing',
    date: '2023',
    desc: 'For work, I moved more than a thousand kilometers from home to Beijing and began a new chapter of my life.\n\nAs it happened, those years coincided with the rise of large language models. Standing near the center of that technological wave, I found myself moving between Tsinghua University and Beijing’s tech hubs, watching the AI landscape evolve in real time. Over the course of three years, I saw headlines arrive one after another, models grow larger and more capable, and the conversation shift from the early excitement around chatbots toward a future shaped by multimodal AI and spatial intelligence. I immersed myself in learning everything I could about AI, while also gaining a deeper appreciation for how frontier technology companies tell their stories.\n\nOf course, I also experienced the loneliness and long adjustment period that often come with building a life in a new city. But I remain grateful for what felt like an inevitable rite of passage into adulthood.\n\nIn Beijing—the so-called "center of the universe" in the eyes of many—the most remarkable thing was never just the technology. It was the people. I met countless young individuals who were intelligent, imaginative, and relentlessly action-oriented. For the first time, I was also able to see, up close, the kinds of people I once hoped to become.\n\nLooking back, the most valuable thing Beijing gave me was not any single opportunity, nor any particular encounter that grew out of it. It was a broader horizon and a more diverse set of perspectives. Beyond the noise of technology and the solitude of city life, I discovered that I remain deeply excited about the possibilities life has to offer. And I continue to be fascinated by the many different ways a life can be lived, **always curious to observe, understand, and experience more of them**.',
  },
  {
    id: 'n11',
    label: 'Learning from the Body',
    date: '2020s',
    desc: 'After leaving home to build a career elsewhere and navigating the pressures of working life, I experienced firsthand what it felt like to live in a state of chronic exhaustion. That period led me to pay serious attention to something I had long taken for granted: health.\n\nOver time, I became interested in Traditional Chinese Medicine and Daoist cultivation practices. The more I learned, the more I came to believe that a healthy body, a calm mind, and a clear head naturally give rise to a grounde\n\nOver time, I became interested in Traditional Chinese Medicine and Daoist cultivation practices. The more I learned, the more I came to believe that a healthy body, a calm mind, and a clear head naturally give rise to a grounded and balanced heart—and, often, to healthier relationships as well. Each of these things shapes and reinforces the others.\n\nI’ve also begun to wonder whether some forms of success are less something to be chased directly and more a byproduct of being in a genuinely healthy state of being.\n\nThis perspective has led me to rethink both the meaning of health and its place among life’s priorities. A good state of being may not mean being endlessly productive or perpetually energized. In an age that often rewards restlessness, **I want health to be a long-term pursuit**—a vessel within which I can cultivate steadiness, clarity, and balance.\n\nI want to learn how to care for myself, how to devote time and patience to the people and things that truly matter, and then, from that foundation, meet whatever life brings with greater ease and openness.',
  },
  {
    id: 'n12',
    label: 'Birdwatching Days',
    date: '2024',
    desc: 'Influenced by friends who are passionate about birds, I’ve also become deeply drawn to a way of life that feels less urbanized and less centered around any single system or structure.\n\nAfter moving to Beijing, I joined a birdwatching group, which introduced me to many like-minded and genuinely delightful people. Whether we are watching birds, clouds, water, or even the veins of leaves, directing attention to these small details allows the noise of everyday trivialities and the endless stream of information to recede into the background. In those moments, being present in the natural world, everything feels equal—and life, in all its forms, feels fragile.\n\nThe smaller the creatures I observe, the larger the sense of nature becomes. And in that expanded view, I’m also reminded of human insignificance, and at times, human arrogance.',
  },
  {
    id: 'n13',
    label: 'On the Small, the Real',
    date: '2020s',
    desc: "Compared to grand, abstract narratives that feel detached from lived reality, I find myself more curious about the variety of individual life paths, the subtle textures of emotion, and the countless ways people choose to live. I’m also drawn to moments that feel grounded in everyday life—imperfect, rough around the edges, even a little unpolished. Things like personal confusion, fatigue, love, hesitation…\n\nWithin what I can see and reach, I want to pay closer attention to these individual, female, and contemporary experiences. I want to see more of them, and to try, in my own way, to observe and document them.",
  },
  {
    id: 'n14',
    label: 'Feminism',
    date: '2020s',
    desc: 'As I entered my twenties and began to encounter society in a more direct and unfiltered way, the shared realities of being a woman also came crashing into my awareness. I started to sense the more subtle forms of scrutiny, as well as structural inequalities that had long been embedded in plain sight—and I felt anger in response.\n\nFrom that point on, I chose to carry a female perspective into how I observe, engage with, and participate in the world. To make a deliberate effort to see those who are often rendered invisible, and to stand, in a sustained and unwavering way, alongside other women.',
  },
  {
    id: 'n15',
    label: 'Keeping a Journal',
    date: '2025',
    desc: 'Keeping a journal feels like a slow form of self-observation. It allows me to see my own emotions, confusions, and shifts in perspective more clearly, and it has been a meaningful support in my personal growth.\n\nIn the process of watching myself unfold across page after page, I also began to notice a strong, restless need to express. It gathers quietly within the boundaries of the written page, like water slowly accumulating behind a dam—perhaps one day it will overflow, spilling out beyond the confines of this small notebook.',
  },
]

const ZH: readonly LifeMappingNodeCopy[] = [
  {
    id: 'n1',
    label: '人生第一个“爆款”',
    date: '2011',
    tag: '性格',
    desc: '初中在草稿纸上随意画下数学老师的简笔肖像（礼貌版），因神似与夸张喜感，这张草稿纸在班里爆炸传阅。那天的每个课间，都有同学专程来我的座位慕名观看，然后一起笑得直不起腰。\n\n我在大家的前仰后合之间得到巨大的满足。\n\n成年后回忆起才意识到，一直以来我都拥有着旺盛的**幽默感和搞笑欲**，对于让人哄堂大笑感到着迷，到现在仍然喜欢那些捧腹大笑之事，长大后回头看，**“好笑”**是我最在乎、最本能的表达欲。',
  },
  {
    id: 'n2',
    label: '有趣万岁，乱画万岁',
    date: '2020',
    tag: '爱好',
    desc: '带着三分钟热度拿起画笔，没想到画画演变成生理性喜欢的爱好。\n\n我画身边的家人朋友，延续乱画的态度和一点点“冒犯”，竟然收获ta们意料之外的喜爱。之后更迷上了画笔裹着颜料在画布游走的触感，喜欢浓郁饱满的颜色。常有画到忘记时间的心流时刻，期待继续不背负进步，不预设目的的涂鸦。',
  },
  {
    id: 'n3',
    label: '第一次“商业全案”',
    date: '2012',
    tag: '尝试',
    desc: '初中毕业的暑假，收拾闲置的辅导书和课外书，丢掉觉得浪费，希望这些书转移到需要的人手上。\n\n想到的第一件事是绘制宣传单，写上幽默吸睛的文案，配上手写涂鸦，然后复印一叠进行分发。请爸爸和表妹一起兼职苦力，选在每个傍晚时分提着书激情地推。\n\n未成年人之间天然没有防备心，这桩面向更年轻顾客的二手书生意进展顺利。那次靠着画传单、协调人力、走进市场的经历也算我的**第一次野生商业全案**。',
  },
  {
    id: 'n4',
    label: '城市规划',
    date: '2016',
    tag: '专业',
    desc: '七年的城市规划学习，是我认识社会的起点。\n\n基础美学课帮我种下了对视觉表达与创作方法的兴趣，推着我去尝试更具**审美力**的表达；参加实践后深入田野、走进职场，也在几次项目的高光时刻里，体验到能力被看见的快乐。\n\n城市规划赋予我一种双重能力，用**理性的调研与资料收集**去抽丝剥茧，也用**敏锐的审美力**去讲述某种未来的图景。后者这种storytelling是最吸引我的部分：把数据、地形、人的需求，串成一个有起点、有冲突、有落点的空间叙事。',
  },
  {
    id: 'n5',
    label: '码字的意外高光',
    date: '2021',
    tag: '擅长',
    desc: '进入研究生阶段，参加了导师的书著项目，去梳理有关城市轴线与轮廓线的宏大命题。起初觉得是个巨大的挑战，可当真正沉浸进资料与调研线索中时，竟然品尝到了抽丝剥茧的研究爽感，最终完成了书籍第二章近**六万字**的初稿书写。\n\n当第一次在书籍上看到自己的名字，心里埋下了一颗关于**写作**的自信种子。之后撰写毕业论文，同样是一场需要高压输出的闭关长跑，只是专心去产出，没想到在校外盲审中获得优秀毕业论文的提名推荐。\n\n后来意识到，对于**文字输出**和**做研究**，我比自己想象的更有力量。',
  },
  {
    id: 'n6',
    label: '一场小胜算',
    date: '2020',
    tag: '擅长',
    desc: '得到考研初试成绩后，收到的很多经验判断都指向我的分数大概率无法进入复试。\n\n在一致的声音中，我开始自己的判断，我找到了所有考研机构的可公开信息，结合当年的考题的特殊性，我认为当年的结果不能照搬过去的分数规律，根据我得到的所有可公开名单，判断自己仍然有把握进入复试。后来，结果与我的分析一致，顺利进入复试完成面试逆袭。\n\n现在回头看，这场小胜算让我看到自己具备**复杂信息中寻找线索的能力**。',
  },
  {
    id: 'n7',
    label: '野生物理老师',
    date: '2020',
    tag: '尝试',
    desc: '读研前的暑假，初中表妹被物理折磨得痛不欲生，我顺手辅助（物理是我擅长的科目），辅导过程中了解到她还有三位闺蜜，物理平均分均为20到30分。我决定为这四个女孩开办物理拯救速成班（收取了少量费用）。\n\n我给她们配置习题、准备了教学 PPT，经过一个半月周期的每周末生猛特训，四位少女在开学考试中迎来史诗级逆袭，物理平均分涨幅40分。\n\n成就感让我野心膨胀，后来借助平面设计技能设计了个人家教名片，请表妹推销。虽然最后招募到0位学生，但这也算自己精准扶贫到品牌营销的小小尝试。',
  },
  {
    id: 'n8',
    label: '互联网原住民二三事',
    date: '2010s',
    tag: '性格',
    desc: '我从小就是一个“很爱上网”的人，对于小时候的自己来说，它是帮助我冲破边界的地方。\n\n后来最感激的是互联网带来的那些因缘际会。我在笔友软件里认识了爱鸟友友，从线下见面变成了时常联络的朋友；也结识了加拿大语言伙伴，隔着大洋交换彼此的生活，也在北京和上海见过面。\n\n我珍视那些远方的启发与遥远的好奇心。',
  },
  {
    id: 'n9',
    label: '转行',
    date: '2023',
    tag: '经历',
    desc: '在城市规划经过七年学习，我喜欢专业的人文关怀、视觉美学与理性分析。然而无奈时代风向转变，行业下行不期而至，岸上的路正在变窄。\n\n面对七年沉没成本带来的担心与迷茫，在注视与内省中，我找到了我相信的答案：专业的本质是学习与充实，是为人生增添一种可能，不是只能走这条路。**专业是教育制度定义出来的产物，它为我赋魅而不能定义我的能力。**\n\n于是撕掉标签，开启野生的生猛尝试。听播客被 Web3 吸引便去探索，凭着之前搞笑 Vlog 积攒的剪辑手艺去自媒体小试。进入职业后，认识了更多生猛的探索者，我意识到所有事情都是**learning by doing**，面对变化的世界，**终身学习能力比专业更重要**。无论学什么都能成为我的新专业。',
  },
  {
    id: 'n10',
    label: '北京新篇章',
    date: '2023',
    tag: '经历',
    desc: '因为工作，跨越了一千多公里来到北京，开启新篇章。\n\n恰好是大模型浪潮席卷而来的几年，站在大模型浪潮的暴风眼，我在清华园与科技园之间往返。三年时间，见证了新闻层出不穷，模型更大更强，从 Chatbot 的初潮涌向多模态与空间智能的未来。我在这里疯狂吸收 AI 知识，领悟前沿的科技品牌叙事。\n\n固然，我也经历了北漂特有的孤独与漫长的适应期，但仍感恩这场必然的成人化时刻。处在大名鼎鼎的“宇宙中心”，闪耀的除了技术，还有人，我在这里结识了很多聪明、有想法、有行动力的年轻人，也近距离看到曾经想成为的前辈模样。\n\n回头看，北京带给我最重要的东西不只是某个具体机会、借此而生的相遇，更是个更大的视野、更多元的价值观。穿过科技的喧嚣，城市的孤单，**我发现自己仍然对外层的生活愿景满怀期待，也依然对更多面的人生态态，抱有深深的好奇与体察。**',
  },
  {
    id: 'n11',
    label: '向身体学习',
    date: '2020s',
    tag: '生活方式',
    desc: '经历过离乡发展和职场压力，我体验过陷入亚健康的无力，开始重新关注“健康”这件事。\n\n后来了解中医和道家功法，也越来越相信，拥有健康的身体、舒缓的精神、清明的大脑，会自然而然长出端正平和的心，舒适的人际关系，它们也彼此影响着。我想一些表面的成功，也许是生命状态健康之后顺带而来的副产品吧。\n\n这让我重新思考健康的意义和生命中的优先级。好的状态，或许不是永远高效、永远亢奋；浮躁的时代，**我想让健康成为我的长期追求**，以此为容器，修得一颗端正的心。学会照顾自己，学会分配时间与耐心给生命中重要的人和事，然后再放心承接命运的一切流动。',
  },
  {
    id: 'n12',
    label: '观鸟日常',
    date: '2024',
    tag: '爱好',
    desc: '受爱鸟之友的影响，我也深深被这种非城市化的、去中心化的生活方式所吸引。\n\n后来来到北京，加入观鸟组织，我借此认识了更多的可爱鸟友。不管是观鸟、观天、观水还是观树叶，当注意力聚焦于这些微小之物，那些琐碎的日常和无休止的信息流才有机会退到远处。置身天地的当下，只觉得万物平等，生命脆弱。\n\n当观到更小的生物，反而看到更大的自然，也会观到人类的渺小和傲慢。',
  },
  {
    id: 'n13',
    label: '真实',
    date: '2020s',
    tag: '价值观',
    desc: '比起悬浮的宏大叙事，我更好奇那些不同的人生路径、不同的情绪纹理、不同的生活选择，也被那些带着烟火气的、并不完美甚至粗粝的瞬间吸引，个体的困惑、疲惫、爱与犹豫……\n\n在我的视线所及之处，关于那些个体的、女性的、当代的，我想看见更多，也试图记录和纪录。',
  },
  {
    id: 'n14',
    label: '女性主义',
    date: '2020',
    tag: '价值观',
    desc: '进入人生的20年代，当社会层面的真实在我的世界展开，属于女性的共同命运也在此刻与我轰然撞击。我开始感受到那些隐蔽的审视、系统性的不公，并为此感愤怒。\n\n我决定永远带着女性的视角去观察、去涉足和在场，去坚定地看见那些被遮蔽的个体，去和所有女性长久地站在一起。',
  },
  {
    id: 'n15',
    label: '写日记',
    date: '2025',
    tag: '爱好',
    desc: '写日记这件事像一种缓慢的自我观察，它让我重新看见自己的情绪、困惑与变化，对我的成长有很大的帮助。\n\n也就是在这一页页旁观自己的过程中，我发现自己体内翻滚的表达欲，它们在纸页的围垦里静静蓄水，也许终有一天会不可遏制地从这个小小的日记本里溢出来。',
  },
]

/**
 * @param lang - i18n language string (e.g. `zh`, `en`)
 */
export function getLifeMappingNodeCopyRows(lang: string): readonly LifeMappingNodeCopy[] {
  return lang.startsWith('zh') ? ZH : EN
}
