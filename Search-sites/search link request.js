



function linkRequest(item) {
  let newItem = item.replace(/ /g, "%20");

  return newItem;
}




function linkRequestNyaa(item) {
  let newItem = item.replace(/ /g, "+").replace(/%20/g, "+");

  return newItem;
}

function slashFAKE(item) {
  let newItem = item.replace(/\//g, "^");

  return newItem;
}

function slashREDIRECT(string, search, replace) {
  return string.split(search).join(replace);
}



module.exports = {
  linkRequest,
  linkRequestNyaa,
  slashFAKE,
  slashREDIRECT
};
