// app-main.jsx — Root app component + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "travelerName": "Grandma Wang",
  "currentStep": 1,
  "departureIn": "6h 32min",
  "familyMemberName": "Mum",
  "accentColor": "#F4A261"
}/*EDITMODE-END*/;

function App() {
  const [role, setRole] = React.useState('Traveler');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync accent color to CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accentColor || '#F4A261');
  }, [t.accentColor]);

  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'20px 0',
      fontFamily:'Nunito, sans-serif',
    }}>
      {/* App label */}
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        marginBottom:14,
      }}>
        <img
          src="uploads/b8ddd33314c6a77561ac9c92ec4bd77a.png"
          alt="GroupFly"
          style={{ width:28, height:28, borderRadius:7 }}
        />
        <span style={{ fontSize:16, fontWeight:900, color:'rgba(255,255,255,0.9)', letterSpacing:-0.3 }}>
          GroupFly
        </span>
        <span style={{
          fontSize:10, fontWeight:700,
          background:'rgba(255,255,255,0.2)',
          color:'rgba(255,255,255,0.8)',
          padding:'2px 8px', borderRadius:20,
          letterSpacing:0.5,
        }}>PROTOTYPE</span>
      </div>

      {/* Phone frame */}
      <IOSDevice width={390} height={844}>
        <div style={{
          paddingTop:58,
          height:'100%',
          display:'flex',
          flexDirection:'column',
          background:'#F6FDFB',
          overflow:'hidden',
        }}>
          {/* Role switcher */}
          <RoleSwitcher activeRole={role} onSwitch={setRole} />

          {/* Role views */}
          <div style={{ flex:1, overflow:'hidden', marginTop:8 }}>
            <div key={role} className="role-view" style={{ height:'100%', opacity:1 }}>
              {role === 'Traveler' && (
                <TravelerView
                  name={t.travelerName}
                  initialStep={Number(t.currentStep)}
                />
              )}
              {role === 'Guide' && (
                <GuideView departureIn={t.departureIn} />
              )}
              {role === 'Family' && (
                <FamilyView memberName={t.familyMemberName} />
              )}
            </div>
          </div>
        </div>
      </IOSDevice>

      {/* Role description pills */}
      <div style={{ display:'flex', gap:8, marginTop:14 }}>
        {[
          { role:'Traveler', desc:'Elderly traveler UI', emoji:'👵' },
          { role:'Guide',    desc:'Tour guide dashboard', emoji:'🎯' },
          { role:'Family',   desc:'Family tracking', emoji:'💚' },
        ].map(item => (
          <div
            key={item.role}
            onClick={() => setRole(item.role)}
            style={{
              background: role === item.role ? 'rgba(123,200,164,0.3)' : 'rgba(255,255,255,0.12)',
              border: `1px solid ${role === item.role ? 'rgba(123,200,164,0.5)' : 'rgba(255,255,255,0.15)'}`,
              borderRadius:20, padding:'5px 12px',
              cursor:'pointer', transition:'all 0.2s ease',
              display:'flex', alignItems:'center', gap:5,
            }}
          >
            <span style={{ fontSize:13 }}>{item.emoji}</span>
            <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.85)' }}>{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Traveler Role" />
        <TweakText
          label="Traveler name"
          value={t.travelerName}
          onChange={v => setTweak('travelerName', v)}
        />
        <TweakSlider
          label="Current step"
          value={Number(t.currentStep)}
          min={0} max={3} step={1}
          unit=""
          onChange={v => setTweak('currentStep', v)}
        />

        <TweakSection label="Guide Role" />
        <TweakText
          label="Departure time"
          value={t.departureIn}
          onChange={v => setTweak('departureIn', v)}
        />

        <TweakSection label="Family Role" />
        <TweakText
          label="Member name"
          value={t.familyMemberName}
          onChange={v => setTweak('familyMemberName', v)}
        />

        <TweakSection label="Accent color" />
        <TweakColor
          label="Button / highlight"
          value={t.accentColor}
          options={['#F4A261','#E8735A','#F9C74F','#90BE6D']}
          onChange={v => setTweak('accentColor', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
