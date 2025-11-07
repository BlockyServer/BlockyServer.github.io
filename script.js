const ip = 'mc.td2dr.xyz';
const res = await fetch(`https://api.mcsrvstat.us/2/${ip}?t=${Date.now()}`);
const data = await res.json();
// ignore the crap code xd
const st = document.getElementById('st');
const pl = document.getElementById('pl');
const mx = document.getElementById('max');
const ver = document.getElementById('ver');
const mot = document.getElementById('motd');
const ipTxt = document.getElementById('ipTxt');
const playBtn = document.getElementById('playBtn');
const rBtn = document.getElementById('refresh');
const yr = document.getElementById('yr');

yr.textContent = new Date().getFullYear();
ipTxt.textContent = ip;
playBtn.href = `minecraft://?addExternalServer=${encodeURIComponent(ip)}`;

function upd(d){
  if(!d || !d.online){
    st.textContent = 'Offline';
    st.style.background = 'linear-gradient(90deg,#FF6B6B,#FF8E6B)';
    pl.textContent = '0';
    mx.textContent = '—';
    ver.textContent = '—';
    mot.textContent = 'Server is offline or unreachable';
    return;
  }
  st.textContent = 'Online';
  st.style.background = 'linear-gradient(90deg,#7afcff,#7b61ff)';
  const p = d.players && typeof d.players.online === 'number' ? d.players.online : 0;
  const m = d.players && typeof d.players.max === 'number' ? d.players.max : '—';
  pl.textContent = p;
  mx.textContent = m;
  ver.textContent = d.version || '—';
  let mtxt = '—';
  if(d.motd && d.motd.clean){
    mtxt = Array.isArray(d.motd.clean) ? d.motd.clean.join(' ') : d.motd.clean;
  }
  mot.textContent = mtxt || '—';
}

upd(data);

async function chk(){
  try{
    const r = await fetch(`https://api.mcsrvstat.us/2/${ip}?t=${Date.now()}`);
    const j = await r.json();
    upd(j);
  }catch(e){
    upd(null);
  }
}

rBtn.addEventListener('click', ()=>{ rBtn.disabled = true; rBtn.textContent = 'Refreshing…'; chk().finally(()=>{ rBtn.disabled = false; rBtn.textContent = 'Refresh status' }) });

setInterval(chk, 25000);

document.addEventListener('mousemove', e=>{
  const x = (e.clientX - innerWidth/2) / innerWidth;
  const y = (e.clientY - innerHeight/2) / innerHeight;
  const card = document.getElementById('serverCard');
  if(card) card.style.transform = `translateY(${y * -8}px) translateX(${x * 10}px) rotateX(${y * 3}deg)`;
});

document.querySelectorAll('.fade-in, .panel, .server-card, .brand, .hero-title, .cta').forEach((el,i)=>{
  el.style.opacity = 0;
  setTimeout(()=>{ el.style.transition = 'opacity .6s ease, transform .6s ease'; el.style.opacity = 1; }, 120 + i*80);
});
