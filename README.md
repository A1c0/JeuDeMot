# JeuDeMot

## install

### repo

```bash
git clone https://github.com/UKyz/JeuDeMot.git
cd JeuDeMot
yarn install
mkdir files
```

Download Data :

* dl database jeuDeMot : http://www.jeuxdemots.org/JDM-LEXICALNET-FR/12102018-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
* dezip it
* put the txt file in the repo

Convert the .txt int UTF8 : 
```bash
iconv -f CP1252 -t UTF-8 12102018-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt > jeu-de-mot.txt
node split-files.js
```

### database

In one field :
```bash
docker-compose up
```

In a second field :
```
node index.js
node arango-import-nodes.js
node arango-import-relations-equiv.js
node arango-import-relations-family.js
node arango-import-relations-lemme.js
node arango-import-relations-syn.js
node arango-import-relations-variante.js
```

