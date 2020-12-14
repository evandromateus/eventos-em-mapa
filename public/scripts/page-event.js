var map = L.map('mapid', { zoomControl: false }).setView([-23.5893795, -48.0427597], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);