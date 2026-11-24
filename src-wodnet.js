// METGrind: joins a REPGrind WOD Code as an athlete. The camera phone sends +1 per counted rep to the coach's phone.
// Same protocol as REPGrind's WOD Code (Trystero 0.27, appId repgrind-wodcode-v1, room wod-CODE, password rg-CODE).
import { joinRoom } from 'trystero';
(function () {
  const APP = 'repgrind-wodcode-v1', now = () => Date.now();
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  let aid = ls.get('mg_aid', null);
  if (!aid) { aid = Math.random().toString(36).slice(2, 10) + now().toString(36); ls.set('mg_aid', aid); }
  const transport = () => window.RC_WOD_TRANSPORT || joinRoom;
  let room = null, A = {}, code = '', name = '', status = '', err = '', coach = null, myLane = -1, seq = 0, pend = [], lastSeen = 0, welcomed = false, timer = 0, onChange = () => { };
  const M = { st: null, at: 0, lanes: {}, sid: 0, ci: null };
  const send = (n, d, target) => { try { A[n] && A[n].send(d, target ? { target } : undefined).catch(() => { }); } catch (e) { } };
  const on = (n, f) => A[n].onMessage((d, c) => { try { f(d, c.peerId); } catch (e) { console.warn(e); } });
  const persist = () => ls.set('mg_wod_' + code, { seq, pend: pend.slice(-200), lane: myLane });
  const flush = () => { if (coach && pend.length) send('op', pend.slice(0, 100), coach); };
  const ui = () => { try { onChange(api); } catch (e) { } };
  let lastQ = -1, kfAsk = 0;
  function apply(o, pid, kf) {
    if (coach && pid !== coach) return;
    if (o.ci !== M.ci) { M.ci = o.ci; lastQ = -1; }
    if (o.q != null) {
      if (kf ? o.q < lastQ : o.q <= lastQ) return;
      if (!kf && lastQ >= 0 && o.q !== lastQ + 1 && now() - kfAsk > 500) { kfAsk = now(); send('need', { kf: 1 }, pid); }
      lastQ = o.q;
    }
    coach = pid; lastSeen = now(); if (status !== 'live') status = 'live';
    if (o.sid !== M.sid) { M.sid = o.sid; M.lanes = {}; if (!kf) { send('need', { kf: 1 }, pid); kfAsk = now(); } }
    let need = false; const seen = {};
    for (const l of o.lanes) {
      seen[l.id] = 1; const m = M.lanes[l.id] || (M.lanes[l.id] = { r: [] }); m.n = l.n; m.k = l.k; m.a = l.a;
      if (l.c < m.r.length) m.r.length = l.c; else if (l.c > m.r.length) { const gap = l.c - m.r.length; if (gap <= l.t.length) m.r.push(...l.t.slice(l.t.length - gap)); else need = true; }
      if (l.id === myLane) pend = pend.filter(p => p.seq > (l.a || 0));
    }
    if (kf) for (const id in M.lanes) if (!seen[id]) delete M.lanes[id];
    M.st = o; M.at = now();
    if (kf && myLane >= 0 && !M.lanes[myLane] && status === 'live') status = 'removed';
    if (need) send('need', 1, coach);
    persist(); ui();
  }
  function join(c, n, cb) {
    leave(); code = c; name = n; onChange = cb || onChange; err = ''; status = 'connecting'; welcomed = false; coach = null; myLane = -1; M.st = null; M.lanes = {}; M.sid = 0; M.ci = null; lastQ = -1;
    const sv = ls.get('mg_wod_' + code, null); if (sv) { seq = sv.seq || 0; pend = sv.pend || []; myLane = sv.lane != null ? sv.lane : -1; } else { seq = 0; pend = []; }
    room = transport()({ appId: APP, password: 'rg-' + code }, 'wod-' + code);
    for (const k of ['hello', 'welcome', 'op', 'st', 'sd', 'need', 'full', 'ping', 'pong']) A[k] = room.makeAction(k);
    room.onError && room.onError(e => { if (e && e.code === 'relay-failed') { err = 'Could not reach the relays. Check the internet connection.'; ui(); } });
    const hello = pid => send('hello', { aid, name, v: 1 }, pid);
    room.onPeerJoin(c => hello(c.peerId));
    room.onPeerLeave(c => { if (c.peerId === coach) { status = 'lost'; ui(); } });
    on('welcome', (d, pid) => { if (!d) return; if (d.full) { status = 'full'; ui(); return; } if (d.screen) return; welcomed = true; coach = pid; myLane = d.lane; status = 'live'; lastSeen = now(); persist(); flush(); ui(); });
    on('ping', (d, pid) => send('pong', { t: d.t, ta: now() }, pid));
    on('st', (o, pid) => apply(o, pid, true)); on('sd', (o, pid) => apply(o, pid, false));
    on('full', (o, pid) => { if (coach && pid !== coach) return; if (o.sid !== M.sid) { M.sid = o.sid; M.lanes = {}; } for (const l of o.lanes) { const m = M.lanes[l.id] || (M.lanes[l.id] = { r: [] }); m.r = l.r.slice(); } ui(); });
    timer = setInterval(() => {
      if (status === 'live' && now() - lastSeen > 5000) { status = 'lost'; welcomed = false; ui(); }
      if (!welcomed || status === 'lost') send('hello', { aid, name, v: 1 });
      flush();
    }, 1500);
    ui();
  }
  function leave() { clearInterval(timer); try { room && room.leave(); } catch (e) { } room = null; A = {}; status = ''; coach = null; myLane = -1; M.st = null; M.lanes = {}; }
  const elNow = () => { const o = M.st; if (!o) return 0; if (o.s === 1) return Math.max(0, now() - M.at - o.cd * 1000); return o.s === 2 ? o.e + (now() - M.at) : o.e; };
  // +1 rep: the coach counts it at the time it happened on the coach's clock (e = elapsed time in the workout, as REPGrind's own athletes send)
  function rep() { const st = M.st; if (st && (st.s === 4 || (st.s === 1 && st.cd - (now() - M.at) / 1000 > 0.3))) return false; const o = { op: 'p', e: elNow(), seq: ++seq, at: now() }; pend.push(o); persist(); flush(); return true; }
  function board() { return Object.keys(M.lanes).map(Number).sort((a, b) => a - b).map(id => { const m = M.lanes[id]; let c = m.r.length; if (id === myLane) c += pend.filter(p => p.op === 'p').length; return { id, name: m.n || '', reps: c, me: id === myLane }; }); }
  // the coach's workout as METGrind movements, if every movement is one METGrind counts: wi 'L|30:Wall balls,20:Jump burpees' (chipper) or a rep scheme
  const api = { join, leave, rep, board, elNow, get status() { return status; }, get err() { return err; }, get code() { return code; }, get lane() { return myLane; }, get coachState() { return M.st; }, get at() { return M.at; }, get pending() { return pend.length; } };
  window.MG_NET = api;
})();
