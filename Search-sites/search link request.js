



function linkRequest(item) {
  let newItem = item.replace(/ /g, "%20");

  return newItem;
}




function linkRequestNyaa(item) {
  let newItem = item.replace(/ /g, "+").replace(/%20/g, "+");

  return newItem;
}




module.exports = {
  linkRequest,
  linkRequestNyaa,
};
