// ************ //
//              //
//  Constantes  //
//              //
// ************ //

const apiNYT = config.API_NYT;
const urlBaseNYT = config.URL_BASE_NYT;
const urlListNamesNYT = config.URL_LIST_NAMES_NYT;
const urlBooksOfListNYT = config.URL_BOOKS_OF_LIST_NYT;





// ******** //
//          //
//  Inicio  //
//          //
// ******** //

if (document.getElementById('loader') != null) {
  drawListNames();
}






// **************************** //
//                              //
//  Pinto el listado en el DOM  //
//                              //
// **************************** //

async function drawListNames() {
  await getListNamesNYT()
    .then(aListNames => {
      showHideLoader(true);

      // Guardo el nodo main donde incluiré las tarjetas
      let mainNode = document.getElementById('list__names');

      for (const list of aListNames) {

        // Dibujo la tarjeta
        let listCard = drawListCard(list);

        // La añado al main
        mainNode.appendChild(listCard);
      }
    });
}





// **************************************** //
//                                          //
//  Creo la tarjeta de una lista en el DOM  //
//                                          //
// **************************************** //

function drawListCard(oList) {
  let divCard = document.createElement('div');
  divCard.setAttribute('class', 'list__card');

  // Creo los elementos
  let pName = document.createElement('p');
  let pOldest = document.createElement('p');
  let pNewest = document.createElement('p');
  let pUpdated = document.createElement('p');
  let bReadMore = document.createElement('button');

  // Agrego los atributos
  pName.setAttribute('class', 'list__card__name');
  pOldest.setAttribute('class', 'list__card__oldest');
  pNewest.setAttribute('class', 'list__card__newest');
  pUpdated.setAttribute('class', 'list__card__updated');
  bReadMore.setAttribute('class', 'list__card__readmore');
  bReadMore.setAttribute('onClick', `drawBooksList('${oList.list_name_encoded}')`);

  // Relleno con los datos
  pName.innerHTML = oList.display_name;
  pOldest.innerHTML = `Oldest: ${oList.oldest_published_date}`;
  pNewest.innerHTML = `Newest: ${oList.newest_published_date}`;
  pUpdated.innerHTML = `Updated: ${oList.updated}`;
  bReadMore.innerHTML = 'Leer más';

  // Añado al divCard
  divCard.appendChild(pName);
  divCard.appendChild(pOldest);
  divCard.appendChild(pNewest);
  divCard.appendChild(pUpdated);
  divCard.appendChild(bReadMore);

  return divCard;
}





// ************************************************* //
//                                                   //
//  Pinto el listado de libros de un tema en el DOM  //
//                                                   //
// ************************************************* //

async function drawBooksList(listName) {
  await getBooksOfListNYT(listName)
    .then(aListBooks => {

      // Guardo el nodo main donde incluiré las tarjetas
      //TODO: Llamar al loader
      let mainNode = document.getElementById('list__names');
      mainNode.innerHTML = " ";

      for (const book of aListBooks) {

        // Dibujo la tarjeta
        let bookCard = drawBookCard(book);

        // La añado al main
        mainNode.appendChild(bookCard);
      }
    });
}




// *************************************** //
//                                         //
//  Creo la tarjeta de un libro en el DOM  //
//                                         //
// *************************************** //

function drawBookCard(oBook) {
  // TODO: Falta añadir el título de la lista y el botón volver que recarga el DOM
  let divCard = document.createElement('div');
  divCard.setAttribute('class', 'book__card');

  // Creo los elementos
  let pRankName = document.createElement('p');
  let imgCover = document.createElement('img');
  let pWeeks = document.createElement('p');
  let pDescription = document.createElement('p');
  let bAmazon = document.createElement('button');

  // Agrego los atributos
  pRankName.setAttribute('class', 'book__card__rankname');
  imgCover.setAttribute('class', 'book__card__cover');
  pWeeks.setAttribute('class', 'book__card__weeks');
  pDescription.setAttribute('class', 'book__card__description');
  bAmazon.setAttribute('class', 'book__card__readmore');
  // TODO: cambiar la función window.location = url;  window.open(url);
  //bAmazon.setAttribute('onClick', `drawBooksList('${oList.list_name_encoded}')`);

  // Relleno con los datos
  pRankName.innerHTML = `#${oBook.rank} ${oBook.book_details[0].title}`;
  imgCover.innerHTML = ` img`;
  pWeeks.innerHTML = `Weeks on list: ${oBook.weeks_on_list}`;
  pDescription.innerHTML = `${oBook.book_details[0].description}`;
  bAmazon.innerHTML = '<i class="fab fa-amazon"></i>';

  // Añado al divCard
  divCard.appendChild(pRankName);
  divCard.appendChild(imgCover);
  divCard.appendChild(pWeeks);
  divCard.appendChild(pDescription);
  divCard.appendChild(bAmazon);

  return divCard;
}






// ************************************ //
//                                      //
//  Libros de un listado de la API NYT  //
//                                      //
// ************************************ //

async function getBooksOfListNYT(listName) {
  try {
    let response = await fetch(`${urlBaseNYT}.json${apiNYT}${urlBooksOfListNYT}${listName}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}





// ***************** //
//                   //
//  Listado API NYT  //
//                   //
// ***************** //

async function getListNamesNYT() {
  try {
    let response = await fetch(`${urlBaseNYT}${urlListNamesNYT}${apiNYT}`);
    let data = await response.json();
    return data.results //[]
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}





// ******** //
//          //
//  Loader  //
//          //
// ******** //

function showHideLoader(visible) {
  if (!visible) {
    document.getElementById("list__names").style.visibility = "hidden";
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.display = "none";
    document.getElementById("list__names").style.visibility = "visible";
  }
}