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
            <td>${city[i].acreage}</td>
            <td>${city[i].population}</td>
            <td>${city[i].GDP}</td>
            <td>${city[i].description}</td>
            <td>${city[i].country.name}</td>
            <td><button type="button" onclick="deleteCity(${city[i].id})">Delete</button></td>
            <td><button type="button" data-toggle="modal" data-target="#myModal" onclick="showEditForm(${city[i].id})">Edit</button>
            </td>
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
                content+=`<option value="${country[i].id}">${country[i].name}</option>`
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

    cityForm.append('name',name);
    cityForm.append('image',image.prop('files')[0]);
    cityForm.append('acreage',acreage);
    cityForm.append('population',population);
    cityForm.append('gdp',gdp);
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
        success:showAllCity
    });
    //chan su kien mac dinh cua the de k load lai trang
    event.preventDefault();
}

function updateBook(id){
//lay du lieu
    let name = $(`#newNameCity`).val();
    let image = $(`#newImage`)
    let price = $(`#newPrice`).val();
    let author = $(`#newAuthor`).val();
    let category = $(`#newCategory`).val();
    let avatar = $(`#newAvatar`);
    let bookForm = new FormData();

    //tao doi tuong
    bookForm.append('name',name);
    bookForm.append('price',price);
    bookForm.append('author',author);
    bookForm.append('category',category);
    bookForm.append('avatar',avatar.prop('files')[0]);
    if (avatar.prop('files')[0]===undefined){
        let file = new File([""],"filename.jpg")
        bookForm.append('avatar',file);
    }else {
        bookForm.append('avatar',avatar.prop('files')[0]);
    }


    $.ajax({

        type:"POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        //du lieu gui len
        data: bookForm,
        //ten API
        url:`http://localhost:8080/books/${id}`,
        success:function (){
            alert("sua thanh cong");
            showAllBook();
        }
    })
    //chan su kien mac dinh cua the de k load lai trang
}

function deleteBook(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/books/${id}`,
        success:showAllBook
    })
}
function showEditForm(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/books/${id}`,
        success:function (book){
            $(`#newName`).val(book.name)
            $(`#newPrice`).val(book.price)
            $(`#newAuthor`).val(book.author)
            $(`#newCategory`).val(book.category.name)
            let img = `<img src="${'http://localhost:8080/avatar/' + book.avatar}" width="100px">`
            $(`#showAvatar`).html(img)
            let update = `<button onclick="updateBook(${book.id})" data-bs-toggle="modal" data-bs-target="#myModal">Update</button>`
            $(`#update`).html(update)
        }
    })
    // showCategory();
}
$(document).ready(showAllBook())