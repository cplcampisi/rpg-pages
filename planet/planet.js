var view = "home";
var date = "0000.00.0";
var plistTxt = "";
var planetList = [];
var entTxt = "";
var newsTxt = "";

const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');

/*async function loadTextFiles()
{
    try 
    {
      const response = await fetch("hbsinfo.txt");
      infoTxt = await response.text();
    } catch (err) {
      console.error(err);
    }

    try 
    {
      const response = await fetch("hbsent.txt");
      entTxt = await response.text();
    } catch (err) {
      console.error(err);
    }

    try 
    {
      const response = await fetch("hbsnews.txt");
      newsTxt = await response.text();
    } catch (err) {
      console.error(err);
    }
  }*/
  
async function loadPlanetFile()
{
    try
    {
      const response = await fetch("PLIST.txt");
      plistTxt = await response.text();
    } catch (err) {
      console.error(err);
    }

    ProcessPList();
}

function exitbutton()
{
    window.location.href = "../gxi50.html"+urlparam+"&skip=1";
}

class planet
{
    constructor(name, rName, rTitle, quad)
    {
        this.name = name;
        this.rName = rName;
        this.rTitle = rTitle;
        this.quad = quad;
    }
}

function ProcessPList()
{
    var lines;
    lines = plistTxt.split(/(?:\r\n|\r|\n)/g);
    
    var n = parseInt(lines[0]);
    
    if (n != lines.length-1)
        alert ("Planet List Length Mismatch!\nNumber of rows in file: " + parseInt(lines.length-1) + "\nShould be: " + parseInt(n));

    for (var i = 1; i < lines.length; i++)
    {
        var line = lines[i].split(" ");
        var p = new planet(line[1], line[3], line[4], line[2]);
        planetList.push(p);
    }

    alert(planetList.length);
    document.getElementById("loadtext").style.display="none";
    document.getElementById("homebuttons").style.display="block";
}

