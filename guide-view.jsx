// guide-view.jsx — Tour guide dashboard

const GUIDE_MEMBERS = [
  { id:1, name:'Wang Jian',      initials:'WJ', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
  { id:2, name:'Margaret Smith', initials:'MS', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
  { id:3, name:'Zhang Ming',     initials:'ZM', passport:true,  baggage:false, checkin:true,  location:true,  status:'warn' },
  { id:4, name:'Liu Guifang',    initials:'LG', passport:true,  baggage:true,  checkin:false, location:false, status:'alert'},
  { id:5, name:'Robert Nguyen',  initials:'RN', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
  { id:6, name:'Priya Sharma',   initials:'PS', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
  { id:7, name:'James O\'Brien', initials:'JO', passport:false, baggage:true,  checkin:false, location:true,  status:'warn' },
  { id:8, name:'Yuki Tanaka',    initials:'YT', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
  { id:9, name:'Chen Deshun',    initials:'CD', passport:true,  baggage:false, checkin:false, location:false, status:'alert'},
  { id:10,name:'Sofia Rossi',    initials:'SR', passport:true,  baggage:true,  checkin:true,  location:true,  status:'ok'   },
];

const STATUS_DOT = { ok: '#34D399', warn: '#FBBF24', alert: '#F87171' };

function MemberRow({ m, onAction }) {
  const borderColor = m.status === 'alert' ? C.orange : m.status === 'warn' ? '#FDE68A' : 'transparent';
  const bg = m.status === 'alert' ? C.orangeLight : m.status === 'warn' ? '#FFFBEB' : C.white;
  const avatarBg = m.status === 'alert' ? C.orange : m.status === 'warn' ? C.yellow : C.mint;

  return (
    <div style={{
      display:'flex', alignItems:'center', gap:10,
      padding:'10px 14px',
      background: bg,
      border: `1.5px solid ${borderColor}`,
      borderRadius: 14,
      marginBottom: 7,
    }}>
      {/* Avatar */}
      <div style={{
        width:36, height:36, borderRadius:11,
        background: avatarBg,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:12, fontWeight:800, color:'white', flexShrink:0,
      }}>{m.initials}</div>

      {/* Name + status */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:800, color:C.textDark, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:3, marginTop:2 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:STATUS_DOT[m.status] }}/>
          <span style={{ fontSize:11, color:C.textMed, fontWeight:600 }}>
            {m.status === 'ok' ? 'All Clear' : m.status === 'warn' ? 'Needs Attention' : 'Needs Help'}
          </span>
        </div>
      </div>

      {/* Status icons */}
      <div style={{ display:'flex', gap:4, alignItems:'center' }}>
        <IcoPassport ok={m.passport}/>
        <IcoBaggage  ok={m.baggage}/>
        <IcoCheckin  ok={m.checkin}/>
        <IcoLocation ok={m.location}/>
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────
function OverviewTab({ departureIn }) {
  const [paymentSent, setPaymentSent] = React.useState(false);

  return (
    <div style={{ overflowY:'auto', height:'100%', paddingBottom:20 }}>
      {/* Flight header */}
      <div style={{
        background: `linear-gradient(120deg, ${C.orangeLight} 0%, #FFF8F2 100%)`,
        padding:'14px 16px',
        borderBottom:`1.5px solid #FDDBB0`,
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:18, fontWeight:900, color:C.textDark, letterSpacing:-0.5 }}>
              Flight MU5137
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
              <span style={{ fontSize:15, fontWeight:800, color:C.textDark }}>BNE</span>
              <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
                <path d="M2 7H28M28 7L22 2M28 7L22 12" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize:15, fontWeight:800, color:C.textDark }}>PEK</span>
            </div>
          </div>
          <div style={{
            background:C.orange, borderRadius:14,
            padding:'8px 12px', textAlign:'center',
          }}>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:0.8 }}>Departs in</div>
            <div style={{ fontSize:17, fontWeight:900, color:'white', letterSpacing:-0.5 }}>{departureIn || '6h 32min'}</div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display:'flex', gap:8, padding:'12px 14px 0' }}>
        {[
          { count:22, label:'Checked In',   color:'#22C55E', light:'#F0FDF4', icon:'✓' },
          { count:5,  label:'Pending',       color:'#FBBF24', light:'#FFFBEB', icon:'⏳' },
          { count:3,  label:'Need Help',     color:'#F87171', light:'#FFF5F5', icon:'!' },
        ].map(card => (
          <div key={card.label} style={{
            flex:1, background:card.light,
            borderRadius:16, padding:'12px 10px',
            border:`1.5px solid ${card.color}30`,
            textAlign:'center',
          }}>
            <div style={{ fontSize:24, fontWeight:900, color:card.color }}>{card.count}</div>
            <div style={{ fontSize:10.5, fontWeight:700, color:card.color, marginTop:2 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Member list */}
      <div style={{ padding:'12px 14px 0' }}>
        <div style={{ fontSize:12, fontWeight:800, color:C.textMed, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>
          Group Members
        </div>
        {GUIDE_MEMBERS.map(m => <MemberRow key={m.id} m={m}/>)}
        <div style={{ textAlign:'center', fontSize:12, color:C.textLight, fontWeight:600, marginTop:4 }}>
          20 more members · All clear ✓
        </div>
      </div>

      {/* Payment button */}
      <div style={{ padding:'14px 14px 0' }}>
        <button
          onClick={() => { setPaymentSent(true); setTimeout(()=>setPaymentSent(false), 3000); }}
          style={{
            width:'100%', padding:'15px',
            background: paymentSent ? '#22C55E' : C.orange,
            border:'none', borderRadius:18,
            fontSize:15, fontWeight:900, color:'white',
            cursor:'pointer',
            boxShadow: paymentSent ? '0 4px 16px rgba(34,197,94,0.35)' : '0 4px 16px rgba(244,162,97,0.4)',
            transition:'all 0.25s ease',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}
        >
          {paymentSent ? (
            <><span>✓</span> Payment Link Sent!</>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L9 12M9 12L5 8M9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 13V15.5C2 16.33 2.67 17 3.5 17H14.5C15.33 17 16 16.33 16 15.5V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Send Payment Link to Family
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Locate Tab ────────────────────────────────────────────────
function LocateTab() {
  const dots = [
    { id:1,  initials:'WJ', x:42,  y:22,  status:'ok'   },
    { id:2,  initials:'LX', x:58,  y:35,  status:'ok'   },
    { id:3,  initials:'ZM', x:30,  y:48,  status:'warn' },
    { id:4,  initials:'LG', x:70,  y:60,  status:'alert'},
    { id:5,  initials:'CD', x:50,  y:70,  status:'ok'   },
    { id:6,  initials:'ZY', x:25,  y:65,  status:'ok'   },
    { id:7,  initials:'ZG', x:75,  y:30,  status:'warn' },
    { id:8,  initials:'SM', x:55,  y:55,  status:'ok'   },
    { id:9,  initials:'MX', x:80,  y:75,  status:'alert'},
    { id:10, initials:'GJ', x:38,  y:80,  status:'ok'   },
  ];
  const avatarColor = { ok: C.mint, warn: '#FBBF24', alert: C.orange };
  const [selected, setSelected] = React.useState(null);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', padding:'12px 14px' }}>
      {/* Header */}
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:15, fontWeight:900, color:C.textDark }}>Terminal Map — PVG T2</div>
        <div style={{ fontSize:11.5, color:C.textMed, fontWeight:600, marginTop:2 }}>
          Tap a member to see details
        </div>
      </div>

      {/* Terminal map */}
      <div style={{
        flex:1, background:C.white, borderRadius:20,
        border:`1.5px solid ${C.mintLight}`,
        position:'relative', overflow:'hidden',
        minHeight:280,
      }}>
        {/* Grid lines */}
        {[20,40,60,80].map(p => (
          <div key={p} style={{ position:'absolute', left:0, right:0, top:`${p}%`, height:1, background:C.mintLight }}/>
        ))}
        {[25,50,75].map(p => (
          <div key={p} style={{ position:'absolute', top:0, bottom:0, left:`${p}%`, width:1, background:C.mintLight }}/>
        ))}

        {/* Zone labels */}
        {[
          { label:'Security', x:12, y:18 },
          { label:'Gate G15', x:62, y:18 },
          { label:'Check-in', x:12, y:85 },
          { label:'Lounge',   x:62, y:85 },
        ].map(z => (
          <div key={z.label} style={{
            position:'absolute', left:`${z.x}%`, top:`${z.y}%`,
            fontSize:9, fontWeight:800, color:C.textLight,
            textTransform:'uppercase', letterSpacing:0.8,
            transform:'translate(-50%, -50%)',
            background:C.bg, padding:'2px 5px', borderRadius:4,
          }}>{z.label}</div>
        ))}

        {/* You (guide) */}
        <div style={{
          position:'absolute', left:'50%', top:'48%',
          transform:'translate(-50%,-50%)',
          width:40, height:40, borderRadius:14,
          background:`linear-gradient(135deg, ${C.mintDark}, ${C.mintDeep})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 0 4px rgba(123,200,164,0.25)`,
          fontSize:10, fontWeight:900, color:'white', zIndex:5,
        }}>YOU</div>

        {/* Member dots */}
        {dots.map(d => (
          <div
            key={d.id}
            onClick={() => setSelected(selected === d.id ? null : d.id)}
            style={{
              position:'absolute',
              left:`${d.x}%`, top:`${d.y}%`,
              transform:'translate(-50%,-50%)',
              width:30, height:30, borderRadius:10,
              background: avatarColor[d.status],
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:9, fontWeight:800, color:'white',
              cursor:'pointer', zIndex:4,
              boxShadow: selected === d.id ? `0 0 0 3px ${avatarColor[d.status]}66, 0 3px 10px rgba(0,0,0,0.15)` : '0 2px 6px rgba(0,0,0,0.1)',
              transition:'box-shadow 0.15s ease',
            }}
          >{d.initials}</div>
        ))}

        {/* Selected info */}
        {selected && (() => {
          const m = GUIDE_MEMBERS.find(x => x.id === selected);
          const d = dots.find(x => x.id === selected);
          if (!m) return null;
          return (
            <div style={{
              position:'absolute', bottom:10, left:10, right:10,
              background:'rgba(255,255,255,0.96)',
              borderRadius:14, padding:'10px 12px',
              border:`1.5px solid ${avatarColor[d.status]}55`,
              backdropFilter:'blur(8px)',
              display:'flex', alignItems:'center', gap:8,
            }}>
              <div style={{ width:32, height:32, borderRadius:10, background:avatarColor[d.status], display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'white' }}>{m.initials}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:800, color:C.textDark }}>{m.name}</div>
                <div style={{ fontSize:11, color:C.textMed, fontWeight:600 }}>
                  {m.status === 'ok' ? '✓ All documents OK' : m.status === 'warn' ? '⚠ Check baggage/passport' : '🔴 Needs immediate help'}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ border:'none', background:'none', cursor:'pointer', color:C.textLight, fontSize:16, padding:4 }}>✕</button>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:10 }}>
        {[['ok',C.mint,'OK'],['warn','#FBBF24','Attention'],['alert',C.orange,'Help']].map(([k,c,l]) => (
          <div key={k} style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:10, height:10, borderRadius:3, background:c }}/>
            <span style={{ fontSize:11, fontWeight:600, color:C.textMed }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Alerts Tab ────────────────────────────────────────────────
function AlertsTab() {
  const problems = GUIDE_MEMBERS.filter(m => m.status !== 'ok');
  const [resolved, setResolved] = React.useState({});

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'12px 14px', paddingBottom:20 }}>
      <div style={{ fontSize:15, fontWeight:900, color:C.textDark, marginBottom:4 }}>Active Alerts</div>
      <div style={{ fontSize:12, color:C.textMed, fontWeight:600, marginBottom:12 }}>
        {problems.filter(m => !resolved[m.id]).length} member(s) need attention
      </div>
      {problems.map(m => {
        const isResolved = resolved[m.id];
        const issues = [
          !m.passport && 'Passport not verified',
          !m.baggage  && 'Baggage not checked',
          !m.checkin  && 'Not checked in',
          !m.location && 'Location unknown',
        ].filter(Boolean);

        return (
          <div key={m.id} style={{
            background: isResolved ? '#F0FDF4' : m.status === 'alert' ? C.orangeLight : '#FFFBEB',
            border: `1.5px solid ${isResolved ? '#86EFAC' : m.status === 'alert' ? '#FDDBB0' : '#FDE68A'}`,
            borderRadius: 16, padding:'12px 14px', marginBottom:10,
            opacity: isResolved ? 0.65 : 1,
            transition:'opacity 0.3s ease',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{
                width:32, height:32, borderRadius:10,
                background: isResolved ? '#22C55E' : m.status === 'alert' ? C.orange : '#FBBF24',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:800, color:'white',
              }}>{isResolved ? '✓' : m.initials}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:C.textDark }}>{m.name}</div>
                <div style={{ fontSize:11, fontWeight:600, color:m.status==='alert'?'#E07832':'#B45309' }}>
                  {m.status === 'alert' ? '🔴 Urgent' : '⚠️ Warning'}
                </div>
              </div>
            </div>
            {issues.map((issue, i) => (
              <div key={i} style={{ fontSize:12.5, color:C.textMed, fontWeight:600, marginBottom:3, paddingLeft:4 }}>
                • {issue}
              </div>
            ))}
            {!isResolved && (
              <div style={{ display:'flex', gap:8, marginTop:10 }}>
                <button
                  onClick={() => setResolved(r => ({...r, [m.id]: true}))}
                  style={{
                    flex:1, padding:'9px', borderRadius:10,
                    background:C.mint, border:'none',
                    fontSize:12, fontWeight:800, color:'white', cursor:'pointer',
                  }}
                >Mark Resolved</button>
                <button style={{
                  flex:1, padding:'9px', borderRadius:10,
                  background:C.orange, border:'none',
                  fontSize:12, fontWeight:800, color:'white', cursor:'pointer',
                }}>Call Member</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Guide View (main) ─────────────────────────────────────────
function GuideView({ departureIn }) {
  const [tab, setTab] = React.useState('overview');

  const tabs = [
    { id:'overview', label:'Overview', icon: <IcoHome   active={tab==='overview'}/> },
    { id:'locate',   label:'Locate',   icon: <IcoPin    active={tab==='locate'}/> },
    { id:'alerts',   label:'Alerts',   icon: <IcoBell   active={tab==='alerts'} hasBadge={tab!=='alerts'}/> },
  ];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg, fontFamily:'Nunito, sans-serif', position:'relative' }}>
      {/* Content */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        <div key={tab} className="tab-view" style={{ height:'100%', opacity:1 }}>
          {tab === 'overview' && <OverviewTab departureIn={departureIn}/>}
          {tab === 'locate'   && <LocateTab/>}
          {tab === 'alerts'   && <AlertsTab/>}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        display:'flex',
        background:C.white,
        borderTop:`1.5px solid ${C.mintLight}`,
        padding:'6px 10px 10px',
        gap:4,
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex:1, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:3,
              padding:'8px 0', borderRadius:14,
              background: tab === t.id ? C.mintLight : 'transparent',
              border:'none', cursor:'pointer',
              transition:'background 0.15s ease',
            }}
          >
            {t.icon}
            <span style={{
              fontSize:10.5, fontWeight:700,
              color: tab === t.id ? C.mintDeep : C.textLight,
            }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { GuideView });
