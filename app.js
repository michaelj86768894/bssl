// Fixed random draw. Edit names in later matches to advance winners; do not redraw on refresh.
const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
const rounds=[
  {
    "name": "Round of 16",
    "note": "Week 1 \u00b7 October 5\u20139",
    "matches": [
      [
        "A - 10/8 @ 4pm",
        {
          "name": "Westhoff"
        },
        {
          "name": "Cholka"
        }
      ],
      [
        "B - 10/6 @ 3pm",
		  {
          "name": "Ferguson 2", "result": "winner"
        },
        {
          "name": "Hannah 0", "result": "loser"
        }
      ],
      [
        "C - 10/6 @ 4pm",
        {
          "name": "Robby 2", "result": "winner"
        },
        {
          "name": "Kristen 0", "result": "loser"
        }
      ],
      [
        "D - 10/7 @ 3pm",
        {
          "name": "Kristi 2", "result": "winner"
        },
        {
          "name": "Shannon 0", "result": "loser"
        }
      ],
      [
        "E - 10/12 @ TBD",
        {
          "name": "Adam"
        },
        {
          "name": "Prusha"
        }
      ],
      [
        "F - 10/6 @ 1:30pm",
        {
          "name": "Tony 0", "result": "loser"
        },
        {
          "name": "Loretta 2", "result": "winner"
        }

      ],
      [
        "G - 10/6 @ 4pm",
        {
          "name": "Grube 0", "result": "loser"
        },
        {
          "name": "Kim 2", "result": "winner"
        }
      ],
      [
        "H - 10/7 @ 11am",
        {
          "name": "Hilary 1", "result": "loser"
        },
        {
          "name": "Jaxson 2", "result": "winner"
        }
      ]
    ]
  },
  {
    "name": "Quarterfinals",
    "note": "Week 2 \u00b7 October 12\u201316",
    "matches": [
      [
        "Q1 - 10/8 @ 4:30pm",
        {
          "name": "Cholka/Westhoff",
          "pending": true
        },
        {
          "name": "Ferguson",
          "pending": true
        }
      ],
      [
        "Q2",
        {
          "name": "Robby",
          "pending": true
        },
        {
          "name": "Kristi",
          "pending": true
        }
      ],
      [
        "Q3",
        {
          "name": "Adam/Prusha",
          "pending": true
        },
        {
          "name": "Loretta",
          "pending": true
        }
      ],
      [
        "Q4",
        {
          "name": "Kim",
          "pending": true
        },
        {
          "name": "Jaxson",
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
rounds.forEach((round,i)=>{const col=el('section',`round round-${i}`);col.append(el('h3','',round.name),el('p','round-note',round.note));const matches=el('div','matches');round.matches.forEach(([id,...entrants])=>{const card=el('article','match');card.setAttribute('aria-label',`Match ${id}`);card.append(el('h4','match-label',id==='Final'?'THE FINAL':`MATCH ${id}`));entrants.forEach(t=>{const line=el('div',`entrant${t.pending?' pending':''}${t.result === 'winner' ? ' winner' : t.result === 'loser' ? ' loser' : ''}`);line.append(el('span','name',t.name));if(t.result === 'winner' || t.result === 'loser') line.append(el('span','sr-only',t.result === 'winner' ? ' — Winner' : ' — Loser'));card.append(line);});matches.append(card);});col.append(matches);document.querySelector('#bracket').append(col);});

// Add result: 'winner' or result: 'loser' to a participant to mark a result.
// Draw actual paths between card centers, including after fonts or sizes change.
const bracket = document.querySelector('#bracket');
const svgNS = 'http://www.w3.org/2000/svg';
const connectors = document.createElementNS(svgNS, 'svg');
connectors.classList.add('bracket-connectors');
connectors.setAttribute('aria-hidden', 'true');
connectors.setAttribute('focusable', 'false');
bracket.append(connectors);
function drawConnectors() {
  const origin = bracket.getBoundingClientRect();
  const columns = [...bracket.querySelectorAll('.round')];
  const local = element => {
    const r = element.getBoundingClientRect();
    return {left:r.left-origin.left-bracket.clientLeft+bracket.scrollLeft,
      right:r.right-origin.left-bracket.clientLeft+bracket.scrollLeft,
      top:r.top-origin.top-bracket.clientTop+bracket.scrollTop,
      bottom:r.bottom-origin.top-bracket.clientTop+bracket.scrollTop};
  };
  const width = Math.ceil(Math.max(...columns.map(c=>local(c).right)));
  const height = Math.ceil(Math.max(...columns.map(c=>local(c).bottom)));
  connectors.setAttribute('width', width);
  connectors.setAttribute('height', height);
  connectors.replaceChildren();
  columns.slice(0,-1).forEach((column,index)=>{
    const sources = [...column.querySelectorAll('.match')];
    const targets = [...columns[index+1].querySelectorAll('.match')];
    sources.forEach((source,i)=>{
      const target=targets[Math.floor(i/2)];
      if(!target) return;
      const a=local(source),b=local(target);
      const startY=(a.top+a.bottom)/2,endY=(b.top+b.bottom)/2;
      const midX=(a.right+b.left)/2;
      const path=document.createElementNS(svgNS,'path');
      path.setAttribute('d',`M ${a.right} ${startY} H ${midX} V ${endY} H ${b.left}`);
      connectors.append(path);
    });
  });
}
let connectorFrame;
function scheduleConnectors(){cancelAnimationFrame(connectorFrame);connectorFrame=requestAnimationFrame(drawConnectors);}
if (typeof ResizeObserver !== 'undefined') {
  const observer=new ResizeObserver(scheduleConnectors);
  observer.observe(bracket);
  bracket.querySelectorAll('.round,.match').forEach(e=>observer.observe(e));
}
window.addEventListener('resize',scheduleConnectors);
if(document.fonts) document.fonts.ready.then(scheduleConnectors);
scheduleConnectors();
