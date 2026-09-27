#!/bin/bash
# Status für die Nachtschicht-Checks. Empfehlung je Lauf: RUNNING | RESUME | DONE | NEXT | ALL_DONE
S=/tmp/claude-0/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/scratchpad
python3 - "$S" <<'PY'
import json,sys,os,time
S=sys.argv[1]; st=json.load(open(f'{S}/nachtschicht.json'))
W='/root/.claude/projects/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/subagents/workflows'
def check(rid):
    d=f'{W}/{rid}'; j=f'{d}/journal.jsonl'
    if not os.path.exists(j): return 'MISSING',''
    ls=[json.loads(l) for l in open(j) if l.strip().startswith('{')]
    started={l['agentId']:l.get('label','') for l in ls if l.get('type')=='started'}
    ended={l['agentId']:l['type'] for l in ls if l.get('type') in ('result','failed')}
    pending=[a for a in started if a not in ended]
    fresh=[a for a in pending if os.path.exists(f'{d}/agent-{a}.jsonl') and time.time()-os.path.getmtime(f'{d}/agent-{a}.jsonl')<30*60]
    info=f"laufend: {[started[a] for a in fresh]} | erledigt ok: {sum(1 for v in ended.values() if v=='result')} | fehlgeschlagen: {sum(1 for v in ended.values() if v=='failed')}"
    if fresh: return 'RUNNING',info
    ends=[l['type'] for l in ls if l.get('type') in ('result','failed')]
    if pending or (ends and ends[-1]=='failed'): return 'RESUME',info
    return 'DONE',info
for k,e in enumerate(st.get('extras',[])):
    if e.get('done'): continue
    r,info=check(e['runId'])
    print(f"EXTRA {k}: {e['name']} -> {r} | {info}" + (f" | Workflow(scriptPath={e['script']}, resumeFromRunId={e['runId']}, args scratch)" if r=='RESUME' else '') + (f" | extras[{k}].done=true setzen" if r=='DONE' else ''))
i=st['current']
if st.get('extras_first') and any(not e.get('done') for e in st.get('extras',[])):
    print('STEPS: WAIT – zuerst das Grafik-Upgrade fertig machen (zwei Software-GL-Browser gleichzeitig stören sich)'); sys.exit()
if i>=len(st['steps']): print('ALL_DONE'); sys.exit()
step=st['steps'][i]; rid=step['runId']
if not rid: print(f"STEP {i}: {step['name']} -> NEXT | Workflow(scriptPath={step['script']}, args scratch), dann runId eintragen"); sys.exit()
r,info=check(rid)
msg={'RUNNING':'','RESUME':f" | Workflow(scriptPath={step['script']}, resumeFromRunId={rid}, args scratch)",'DONE':' | current += 1 setzen, dann nächsten Schritt starten (NEXT)','MISSING':' | Journal fehlt: Schritt neu starten'}[r]
print(f"STEP {i}: {step['name']} -> {r} | {info}{msg}")
PY
