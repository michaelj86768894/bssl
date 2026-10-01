// Fixed random draw. Edit names in later matches to advance winners; do not redraw on refresh.
const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
const rounds=[
  {
    "name": "Round of 16",
    "note": "Week 1 \u00b7 October 5\u20139",
    "matches": [
      [
        "A",
        {
          "name": "Westhoff"
        },
        {
          "name": "Cholka"
        }
      ],
      [
        "B",
		  {
          "name": "Ferguson"
        },
        {
          "name": "Hannah"
        }
      ],
      [
        "C",
        {
          "name": "Robby"
        },
        {
          "name": "Kristen"
        }
      ],
      [
        "D",
        {
          "name": "Kristi"
        },
        {
          "name": "Shannon"
        }
      ],
      [
        "E",
        {
          "name": "Adam"
        },
        {
          "name": "Prusha"
        }
      ],
      [
        "F",
        {
          "name": "Tony"
        },
        {
          "name": "Loretta"
        }

      ],
      [
        "G",
        {
          "name": "Grube"
        },
        {
          "name": "Kim"
        }
      ],
      [
        "H",
        {
          "name": "Hilary"
        },
        {
          "name": "Jaxson"
        }
      ]
    ]
  },
  {
    "name": "Quarterfinals",
    "note": "Week 2 \u00b7 October 12\u201316",
    "matches": [
      [
        "Q1",
        {
          "name": "Winner A",
          "pending": true
        },
        {
          "name": "Winner B",
          "pending": true
        }
      ],
      [
        "Q2",
        {
          "name": "Winner C",
          "pending": true
        },
        {
          "name": "Winner D",
          "pending": true
        }
      ],
      [
        "Q3",
        {
          "name": "Winner E",
          "pending": true
        },
        {
          "name": "Winner F",
          "pending": true
        }
      ],
      [
        "Q4",
        {
          "name": "Winner G",
          "pending": true
        },
        {
          "name": "Winner H",
          "pending": true
        }
      ]
    ]
  },
  {
    "name": "Semifinals",
    "note": "Week 3 \u00b7 October 19\u201323",
    "matches": [
      [
        "S1",
        {
          "name": "Winner Q1",
          "pending": true
        },
        {
          "name": "Winner Q2",
          "pending": true
        }
      ],
      [
        "S2",
        {
          "name": "Winner Q3",
          "pending": true
        },
        {
          "name": "Winner Q4",
          "pending": true
        }
      ]
    ]
  },
  {
    "name": "Championship",
    "note": "Week 4 \u00b7 October 26\u201330",
    "matches": [
      [
        "Final",
        {
          "name": "Winner S1",
          "pending": true
        },
        {
          "name": "Winner S2",
          "pending": true
        }
      ]
    ]
  }
];
rounds.forEach((round,i)=>{const col=el('section',`round round-${i}`);col.append(el('h3','',round.name),el('p','round-note',round.note));const matches=el('div','matches');round.matches.forEach(([id,...entrants])=>{const card=el('article','match');card.setAttribute('aria-label',`Match ${id}`);card.append(el('h4','match-label',id==='Final'?'THE FINAL':`MATCH ${id}`));entrants.forEach(t=>{const line=el('div',`entrant${t.pending?' pending':''}`);line.append(el('span','name',t.name));card.append(line);});matches.append(card);});col.append(matches);document.querySelector('#bracket').append(col);});
