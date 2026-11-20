#!/usr/bin/env python3
"""Récupère les dernières publications publiques de YouTube sans clé API.
Le flux Atom n'indique pas systématiquement si une vidéo est un Short.
"""
import json, os, pathlib, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
CHANNEL = 'UCOMbtR-rCrL_vn_mHz6h-8g'
URL = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
ns={'a':'http://www.w3.org/2005/Atom','yt':'http://www.youtube.com/xml/schemas/2015','media':'http://search.yahoo.com/mrss/'}
req=urllib.request.Request(URL,headers={'User-Agent':'Mozilla/5.0 RealJustJackFeed/1.0'})
with urllib.request.urlopen(req,timeout=25) as response:
    xml=response.read()
root=ET.fromstring(xml)
entries=[]
for item in root.findall('a:entry',ns):
    vid=item.findtext('yt:videoId',namespaces=ns)
    if not vid or len(vid)!=11:continue
    thumb=item.find('media:group/media:thumbnail',ns)
    entries.append({'title':item.findtext('a:title',default='',namespaces=ns),
      'url':f'https://www.youtube.com/watch?v={vid}',
      'thumbnail':thumb.get('url') if thumb is not None else f'https://i.ytimg.com/vi/{vid}/hqdefault.jpg',
      'published':item.findtext('a:published',default='',namespaces=ns),
      'is_short':False})
if not entries:raise SystemExit('Le flux ne contient aucune vidéo : fichier précédent conservé')
output=pathlib.Path(__file__).resolve().parents[1]/'youtube-feed.json'
output.write_text(json.dumps({'updated_at':datetime.now(timezone.utc).isoformat(),'videos':entries},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(entries)} vidéos mises à jour')
