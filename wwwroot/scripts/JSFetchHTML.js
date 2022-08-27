/*function makeHttpObjectR(url) {
    console.log("init");
    try { return new XMLHttpRequest(); }
    catch (error) {

        console.log(error);
    }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (error) {

        console.log(error);
    }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (error) {
        console.log(error);
    }

    throw new Error("Could not create HTTP request object.");
}
//"https://thepiratebay10.org/top/205"
var request = makeHttpObjectR();
request.open("GET", "https://thepiratebay10.org/top/205", true);
request.send(null);
request.onreadystatechange = function () {
    if (request.readyState == 4)
        console.log(request.responseText);

};*/