


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