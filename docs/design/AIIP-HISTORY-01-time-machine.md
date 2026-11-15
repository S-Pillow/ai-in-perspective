# AIIP-HISTORY-01 | History of AI interactive learning page

## Status and owner direction

Owner directed History to be built after Benefits and Risks & Safety, with Education & News left until last. Additional direction calls for an interactive, distinct theme that feels related to its own History entrance, along with an educational section exposing technologies already in daily life, especially Snapchat camera effects.

The product identity is **AI in Perspective**, an educational website rather than a museum. New History prose avoids em dashes and favors clear, human explanations. The existing entrance and other completed perspectives are not redesigned. New visual work uses original CSS and semantic HTML, not copies of attached reference art or third-party motion snippets.

## Learning story and interaction

- Original atmospheric violet, soft cyan and lilac time-machine opening with an animated chronoscope.
- Seven chapters: 1943–1950 early questions; 1956–1958 establishing the field; 1966–1980s chat and rules; 1970s–1990s setbacks; 1997 Deep Blue; 2012–2017 deep learning and Transformer; 2022–today everyday conversational AI. Chapter buttons show focused, factual explanation and separate contemporary hope vs. actual capability vs. lesson.
- Twelve selected sourced historical milestones as native expandable details, with direct links to primary papers or founding institutions. The timeline is deliberately selective, not exhaustive.
- **Everyday AI** highlights (1) Snapchat Face Lenses, (2) Gmail spam filters, (3) Netflix recommendations and (4) Google Maps traffic prediction. Interactive cards show a conceptual graphic, a plain explanation and caveat. Do not claim every Snapchat effect or every algorithm is generative AI. Snapchat calls puppy-face effects **Lenses**, often colloquially called filters. Lenses use face tracking, some use machine learning; some newer AI Lenses explicitly use generative AI.
- End with a Bigger Picture perspective and four-card Explain Like I'm Five section, using colored words and handwritten SVG underline.
- Wide responsive layouts collapse at 1120, 820, 580 and 345 pixels; motion can be disabled with prefers-reduced-motion. Native details remain functional without JS; selected panels and tabs require JS; source and explanatory prose remains in page HTML.

## Evidence references reviewed

Historical source links are attached to each of twelve data records in src/data/history.ts, and are user-accessible, not decoration.

1. McCulloch and Pitts (1943), archival AI & robotics chronology: https://www.computerhistory.org/timeline/ai-robotics/
2. Turing (1950) original Mind paper: https://academic.oup.com/mind/article/LIX/236/433/986238
3. Dartmouth (1955 proposal, 1956 summer workshop) original proposal reproduced by AAAI: https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904/0
4. Frank Rosenblatt and Mark I perceptron (1957 idea, 1958 machine), Smithsonian: https://www.si.edu/object/electronic-neural-network-mark-i-perceptron%3Anmah_334414
5. ELIZA (1966) original publication: https://doi.org/10.1145/365153.365168
6. Expert systems and changing investment over decades, Computer History Museum/MIT historical material: https://www.computerhistory.org/timeline/ai-robotics/
7. IBM Deep Blue vs Kasparov (1997): https://www.ibm.com/history/deep-blue
8. AlexNet (2012) original paper: https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
9. AlphaGo vs Lee Sedol (2016): https://deepmind.google/research/alphago/
10. Transformer architecture (2017) original paper: https://research.google/pubs/attention-is-all-you-need/
11. ChatGPT introduced November 30, 2022: https://openai.com/index/chatgpt/

Everyday technology source checks:
- Snap camera uses landmarks such as eyes/nose to position Lenses: https://help.snapchat.com/hc/en-us/articles/7012366118676-How-Snap-Uses-Information-from-the-Camera
- Snap explicitly distinguishes Face Lenses vs Filters: https://help.snapchat.com/hc/en-us/articles/7012348332052-How-do-I-use-Lenses-on-Snapchat
- Snap generative AI tools are a different, newer subset: https://help.snapchat.com/hc/en-us/articles/25494876770580-Generative-AI-on-Snapchat
- Google confirmed it used machine learning to augment Gmail spam rules starting in 2014: https://blog.google/products-and-platforms/products/workspace/how-machine-learning-g-suite-makes-people-more-productive/
- Netflix personalized recommendation system factors: https://help.netflix.com/en/node/100639/
- Google Maps real-time and historical traffic plus machine learning: https://blog.google/products-and-platforms/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/

## Deployment and testing contract

Scope files: new src/data/history.ts, src/pages/explore/history.astro, src/styles/history.css, src/scripts/history.js, this design note; updated public/discover/index.html History destination, tests/content.test.mjs assertions, docs/PROJECT_CONTROL.md. Historical named entities are editorial text, not claims that a concept illustration is a screenshot.

Test requirements: seven eras and 12 milestones in correct order, four real everyday examples, source attribution, proper heading and section ordering, button/aria/hidden state, reduced motion and mobile layout, no em dash characters in the new visible History copy, Discover nav History links to a real route and Education & News remains planned. Run content contracts, Astro build, protected preview exact SHA and hosted GET smoke. Real screenshots and keyboard/phone user testing remain separate review gates.

Do not merge Draft PR #1, deploy publicly, change production, add dependencies, modify other already-approved perspective pages, or start Education & News. Owner has not yet approved the History visual design. Keep all visual material original and label concept art honestly.
