// AIIP-HISTORY-01. A deliberately selective timeline, not a claim to cover all AI history.
// Events cite contemporaneous publications, archives, or originating institutions.
export type HistoryMoment = {
  year: string; title: string; description: string; significance: string;
  correction: string; source: string; sourceLabel: string; era: string;
};
export type HistoryEra = {
  id: string; label: string; years: string; index: string; title: string; subtitle: string;
  imagined: string; actual: string; lesson: string; visual: string;
};
export const historyEras: HistoryEra[] = [
  {
    id:"questions",label:"The questions",years:"1943–1950",index:"01",title:"Could a machine ever think?",
    subtitle:"Long before chatbots, researchers were trying to describe thought and learning with mathematics.",
    imagined:"Perhaps intelligence could be described well enough for machines to imitate parts of it.",
    actual:"Researchers proposed simplified models of nerve cells and ways to test a machine's conversational behavior. These were ideas and experiments, not modern thinking machines.",
    lesson:"The earliest work was as much about asking better questions as building working systems.",visual:"neuron"
  },
  {
    id:"beginning",label:"A new field",years:"1956–1958",index:"02",title:"The idea gets a name.",
    subtitle:"A group of researchers gave this work a shared identity: artificial intelligence.",
    imagined:"Maybe a summer of research would quickly unlock many parts of human intelligence.",
    actual:"The Dartmouth workshop helped establish a field. Early learning systems such as the perceptron showed promise, but they handled much narrower tasks than people.",
    lesson:"Excitement began early. So did the gap between big ambitions and what computers could actually do.",visual:"punch"
  },
  {
    id:"conversation",label:"Conversation & rules",years:"1966–1980s",index:"03",title:"Computers begin to talk back.",
    subtitle:"Programs started matching words and following expert-written rules.",
    imagined:"A conversation or a detailed rulebook might be enough to recreate understanding.",
    actual:"ELIZA produced convincing exchanges using text patterns. Expert systems could help with focused decisions, but they were brittle outside the situations for which they were built.",
    lesson:"Sounding human or following many rules isn't the same thing as understanding the world.",visual:"terminal"
  },
  {
    id:"setbacks",label:"The setbacks",years:"1970s–1990s",index:"04",title:"Progress wasn't a straight line.",
    subtitle:"Big promises met expensive hardware, limited data, and difficult real-world problems.",
    imagined:"AI might improve smoothly once the early systems worked.",
    actual:"Periods of falling investment and enthusiasm became known as AI winters. Research continued, and the downturn was not identical in every country or field.",
    lesson:"A technology can remain scientifically important even when public excitement fades.",visual:"winter"
  },
  {
    id:"chess",label:"The chess moment",years:"1997",index:"05",title:"A computer beats the chess champion.",
    subtitle:"Deep Blue defeated Garry Kasparov in a six-game match. It was a historic milestone, not proof of human-like thought.",
    imagined:"If a machine beats a great chess player, it must think the way people do.",
    actual:"Deep Blue searched huge numbers of possible positions with specialized hardware, chess knowledge, and evaluation rules. It excelled at chess, not every intellectual task.",
    lesson:"A spectacular result in one area doesn't mean a system is generally intelligent.",visual:"chess"
  },
  {
    id:"learning",label:"Learning takes off",years:"2012–2017",index:"06",title:"Machines learn patterns at a new scale.",
    subtitle:"Better hardware, much more data, and new neural-network approaches unlocked major breakthroughs.",
    imagined:"Teaching a computer every rule by hand would remain the main route to better AI.",
    actual:"AlexNet improved image recognition in 2012, AlphaGo defeated Lee Sedol in 2016, and the Transformer architecture appeared in 2017. Different methods unlocked different capabilities.",
    lesson:"The major shift was from writing every instruction to training models on examples and feedback.",visual:"network"
  },
  {
    id:"everyday",label:"AI becomes everyday",years:"2022–today",index:"07",title:"AI moves from labs into daily life.",
    subtitle:"Public chat interfaces made powerful language models accessible to millions of people.",
    imagined:"A fluent chatbot must understand everything it says and always know when it is wrong.",
    actual:"ChatGPT launched publicly in November 2022. Modern AI can write, analyze, generate media, and use some tools. It can also invent facts or fail at tasks that seem simple.",
    lesson:"Today’s AI has a long history behind it, and its abilities still need careful testing.",visual:"dialogue"
  }
];
export const historyMoments: HistoryMoment[] = [
  {
    year:"1943",title:"A mathematical model of neurons",era:"questions",
    description:"Warren McCulloch and Walter Pitts described a simplified way to represent neurons and their connections using logic.",
    significance:"A foundation for later research into artificial neural networks.",
    correction:"It was a mathematical model, not a machine with a human brain.",
    source:"https://www.computerhistory.org/timeline/ai-robotics/",sourceLabel:"Computer History Museum · AI & Robotics timeline"
  },
  {
    year:"1950",title:"Turing asks a difficult question",era:"questions",
    description:"Alan Turing published Computing Machinery and Intelligence and proposed an imitation-game test of conversational behavior.",
    significance:"It helped scientists discuss intelligence in terms of observable behavior.",
    correction:"Passing a conversation test would not, by itself, prove consciousness.",
    source:"https://academic.oup.com/mind/article/LIX/236/433/986238",sourceLabel:"Turing · Mind, 1950"
  },
  {
    year:"1956",title:"The Dartmouth workshop",era:"beginning",
    description:"Researchers gathered around a new field called artificial intelligence. The proposal had been written in 1955.",
    significance:"The workshop helped give the field its name and research identity.",
    correction:"AI ideas existed before Dartmouth, so this is a landmark, not the start of all thinking about intelligent machines.",
    source:"https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904/0",sourceLabel:"Original Dartmouth proposal · AI Magazine"
  },
  {
    year:"1958",title:"The perceptron learns from examples",era:"beginning",
    description:"Frank Rosenblatt and colleagues demonstrated an early learning system inspired by simplified neurons.",
    significance:"It showed an alternative to programming every pattern by hand.",
    correction:"The original perceptron was a limited system and could not solve every recognition task.",
    source:"https://americanhistory.si.edu/collections/object/nmah_334414",sourceLabel:"Smithsonian · Mark I Perceptron"
  },
  {
    year:"1966",title:"ELIZA gives computers a voice",era:"conversation",
    description:"Joseph Weizenbaum's ELIZA responded to typed messages by matching keywords and reworking phrases.",
    significance:"It revealed how readily people can experience a computer as a conversation partner.",
    correction:"Its responses came from rules and patterns, not a system that understood human feelings.",
    source:"https://doi.org/10.1145/365153.365168",sourceLabel:"Weizenbaum · Communications of the ACM, 1966"
  },
  {
    year:"1970s–1980s",title:"Expert systems solve narrow problems",era:"conversation",
    description:"Researchers encoded specialist rules in programs for tasks such as chemistry, diagnosis, and computer configuration.",
    significance:"It demonstrated that AI could sometimes help in practical, well-defined work.",
    correction:"Large rulebooks were hard to maintain and often struggled when conditions changed.",
    source:"https://www.computerhistory.org/timeline/ai-robotics/",sourceLabel:"Computer History Museum · AI & Robotics timeline"
  },
  {
    year:"1970s & late 1980s",title:"The periods called AI winters",era:"setbacks",
    description:"Some waves of optimism ended in funding cuts and reduced commercial interest after systems failed to meet expectations.",
    significance:"Researchers learned to separate ambitious forecasts from demonstrated capability.",
    correction:"AI research did not stop, and the timing and impact differed across research groups and countries.",
    source:"https://www.ll.mit.edu/sites/default/files/publication/doc/2019-09/AI%20Study%20Short%20History%2C%20Present%20Developments%2C%20and%20Future%20Outlook%20Martinez.pdf",sourceLabel:"MIT Lincoln Laboratory · Historical overview"
  },
  {
    year:"1997",title:"Deep Blue defeats Kasparov",era:"chess",
    description:"IBM's Deep Blue defeated the reigning world chess champion, Garry Kasparov, in a match under standard tournament time controls.",
    significance:"It showed how far specialized search and computing had advanced.",
    correction:"Deep Blue did not learn or reason across everyday tasks like a person.",
    source:"https://www.ibm.com/history/deep-blue",sourceLabel:"IBM · Deep Blue history"
  },
  {
    year:"2012",title:"Deep learning makes a leap",era:"learning",
    description:"AlexNet, a deep neural network trained with graphics processors, achieved a major advance on image recognition benchmarks.",
    significance:"The result helped accelerate research in data-driven neural networks.",
    correction:"Recognizing images on a benchmark is not the same as understanding everything in an image.",
    source:"https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",sourceLabel:"Krizhevsky, Sutskever & Hinton · NeurIPS 2012"
  },
  {
    year:"2016",title:"AlphaGo wins a landmark match",era:"learning",
    description:"Google DeepMind's AlphaGo defeated Lee Sedol four games to one in the strategy game Go.",
    significance:"Deep neural networks and search worked together on a challenge long considered difficult for AI.",
    correction:"AlphaGo was built for Go, not for every kind of decision people make.",
    source:"https://deepmind.google/research/alphago/",sourceLabel:"Google DeepMind · AlphaGo"
  },
  {
    year:"2017",title:"Researchers introduce the Transformer",era:"learning",
    description:"The paper Attention Is All You Need described the Transformer architecture, which uses attention mechanisms to process sequences.",
    significance:"Transformers became a major foundation for modern language models and many other AI systems.",
    correction:"Transformers were a major architectural step, not the invention of every kind of generative AI.",
    source:"https://research.google/pubs/attention-is-all-you-need/",sourceLabel:"Google Research · 2017 Transformer paper"
  },
  {
    year:"2022",title:"ChatGPT opens a new public chapter",era:"everyday",
    description:"OpenAI introduced ChatGPT as a public research preview on November 30, bringing conversational AI to a much wider audience.",
    significance:"People could easily try an advanced language model through everyday dialogue.",
    correction:"ChatGPT did not invent AI, and convincing answers can still be inaccurate.",
    source:"https://openai.com/index/chatgpt/",sourceLabel:"OpenAI · Introducing ChatGPT, 2022"
  }
];
