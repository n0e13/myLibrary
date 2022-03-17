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
  bReadMore.setAttribute('onClick', `getBooksOfListNYT('${oList.list_name_encoded}')`);

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





// ************************************ //
//                                      //
//  Libros de un listado de la API NYT  //
//                                      //
// ************************************ //
// TODO_ hacerlo como el listado, llamar a una función que dibuje tras recibir el resultado del fetch
async function getBooksOfListNYT(listName) {
  try {
    let response = await fetch(`${urlBaseNYT}.json${apiNYT}${urlBooksOfListNYT}${listName}`);
    let data = await response.json();
    // TODO: Aquí no devuelve, lo envía a dibujar
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