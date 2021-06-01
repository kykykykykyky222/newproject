
const getId = function(){
   const pathName = location.pathname.substr(17)
   axios.get(`/api/${pathName}`)
   .then(dataFromAPI=>{
    const locationPoint = [dataFromAPI.data.data[0].latitude, dataFromAPI.data.data[0].longitude]
    const pointName = dataFromAPI.data.data[0].name
    const mymap = L.map("mapid").setView(locationPoint, 14)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:dataFromAPI.data.apiId
}).addTo(mymap);

const marker = L.marker(locationPoint).addTo(mymap);
marker.bindPopup(`<br>${pointName}</br>`).openPopup();
   })
   .catch(error=>{
       console.log(error)
   })
}

const getLocation = function(){
    axios.get("/api")
    .then(locationsDataFromDB=>{
        const newOne = locationsDataFromDB.data.data.map(value=>{
            return {location:[value.latitude, value.longitude], name:value.name, url:`/schedule/detail/${value._id}`}
        })
        const mymap = L.map("mapid").setView([52.52093649102079, 13.40951607066083], 2)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:locationsDataFromDB.data.apiId
    }).addTo(mymap);
        const markers = L.markerClusterGroup();
        newOne.forEach(value=>{
          const marker =  L.marker(value.location).bindPopup(`<a href="${value.url}">${value.name}</a>`).addTo(mymap)
          markers.addLayer(marker);
          mymap.addLayer(markers)
        })
       })
    .catch(error=>{
        console.log(error)
    })
}
const CurrentAndUpcomingEvent = function(){
    axios.get("/api/current_and_upcoming")
    .then(locationsDataFromDB=>{
        const newOne = locationsDataFromDB.data.data.map(value=>{
            return {location:[value.latitude, value.longitude], name:value.name, url:`/schedule/detail/${value._id}`}
        })
        const mymap = L.map("mapid").setView([52.52093649102079, 13.40951607066083], 2)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:locationsDataFromDB.data.apiId
    }).addTo(mymap);
        const markers = L.markerClusterGroup();
        newOne.forEach(value=>{
          const marker =  L.marker(value.location).bindPopup(`<a href="${value.url}">${value.name}</a>`).addTo(mymap)
          markers.addLayer(marker);
          mymap.addLayer(markers)
        })
       })
    .catch(error=>{
        console.log(error)
    })
}

const CurrentAndUpcomingBiennale = function(){
    axios.get("/api/current_and_upcoming_biennale")
    .then(locationsDataFromDB=>{
        const newOne = locationsDataFromDB.data.data.map(value=>{
            return {location:[value.latitude, value.longitude], name:value.name, url:`/schedule/detail/${value._id}`}
        })
        const mymap = L.map("mapid").setView([52.52093649102079, 13.40951607066083], 2)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:locationsDataFromDB.data.apiId
    }).addTo(mymap);
        const markers = L.markerClusterGroup();
        newOne.forEach(value=>{
          const marker =  L.marker(value.location).bindPopup(`<a href="${value.url}">${value.name}</a>`).addTo(mymap)
          markers.addLayer(marker);
          mymap.addLayer(markers)
        })
       })
    .catch(error=>{
        console.log(error)
    })
}

const CurrentAndUpcomingArtfair = function(){
    axios.get("/api/current_and_upcoming_artfair")
    .then(locationsDataFromDB=>{
        const newOne = locationsDataFromDB.data.data.map(value=>{
            return {location:[value.latitude, value.longitude], name:value.name, url:`/schedule/detail/${value._id}`}
        })
        const mymap = L.map("mapid").setView([52.52093649102079, 13.40951607066083], 2)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:locationsDataFromDB.data.apiId
    }).addTo(mymap);
        const markers = L.markerClusterGroup();
        newOne.forEach(value=>{
          const marker =  L.marker(value.location).bindPopup(`<a href="${value.url}">${value.name}</a>`).addTo(mymap)
          markers.addLayer(marker);
          mymap.addLayer(markers)
        })
       })
    .catch(error=>{
        console.log(error)
    })
}



const confirming = function(){
    if(window.confirm("are you sure?")){
        const numberId = location.pathname.substr(17);
        console.log(numberId)
        location.href=`/admin/delete/${numberId}`
    } else {
        window.alert("cancel")
    }
}




