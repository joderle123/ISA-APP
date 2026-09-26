#!/bin/bash
# Status für die Nachtschicht-Checks. Gibt eine Empfehlung aus: RUNNING | RESUME | NEXT | ALL_DONE
S=/tmp/claude-0/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/scratchpad
python3 - "$S" <<'PY'
import json,sys,os,time
S=sys.argv[1]; st=json.load(open(f'{S}/nachtschicht.json')); i=st['current']
def check(rid):
    j=f'/root/.claude/projects/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/subagents/workflows/{rid}/journal.jsonl'
    if not os.path.exists(j): return 'MISSING'
    age=(time.time()-os.path.getmtime(j))/60
    ls=[json.loads(l) for l in open(j) if l.strip().startswith('{')]
    ends=[l.get('type') for l in ls if l.get('type') in ('result','failed')]
    if age<20: return 'RUNNING'
    return 'RESUME' if (ends and ends[-1]=='failed') else 'DONE'
for k,e in enumerate(st.get('extras',[])):
    if e.get('done'): continue
    r=check(e['runId'])
    print(f"EXTRA {k}: {e['name']} -> {r}" + (f" | Workflow(scriptPath={e['script']}, resumeFromRunId={e['runId']})" if r=='RESUME' else '') + (" | in nachtschicht.json extras[%d].done=true setzen" % k if r=='DONE' else ''))
if i>=len(st['steps']): print('ALL_DONE'); sys.exit()
step=st['steps'][i]; rid=step['runId']
print(f"STEP {i}: {step['name']} | script={step['script']} | runId={rid}")
if not rid: print('NEXT -> launch this step (no runId yet)'); sys.exit()
j=f'/root/.claude/projects/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/subagents/workflows/{rid}/journal.jsonl'
if not os.path.exists(j): print('NEXT -> journal missing, launch'); sys.exit()
age=(time.time()-os.path.getmtime(j))/60
lines=[json.loads(l) for l in open(j) if l.strip().startswith('{')]
last=max([k for k,l in enumerate(lines) if l.get('type')=='launched'] or [0])
seg=lines[last:]; c={}
for l in seg: c[l.get('type')]=c.get(l.get('type'),0)+1
print(f"journal age {age:.0f} min | segment counts {c} | last: {[ (l.get('type'), l.get('label','')) for l in seg[-3:]]}")
if age<20: print('RUNNING'); sys.exit()
ends=[l.get('type') for l in lines if l.get('type') in ('result','failed')]
if ends and ends[-1]=='failed': print('RESUME -> Workflow(scriptPath=script, resumeFromRunId=runId)  (letzter Lauf endete mit Fehlern, z. B. Sitzungslimit)')
else: print('DONE -> nachtschicht.json current += 1, dann nächsten Schritt starten und runId eintragen')
PY
