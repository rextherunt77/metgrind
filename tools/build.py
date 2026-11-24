#!/usr/bin/env python3
"""Builds the two pages from src/app.html: index.html (METGrind) and practice.html (Practice movements)."""
import os,re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s=open(R+'/src/app.html',encoding='utf-8').read()
open(R+'/index.html','w',encoding='utf-8').write(s)
t=s.replace('<body class="m-metcon">','<body class="m-test">',1)
t=t.replace('<title>METGrind (beta)</title>','<title>METGrind: practice movements (beta)</title>',1)
t=re.sub(r'<script>/\* WOD Code link.*?</script>\n','',t,count=1,flags=re.S)   # no WOD Code on the practice page
open(R+'/practice.html','w',encoding='utf-8').write(t)
print('built index.html and practice.html')
