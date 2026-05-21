// family-view.jsx — Family member tracking interface

const FAMILY_MILESTONES = [
  { id:'checkin',  label:'Checked In',     time:'08:15', detail:'Counter C12 · BNE T2',  done:true,    current:false },
  { id:'security', label:'Security Passed', time:'09:02', detail:'Zone B · No issues',     done:true,    current:false },
  { id:'gate',     label:'At Gate G15',     time:'09:45', detail:'Level 3 · On time',      done:false,   current:true  },
  { id:'boarding', label:'Boarding',         time:'14:30', detail:'Expected boarding time', done:false,   current:false },
  { id:'departed', label:'Departed',         time:'15:00', detail:'Flight MU5137 · BNE→PEK',done:false,  current:false },
  { id:'arrived',  label:'Arrived',          time:'17:30', detail:'PEK Terminal 3',         done:false,   current:false },
];

const REASSURE_MESSAGES = [
  'is doing great! ✈️',
  'has passed security ✓',
  'is at the gate 🚪',
  'is on the way home 🏠',
];

function FamilyView({ memberName }) {
  const name = memberName || 'Mum';
  const currentIdx = FAMILY_MILESTONES.findIndex(m => m.current);

  // Subtle background update message
  const lastUpdate = '5 min ago';

  return (
    <div style={{
      height:'100%', overflowY:'auto',
      background:C.bg, fontFamily:'Nunito, sans-serif',
      paddingBottom:24,
    }}>

      {/* Top bar */}
      <AppTopBar greeting="Family Tracking View" />

      {/* Reassurance card */}
      <div style={{ padding:'14px 14px 0' }}>
        <div style={{
          background:`linear-gradient(130deg, ${C.mint} 0%, ${C.mintDark} 100%)`,
          borderRadius:22, padding:'18px 20px',
          boxShadow:'0 8px 24px rgba(91,168,130,0.3)',
          position:'relative', overflow:'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position:'absolute', top:-24, right:-16, width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,0.12)' }}/>
          <div style={{ position:'absolute', bottom:-20, left:-10, width:70, height:70, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>

          <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative' }}>
            {/* Avatar circle */}
            <div style={{
              width:52, height:52, borderRadius:16,
              background:'rgba(255,255,255,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22,
            }}>👵</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:1.2, marginBottom:2 }}>
                Traveler Status
              </div>
              <div style={{ fontSize:20, fontWeight:900, color:'white', lineHeight:1.2 }}>
                {name} {REASSURE_MESSAGES[currentIdx] || 'is on the way ✈️'}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display:'flex', gap:8, marginTop:14, position:'relative',
          }}>
            {[
              { label:'Steps Done', value:`${FAMILY_MILESTONES.filter(m=>m.done).length}/${FAMILY_MILESTONES.length}` },
              { label:'Flight',     value:'MU5137' },
              { label:'Last Update',value:lastUpdate },
            ].map(stat => (
              <div key={stat.label} style={{
                flex:1, background:'rgba(255,255,255,0.2)',
                borderRadius:12, padding:'8px 6px', textAlign:'center',
              }}>
                <div style={{ fontSize:14, fontWeight:900, color:'white' }}>{stat.value}</div>
                <div style={{ fontSize:9.5, fontWeight:700, color:'rgba(255,255,255,0.75)', marginTop:1 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ fontSize:12, fontWeight:800, color:C.textMed, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>
          Journey Progress
        </div>

        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{
            position:'absolute',
            left:17, top:14, bottom:14,
            width:3, borderRadius:2,
            background:`linear-gradient(to bottom, ${C.mint} ${((currentIdx+0.5)/FAMILY_MILESTONES.length)*100}%, #E0EDE6 ${((currentIdx+0.5)/FAMILY_MILESTONES.length)*100}%)`,
          }}/>

          {/* Milestones */}
          {FAMILY_MILESTONES.map((m, i) => {
            const isDone    = m.done;
            const isCurrent = m.current;
            const isPending = !m.done && !m.current;

            return (
              <div key={m.id} style={{
                display:'flex', alignItems:'flex-start', gap:14,
                marginBottom: i < FAMILY_MILESTONES.length - 1 ? 22 : 0,
                position:'relative',
              }}>
                {/* Circle */}
                <div style={{ position:'relative', flexShrink:0, zIndex:2 }}>
                  {isCurrent && (
                    <div className="milestone-pulse" style={{
                      position:'absolute',
                      top:'50%', left:'50%',
                      transform:'translate(-50%,-50%)',
                      width:34, height:34, borderRadius:'50%',
                      background:`${C.orange}30`,
                    }}/>
                  )}
                  <div style={{
                    width:34, height:34, borderRadius:'50%',
                    background: isDone    ? C.mint
                               : isCurrent ? C.orange
                               : '#EDF4F0',
                    border: isCurrent ? `3px solid ${C.orangeDark}` : isDone ? 'none' : `2px solid #C5DDD1`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow: isCurrent ? `0 0 0 5px ${C.orange}22` : isDone ? '0 2px 8px rgba(123,200,164,0.35)' : 'none',
                    transition:'all 0.3s ease',
                    position:'relative', zIndex:1,
                  }}>
                    {isDone ? (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : isCurrent ? (
                      <div style={{ width:8, height:8, borderRadius:'50%', background:'white' }}/>
                    ) : (
                      <div style={{ width:8, height:8, borderRadius:'50%', background:'#C5DDD1' }}/>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  flex:1, paddingTop:6,
                  opacity: isPending ? 0.55 : 1,
                  transition:'opacity 0.3s ease',
                }}>
                  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
                    <div style={{
                      fontSize: isCurrent ? 16 : 15,
                      fontWeight: isCurrent ? 900 : isDone ? 700 : 600,
                      color: isCurrent ? C.textDark : isDone ? C.textDark : C.textLight,
                    }}>{m.label}</div>
                    <div style={{
                      fontSize:11.5, fontWeight:700,
                      color: isCurrent ? C.orange : isDone ? C.mintDark : C.textLight,
                      flexShrink:0,
                    }}>{m.time}</div>
                  </div>
                  <div style={{
                    fontSize:12, fontWeight:600,
                    color: isCurrent ? C.textMed : C.textLight,
                    marginTop:1,
                  }}>{m.detail}</div>

                  {isCurrent && (
                    <div style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      background:C.orangeLight,
                      borderRadius:8, padding:'4px 10px', marginTop:6,
                    }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:C.orange, animation:'milestonePulse 1.5s ease-in-out infinite' }}/>
                      <span style={{ fontSize:11, fontWeight:800, color:C.orangeDark }}>Now here</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom comfort note */}
      <div style={{
        margin:'20px 14px 0',
        background:C.mintLight,
        borderRadius:16, padding:'14px 16px',
        display:'flex', alignItems:'center', gap:12,
      }}>
        <div style={{
          width:36, height:36, borderRadius:12,
          background:C.mint, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:18,
        }}>🔔</div>
        <div>
          <div style={{ fontSize:13, fontWeight:800, color:C.mintDeep }}>Auto Notifications On</div>
          <div style={{ fontSize:11.5, fontWeight:600, color:C.textMed, marginTop:1 }}>
            You'll be notified when {name} boards and lands
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FamilyView });
