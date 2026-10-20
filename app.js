// Fixed random draw. Edit names in later matches to advance winners; do not redraw on refresh.
const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
const rounds=[
  {
    "name": "Round of 16",
    "note": "October 5\u20139",
    "matches": [
      [
        "A - 10/8 @ 4p",
        {
          "name": "Westhoff 0", "result": "loser"
        },
        {
          "name": "Cholka 2", "result": "winner"
        }
      ],
      [
        "B - 10/6 @ 3p",
		  {
          "name": "Ferguson 2", "result": "winner"
        },
        {
          "name": "Hannah 0", "result": "loser"
        }
      ],
      [
        "C - 10/6 @ 4p",
        {
          "name": "Robby 2", "result": "winner"
        },
        {
          "name": "Kristen 0", "result": "loser"
        }
      ],
      [
        "D - 10/7 @ 3p",
        {
          "name": "Kristi 2", "result": "winner"
        },
        {
          "name": "Shannon 0", "result": "loser"
        }
      ],
      [
        "E - 10/13 @ 4p",
        {
          "name": "Adam 2", "result": "winner"
        },
        {
          "name": "Prusha 0", "result": "loser"
        }
      ],
      [
        "F - 10/6 @ 1:30p",
        {
          "name": "Tony 0", "result": "loser"
        },
        {
          "name": "Loretta 2", "result": "winner"
        }

      ],
      [
        "G - 10/6 @ 4p",
        {
          "name": "Grube 0", "result": "loser"
        },
        {
          "name": "Kim 2", "result": "winner"
        }
      ],
      [
        "H - 10/7 @ 11a",
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
    "note": "October 12\u201316",
    "matches": [
      [
        "Q1 - 10/8 @ 4:30p",
        {
          "name": "Cholka 0", "result": "loser"
        },
        {
          "name": "Ferguson 2", "result": "winner"
        }
      ],
      [
        "Q2 - 10/19 @ 2p",
        {
          "name": "Robby 0", "result": "loser"
        },
        {
          "name": "Kristi 2","result": "winner"
        }
      ],
      [
        "Q1 - 10/15 @ 2:30p",
        {
          "name": "Adam 2", "result": "winner"
        },
        {
          "name": "Loretta 1", "result": "loser"
        }
      ],
      [
        "Q4 - 10/8 @ 5p",
        {
          "name": "Kim 0", "result": "loser"
        },
        {
          "name": "Jaxson 2", "result": "winner"
        }
      ]
    ]
  },
  {
    "name": "Semifinals",
    "note": "October 19\u201323",
    "matches": [
      [
        "S1 10/22 3:30p",
        {
          "name": "Ferguson",
          "pending": true
        },
        {
          "name": "Kristi",
          "pending": true
        }
      ],
      [
        "S2 10/20 3:30p",
        {
          "name": "Adam 2", "result": "winner"
        },
        {
          "name": "Jaxson 0", "result": "loser"
        }
      ]
    ]
  },
  {
    "name": "Championship",
    "note": "October 27",
    "matches": [
      [
        "Final",
        {
          "name": "Winner S1",
          "pending": true
        },
        {
          "name": "Adam",
          "pending": true
        }
      ]
    ]
  }
];
// Proposed only: opening-round losers still need to confirm participation.
// Keep placeholders until the optional bracket is approved.
const redemptionRounds = [
  {name:'Redemption quarterfinals',note:'October 12–16',matches:[
    ['R1 - 10/20',{name:'Westhoff 1 ', "result": "loser"},{name:'Hannah 2 ', "result": "winner"}],
    ['R2 - 10/21',{name:'Kristen',pending:true},{name:'Shannon',pending:true}],
    ['R3 - 10/15 @ 2p',{name:'Prusha 2 ', "result": "winner",pending:true},{name:'Tony 1 ', "result": "loser"}],
    ['R4 - 10/16',{name:'Grube 2', "result": "winner",pending:true},{name:'Hilary 0', "result": "loser", pending:true}]
  ]},
  {name:'Redemption semifinals',note:'October 19–23',matches:[
    ['RS1',{name:'Hannah',pending:true},{name:'Kristen/Shannon',pending:true}],
    ['RS2 - 10/20',{name:'Prusha 2', "result": "winner"},{name:'Grube 0', "result": "loser"}]
  ]},
  {name:'Redemption championship',note:'October 27',matches:[
    ['Consolation Championship',{name:'Winner RS1',pending:true},{name:'Prusha',pending:true}]
  ]}
];

// Opening round is shared. Main winners advance right; opening losers advance left.
const bracket = document.querySelector('#bracket');
const layout = [
{round:redemptionRounds[2],side:'redemption',label:'Championship'},
  {round:redemptionRounds[1],side:'redemption',label:'Semifinals'},
  {round:redemptionRounds[0],side:'redemption',label:'Quarterfinals'},
  {round:rounds[0],side:'opening',label:'Round 1'},
  {round:rounds[1],side:'main',label:'Quarterfinals'},
  {round:rounds[2],side:'main',label:'Semifinals'},
  {round:rounds[3],side:'main',label:'Championship'}
];
layout.forEach(({round,side,label},i)=>{
  const col=el('section',`round combined-round side-${side}${i===0||i===6?' final-round':''}`);
  col.dataset.column=i;
  const heading=el('div','round-heading');
  heading.append(el('p','branch-label',side==='main'?'':side==='opening'?'':'Consolation'),el('h3','',label),el('p','round-note',round.note));
  col.append(heading);
  const matches=el('div','matches');
  matches.style.setProperty('--match-count',round.matches.length);
  round.matches.forEach(([id,...entrants])=>{
    const card=el('article','match');card.setAttribute('aria-label',`Match ${id}`);
    card.append(el('h4','match-label',id==='Final'?'Championship':` ${id}`));
    entrants.forEach(t=>{
      const result=t.result==='winner'?'winner':t.result==='loser'?'loser':'';
      const line=el('div',`entrant${t.pending?' pending':''}${result?' '+result:''}`);
      line.append(el('span','name',t.name));
      if(result)line.append(el('span','sr-only',` — ${result}`));
      card.append(line);
    });matches.append(card);
  });col.append(matches);bracket.append(col);
});
const svgNS='http://www.w3.org/2000/svg';
const connectors=document.createElementNS(svgNS,'svg');
connectors.classList.add('bracket-connectors');connectors.setAttribute('aria-hidden','true');bracket.append(connectors);
const links=[[3,2],[2,1],[1,0],[3,4],[4,5],[5,6]];
function drawConnectors(){
  const origin=bracket.getBoundingClientRect();
  const cols=[...bracket.querySelectorAll('.round')];
  const local=e=>{const r=e.getBoundingClientRect();return {left:r.left-origin.left-bracket.clientLeft+bracket.scrollLeft,right:r.right-origin.left-bracket.clientLeft+bracket.scrollLeft,top:r.top-origin.top-bracket.clientTop+bracket.scrollTop,bottom:r.bottom-origin.top-bracket.clientTop+bracket.scrollTop}};
  connectors.setAttribute('width',Math.ceil(Math.max(...cols.map(c=>local(c).right))));
  connectors.setAttribute('height',Math.ceil(Math.max(...cols.map(c=>local(c).bottom))));connectors.replaceChildren();
  links.forEach(([from,to])=>{
    const sources=[...cols[from].querySelectorAll('.match')],targets=[...cols[to].querySelectorAll('.match')];
    sources.forEach((source,i)=>{
      const a=local(source),b=local(targets[Math.floor(i/2)]),left=to<from;
      const x1=left?a.left:a.right,x2=left?b.right:b.left,mid=(x1+x2)/2;
      const path=document.createElementNS(svgNS,'path');path.setAttribute('d',`M ${x1} ${(a.top+a.bottom)/2} H ${mid} V ${(b.top+b.bottom)/2} H ${x2}`);connectors.append(path);
    });
  });
}
function centerOpening(){
  const opening=bracket.querySelector('.side-opening');
  const a=opening.getBoundingClientRect(),b=bracket.getBoundingClientRect();
  bracket.scrollLeft+=a.left-b.left-bracket.clientLeft+a.width/2-bracket.clientWidth/2;
}
let frame;
function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(drawConnectors)}
if(typeof ResizeObserver!=='undefined'){
  const observer=new ResizeObserver(schedule);observer.observe(bracket);bracket.querySelectorAll('.round,.match').forEach(e=>observer.observe(e));
}
window.addEventListener('resize',schedule);
const ready=()=>requestAnimationFrame(()=>{drawConnectors();centerOpening()});
if(document.fonts)document.fonts.ready.then(ready);else ready();
