//function for searching super hero by name and filtering the data
const showCorrespondingHeros = () => {

  const xhr = new XMLHttpRequest();
  const name = document.getElementById("name").value;

  // If error occurs
  xhr.onerror = function () {
    document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
  }
  // IF NO ERROR load
  xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.response);
    console.log(responseJSON);

    let html = "";
    html += "<div class='row'>";
    if (responseJSON.response == "success") {
      responseJSON.results.forEach((element) => {

        html += `
          <div class="col-4" style = "margin-top = 50px;">
            <div class="card d-flex justify-content-center">
              <img class="card-img-top" onclick="+showDetails(${element.id})" src="${element.image.url}">
              <div class="card-body">
                  <span> <h5 class="card-title" onclick="showDetails(${element.id})">${element.name}` +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          + `</h5></span>
              </div>
            </div>
          </div>    `
        console.log("response result", responseJSON.results[0]);

      });
    }
    document.getElementById("cards-group").innerHTML = html;
  }

  xhr.open("GET", `https://www.superheroapi.com/api.php/586069776286026/search/${name}`, true);

  xhr.send();






}
//Show Details











const showDetails = function (id) {

  let detail = document.getElementById("details");
  console.log(detail);
  detail.style.visibility = "visible";
  console.log(id);
  const url = `https://www.superheroapi.com/api.php/586069776286026/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {

      console.log("data is :", data)

      let img = document.createElement('img');
      img.setAttribute('class', 'heroimg');
      img.setAttribute('src', `${data.image.url}`);
      detail.appendChild(img);


      let herodes = document.createElement('div');
      herodes.setAttribute('class', 'herodes');
      herodes.innerHTML = "<span class='des'> Name: " + `${data.name}` + "|</span> <span class='des'> Gender: " + `${data.appearance.gender}` + "|</span> <br> <span class='des'> Relatives: " + `${data.connections.relatives}` + "|</span> <br> <span class='des'> Work: " + `${data.work.occupation}` + "|</span> <br><br> <div class='herobtn'><a href='index.html'>Search More</a></div>";

      detail.appendChild(herodes);


    });
}


