// app-shared.jsx — Color tokens, icons, shared UI components

const C = {
  mint:        '#7BC8A4',
  mintLight:   '#EBF7F1',
  mintMed:     '#C5E8D5',
  mintDark:    '#5AA882',
  mintDeep:    '#3D8C65',
  orange:      '#F4A261',
  orangeLight: '#FEF0E4',
  orangeDark:  '#E07832',
  white:       '#FFFFFF',
  bg:          '#F6FDFB',
  cardBg:      '#FFFFFF',
  textDark:    '#1A2B22',
  textMed:     '#4A7862',
  textLight:   '#8FB09E',
  red:         '#F87171',
  redLight:    '#FFF3F3',
  yellow:      '#FBBF24',
  yellowLight: '#FFFBEB',
  greenOk:     '#34D399',
};

// ── Role Switcher ─────────────────────────────────────────────
function RoleSwitcher({ activeRole, onSwitch }) {
  const roles = ['Traveler', 'Guide', 'Family'];
  return (
    <div style={{
      display: 'flex', gap: 3,
      background: '#E5F4EC',
      borderRadius: 14, padding: 4,
      margin: '6px 14px 0',
    }}>
      {roles.map(r => {
        const active = r === activeRole;
        return (
          <button key={r} onClick={() => onSwitch(r)} style={{
            flex: 1, padding: '9px 0',
            borderRadius: 10, border: 'none',
            background: active ? C.mint : 'transparent',
            color: active ? '#fff' : C.textMed,
            fontFamily: 'Nunito, sans-serif',
            fontSize: 13, fontWeight: active ? 800 : 600,
            cursor: 'pointer', transition: 'all 0.18s ease',
            boxShadow: active ? '0 2px 8px rgba(123,200,164,0.35)' : 'none',
            letterSpacing: active ? 0.2 : 0,
          }}>{r}</button>
        );
      })}
    </div>
  );
}

// ── App Logo ──────────────────────────────────────────────────
function AppLogo({ size = 34 }) {
  return (
    <img
      src="uploads/b8ddd33314c6a77561ac9c92ec4bd77a.png"
      alt="GroupFly"
      style={{ width: size, height: size, borderRadius: size * 0.22, flexShrink: 0 }}
    />
  );
}

// ── Member status icons ───────────────────────────────────────
function IcoPassport({ ok }) {
  const s = ok ? C.mint : '#D4D4D4';
  const f = ok ? C.mintLight : 'none';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2.5" stroke={s} strokeWidth="1.5" fill={f}/>
      <rect x="6" y="6" width="8" height="5" rx="1.2" fill={s}/>
      <line x1="6" y1="13.5" x2="14" y2="13.5" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6" y1="15.5" x2="11" y2="15.5" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function IcoBaggage({ ok }) {
  const s = ok ? C.mint : '#D4D4D4';
  const f = ok ? C.mintLight : 'none';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="7.5" width="14" height="10" rx="2.5" stroke={s} strokeWidth="1.5" fill={f}/>
      <path d="M7 7.5V6C7 5.17 7.67 4.5 8.5 4.5H11.5C12.33 4.5 13 5.17 13 6V7.5" stroke={s} strokeWidth="1.5"/>
      <line x1="10" y1="10" x2="10" y2="15" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="7" y1="12.5" x2="13" y2="12.5" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function IcoCheckin({ ok }) {
  const s = ok ? C.mint : '#D4D4D4';
  const f = ok ? C.mintLight : 'none';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke={s} strokeWidth="1.5" fill={f}/>
      {ok
        ? <path d="M6 10L8.5 12.5L14 7.5" stroke={C.mintDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        : <line x1="7" y1="10" x2="13" y2="10" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      }
    </svg>
  );
}

function IcoLocation({ ok }) {
  const s = ok ? C.mint : '#D4D4D4';
  const f = ok ? C.mintLight : 'none';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C7 2 4.5 4.5 4.5 7.5C4.5 11.5 10 18 10 18C10 18 15.5 11.5 15.5 7.5C15.5 4.5 13 2 10 2Z"
        stroke={s} strokeWidth="1.5" fill={f}/>
      <circle cx="10" cy="7.5" r="2" fill={s}/>
    </svg>
  );
}

// ── Bottom nav icons ──────────────────────────────────────────
function IcoHome({ active }) {
  const c = active ? C.mint : C.textLight;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V15H8V20H4C3.45 20 3 19.55 3 19V9.5Z"
        stroke={c} strokeWidth="1.7" fill={active ? C.mintLight : 'none'} strokeLinejoin="round"/>
    </svg>
  );
}

function IcoPin({ active }) {
  const c = active ? C.mint : C.textLight;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2C7.69 2 5 4.69 5 8C5 12.5 11 20 11 20C11 20 17 12.5 17 8C17 4.69 14.31 2 11 2Z"
        stroke={c} strokeWidth="1.7" fill={active ? C.mintLight : 'none'}/>
      <circle cx="11" cy="8" r="2.5" fill={c}/>
    </svg>
  );
}

function IcoBell({ active, hasBadge }) {
  const c = active ? C.mint : C.textLight;
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C7.69 3 5 5.69 5 9V15H17V9C17 5.69 14.31 3 11 3Z"
          stroke={c} strokeWidth="1.7" fill={active ? C.mintLight : 'none'} strokeLinejoin="round"/>
        <path d="M8 15V16C8 17.66 9.34 19 11 19C12.66 19 14 17.66 14 16V15"
          stroke={c} strokeWidth="1.7"/>
        <line x1="3" y1="15" x2="19" y2="15" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
      {hasBadge && (
        <div style={{
          position: 'absolute', top: -2, right: -2,
          width: 9, height: 9, borderRadius: '50%',
          background: C.red, border: '1.5px solid white',
        }}/>
      )}
    </div>
  );
}

// ── Shared: App top bar (logo + name + greeting) ──────────────
function AppTopBar({ greeting }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 16px 10px',
      background: C.white,
      borderBottom: `1.5px solid ${C.mintLight}`,
    }}>
      <AppLogo size={34} />
      <div>
        <div style={{ fontSize: 15, fontWeight: 900, color: C.textDark, letterSpacing: -0.3 }}>GroupFly</div>
        <div style={{ fontSize: 11.5, color: C.textMed, fontWeight: 600, marginTop: 0 }}>{greeting}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  C, RoleSwitcher, AppLogo, AppTopBar,
  IcoPassport, IcoBaggage, IcoCheckin, IcoLocation,
  IcoHome, IcoPin, IcoBell,
});
