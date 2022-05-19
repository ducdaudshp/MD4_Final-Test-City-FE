function showAllCity(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city/list",
        success : function (city){
            let content ="";
            for (let i=0;i<city.length;i++){
                content +=`<tr>
            <th scope="row">${i+1}</th>
            <td>${city[i].nameCity}</td>
            <td><img src="${'http://localhost:8080/image/' + city[i].image}" width="100px"></td>
           
            <td>${city[i].country.nameCountry}</td>
            <td><button type="button" onclick="deleteCity(${city[i].id})" class="btn btn-danger" >Delete</button></td>
            <td><button type="button" data-toggle="modal" data-target="#myModal" onclick="showEditForm(${city[i].id})" class="btn btn-danger">Edit</button></td>
            <td><button type="button" onclick="showDetailForm(${city[i].id})" class="btn btn-primary" data-toggle="modal" data-target="#myModal2">Detail</button></td>
            </tr>`
            }
            $("#list-city").html(content);
        }
    })
}
showAllCity();


function showCountry(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/country",
        success:function (country){
            let content="";
            for (let i=0; i<country.length; i++){
                content+=`<option value="${country[i].id}">${country[i].nameCountry}</option>`
            }
            $("#country").html(content);
            $("#newCountry").html(content);
        }
    })
}
showCountry();

function createCity(){
    //lay du lieu
    let name = $("#nameCity").val();
    let image = $("#image");
    let acreage = $("#acreage").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();
    let country = $ ("#country").val();

    let cityForm = new FormData();

    cityForm.append('nameCity',name);
    cityForm.append('image',image.prop('files')[0]);
    cityForm.append('acreage',acreage);
    cityForm.append('population',population);
    cityForm.append('GDP',gdp);
    cityForm.append('description',description);
    cityForm.append('country',country);


    //goi api tao moi
    $.ajax({

        type:"POST",
        enctype:'multipart/form-data',
        processData:false,
        contentType:false,
        //du lieu gui len
        data: cityForm,
        //ten API
        url:"http://localhost:8080/city",
        success:function (){
            alert("tao moi thanh cong");
            showAllCity();
        }
    });
    //chan su kien mac dinh cua the de k load lai trang
    event.preventDefault();
}

function deleteCity(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/city/${id}`,
        success:showAllCity
    })
}

function updateCity(id){
//lay du lieu
    let name = $(`#newNameCity`).val();
    let image = $(`#newImage`)
    let acreage = $(`#newAcreage`).val();
    let population = $(`#newPopulation`).val();
    let gdp = $(`#newGdp`).val();
    let description = $(`#newDescription`).val();
    let country = $(`#newCountry`).val();
    let cityForm = new FormData();

    //tao doi tuong
    cityForm.append('nameCity',name);
    cityForm.append('image',image.prop('files')[0]);
    cityForm.append('acreage',acreage);
    cityForm.append('population',population);
    cityForm.append('GDP',gdp);
    cityForm.append('description',description);
    cityForm.append('country',country);
    if (image.prop('files')[0]===undefined){
        let file = new File([""],"filename.jpg")
        image.append('image',file);
    }else {
        image.append('image',image.prop('files')[0]);
    }


    $.ajax({

        type:"POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        //du lieu gui len
        data: cityForm,
        //ten API
        url:`http://localhost:8080/city/${id}`,
        success:function (){
            alert("sua thanh cong");
            showAllCity();
        }
    })
    event.preventDefault();
}


function showEditForm(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/${id}`,
        success:function (city){
            $(`#newNameCity`).val(city.nameCity)
            let img = `<img src="${'http://localhost:8080/image/' + city.image}" width="100px">`
            $(`#newAcreage`).val(city.acreage)
            $(`#newPopulation`).val(city.population)
            $(`#newGdp`).val(city.gdp)
            $(`#newDescription`).val(city.description)
            $(`#newCountry`).val(city.country.name)

            $(`#showImage`).html(img)
            let update = `<button onclick="updateCity(${city.id})" data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn-primary">Update</button>`
            $(`#update`).html(update)
        }
    })
    showCountry();
}

function showDetailForm(id){

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success:function (city){
            $(`#d-nameCity`).val(city.nameCity)
            $(`#d-acreage`).val(city.acreage)
            $(`#d-population`).val(city.population)
            $(`#d-gdp`).val(city.gdp)
            $(`#d-description`).val(city.description)
            $(`#d-country`).val(city.country.nameCountry)
        }
    })
}



