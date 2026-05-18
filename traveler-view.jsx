// traveler-view.jsx — Elderly traveler interface

const TRAVELER_STEPS = [
  {
    label: 'Check-in',
    title: 'Time to Check In',
    lines: ['Counter C12', 'Terminal 2 · Level 2'],
    tip: 'Bring your passport & ticket',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="6" width="28" height="24" rx="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
        <path d="M10 18H26M10 13H20M10 23H16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="28" cy="8" r="5" fill="rgba(255,255,255,0.3)"/>
        <path d="M26 8L27.5 9.5L30 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Security',
    title: 'Pass Security',
    lines: ['Zone B Security', 'Remove belt & watch'],
    tip: 'Follow staff instructions',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L6 9V18C6 24.63 11.37 30.74 18 32C24.63 30.74 30 24.63 30 18V9L18 4Z"
          stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
        <path d="M12 18L15.5 21.5L24 13.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Gate',
    title: 'Walk to Your Gate',
    lines: ['Gate G15 · Level 3', 'Boarding at 14:30'],
    tip: 'Take elevator, allow 15 min',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="8" width="18" height="24" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
        <path d="M16 20C16 18.34 17.34 17 19 17H30V29H19C17.34 29 16 27.66 16 26V20Z" fill="rgba(255,255,255,0.3)"/>
        <circle cx="19.5" cy="23" r="1.5" fill="white"/>
        <path d="M24 14L30 20L24 26" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Board',
    title: 'Board the Plane',
    lines: ['Gate G15 is open!', 'Show boarding pass'],
    tip: 'Your seat: Row 23, Seat A',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M28 14C28 14 32 15 32 18C32 21 28 22 28 22L20 24L16 32L12 32L14 22L8 20L6 22L4 22L5 18L4 14L6 14L8 16L14 14L12 4L16 4L20 12L28 14Z"
          stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" fill="rgba(255,255,255,0.25)" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function TravelerView({ name, initialStep }) {
  const [stepIdx, setStepIdx] = React.useState(
    Math.min(Math.max(Number(initialStep) || 1, 0), 3)
  );
  const [sosState, setSosState] = React.useState('idle'); // idle | active | notified

  React.useEffect(() => {
    setStepIdx(Math.min(Math.max(Number(initialStep) || 1, 0), 3));
  }, [initialStep]);

  const step = TRAVELER_STEPS[stepIdx];

  function handleSOS() {
    setSosState('active');
    setTimeout(() => setSosState('notified'), 600);
    setTimeout(() => setSosState('idle'), 4000);
  }

  function advance() {
    if (stepIdx < TRAVELER_STEPS.length - 1) setStepIdx(s => s + 1);
  }

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: C.bg, fontFamily: 'Nunito, sans-serif', position: 'relative',
    }}>
      {/* Top bar */}
      <AppTopBar greeting={`Hello, ${name || 'Grandma Wang'} 👋`} />

      {/* Progress steps */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '14px 14px 10px',
        background: C.white,
        borderBottom: `1.5px solid ${C.mintLight}`,
      }}>
        {TRAVELER_STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: i === stepIdx ? 28 : 22,
                height: i === stepIdx ? 28 : 22,
                borderRadius: '50%',
                background: i < stepIdx ? C.mint : i === stepIdx ? C.mint : '#E6F4EC',
                border: i === stepIdx ? `3px solid ${C.mintDark}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: i === stepIdx ? '0 2px 10px rgba(123,200,164,0.45)' : 'none',
                transition: 'all 0.3s ease',
              }}>
                {i < stepIdx
                  ? <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <div style={{ width: i === stepIdx ? 10 : 7, height: i === stepIdx ? 10 : 7, borderRadius: '50%', background: i === stepIdx ? 'white' : '#A8D8BC' }}/>
                }
              </div>
              <span style={{
                fontSize: 10, fontWeight: i === stepIdx ? 800 : 600,
                color: i <= stepIdx ? C.mintDeep : C.textLight,
              }}>{s.label}</span>
            </div>
            {i < TRAVELER_STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 3, borderRadius: 2,
                background: i < stepIdx ? C.mint : '#DFF0E8',
                marginBottom: 14, transition: 'background 0.4s ease',
              }}/>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current step card */}
      <div style={{ flex: 1, padding: '18px 14px 10px', overflow: 'hidden' }}>
        <div
          onClick={advance}
          key={stepIdx}
          className="step-card"
          style={{
            background: `linear-gradient(140deg, ${C.mint} 0%, ${C.mintDark} 100%)`,
            borderRadius: 24,
            padding: '26px 22px 22px',
            cursor: stepIdx < 3 ? 'pointer' : 'default',
            boxShadow: '0 10px 28px rgba(91,168,130,0.38)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Decorative blobs */}
          <div style={{ position:'absolute', top:-30, right:-20, width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,0.1)' }}/>
          <div style={{ position:'absolute', bottom:-20, left:-10, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>

          {/* Icon + step label */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, position:'relative' }}>
            <div style={{ width:58, height:58, borderRadius:18, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {step.icon}
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.75)', textTransform:'uppercase', letterSpacing:1.5 }}>
                Step {stepIdx+1} of 4
              </div>
              <div style={{ fontSize:26, fontWeight:900, color:'white', lineHeight:1.2, marginTop:2 }}>
                {step.title}
              </div>
            </div>
          </div>

          {/* Lines */}
          <div style={{ position:'relative', marginBottom:18 }}>
            {step.lines.map((line, i) => (
              <div key={i} style={{
                fontSize: i === 0 ? 28 : 22,
                fontWeight: i === 0 ? 900 : 700,
                color: i === 0 ? 'white' : 'rgba(255,255,255,0.85)',
                lineHeight: 1.35,
              }}>{line}</div>
            ))}
          </div>

          {/* Tip */}
          <div style={{
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 14, padding: '10px 14px',
            fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize:18 }}>💡</span>
            {step.tip}
          </div>

          {stepIdx < 3 && (
            <div style={{ textAlign:'center', marginTop:14, fontSize:13, color:'rgba(255,255,255,0.65)', fontWeight:600 }}>
              Tap to advance step →
            </div>
          )}
          {stepIdx === 3 && (
            <div style={{ textAlign:'center', marginTop:14, fontSize:15, color:'rgba(255,255,255,0.85)', fontWeight:700 }}>
              ✈️ Have a great flight!
            </div>
          )}
        </div>

        {/* Auto hint */}
        <div style={{
          textAlign:'center', marginTop:14,
          fontSize:13, color:C.textLight, fontWeight:600,
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke={C.textLight} strokeWidth="1.2"/>
            <path d="M7 4V7.5L9 9.5" stroke={C.textLight} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Next step appears automatically
        </div>
      </div>

      {/* SOS Button */}
      {sosState === 'notified' ? (
        <div style={{
          position:'absolute', bottom:90, right:16,
          background:'#FF4D4D', color:'white',
          borderRadius:16, padding:'12px 16px',
          fontSize:14, fontWeight:800,
          boxShadow:'0 4px 20px rgba(255,77,77,0.45)',
          display:'flex', alignItems:'center', gap:8, zIndex:10,
          animation:'fadeSlideIn 0.2s ease',
        }}>
          <span style={{fontSize:18}}>🆘</span>
          Guide has been notified!
        </div>
      ) : (
        <button
          onClick={handleSOS}
          className="sos-btn"
          style={{
            position:'absolute', bottom:90, right:16,
            width:60, height:60, borderRadius:18,
            background: sosState === 'active' ? '#FF4D4D' : C.orange,
            border:'none', cursor:'pointer',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
            zIndex:10,
            transform: sosState === 'active' ? 'scale(0.92)' : 'scale(1)',
            transition: 'transform 0.15s ease, background 0.2s ease',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9" fill="rgba(255,255,255,0.2)"/>
            <path d="M11 6V12" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
            <circle cx="11" cy="15.5" r="1.2" fill="white"/>
          </svg>
          <span style={{ fontSize:10, fontWeight:900, color:'white', letterSpacing:1 }}>SOS</span>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { TravelerView });
