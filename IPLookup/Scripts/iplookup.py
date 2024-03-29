import asyncio
import json
from Scripts.request import request
from pyscript import Element

async def lookup():
    try:
        target = Element("addrs-input").value
        output = Element("lookup_output")
        
        response = await request(f"https://freeipapi.com/api/json/{target}", method="GET")
        output2 = await response.json()
        lat, lon = output2['latitude'], output2['longitude']
        
        
        outmap = Element("location")
        baseurl = f"https://maps.google.com/maps?q={lat},{lon}&hl=es;z=14&output=embed"
        if outmap.element.src != baseurl:
            outmap.element.src = baseurl
        
        output.write((json.dumps(output2, indent=4)))
    except:
        pass



def main():
    if Element("addrs-input").value != "":
        asyncio.ensure_future(lookup())
    else:
        Element("lookup_output").write("Input Ip address required")
