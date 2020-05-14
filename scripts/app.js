// api link to get the parking data
const apiUrl = 'https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json';

// declare the DOM elements
const overviewElement = document.getElementById('parking-overview');

function getApiData() {
  return new Promise((resolve, reject) => {
  
    fetch(apiUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        resolve(data);
        console.log(data)
    })
    .catch((error) => {
      reject(error);
    })
  })
}



function interval() {


  getApiData()
.then((data)=> {
  overviewElement.innerHTML = '';
  // parkingElement.innerHTML = '';
  data.forEach(info => {

    let parkingDiv = document.createElement('div');
    parkingDiv.className = 'parking';
    let parkingHTML = `
      
      <h2>${info.description} </h2>
      <ul>
          <li>Capaciteit: ${info.parkingStatus.totalCapacity} </li>
          <li>Beschikbaar: ${info.parkingStatus.availableCapacity}</li>
      </ul>
      <p><a target="_blank" href="https://www.google.be/maps/place/${info.latitude},${info.longitude}">Route</a></p>
    `;

    parkingDiv.innerHTML = parkingHTML;
    overviewElement.appendChild(parkingDiv);
  });
  console.log('Data updated')
});

}

interval();
setInterval(interval, 300000);