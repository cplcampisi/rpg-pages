var view = "home";
var date = "0000.00.0";
var plistTxt = "";
var planetList = [];
var imperialTxt = "";

const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');

function exitbutton()
{
    window.location.href = "../gxi50.html"+urlparam+"&skip=1";
}

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

    //To provide a slight delay for effect
    setTimeout(ProcessPList, 1100);
}

async function loadImperialStats()
{
    try
    {
      const response = await fetch("IMPERIAL.TXT");
      imperialTxt = await response.text();
      ProcessImperialStats();
    } catch (err) {
      console.error(err);
    }

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

function space(n)
{
    var x = "";
    for (var i=0; i<n; i++)
        x+="&nbsp;";
    return x;
}

function ProcessPList()
{
    var lines;
    lines = plistTxt.split(/(?:\r\n|\r|\n)/g);
    
    var n = parseInt(lines[0]);
    
    if (n != lines.length-2)  //(plist.txt has a newline at the end)
        alert ("Planet List Length Mismatch!\nNumber of rows in file: " + parseInt(lines.length-2) + "\nShould be: " + parseInt(n));

    for (var i = 1; i < lines.length-1; i++)
    {
        var line = lines[i].split(" ");
        var p = new planet(line[1], line[3], line[4], line[2]);
        planetList.push(p);
    }

    document.getElementById("loadtext").style.display="none";
    document.getElementById("homebuttons").style.display="block";
}

function ProcessImperialStats()
{
    var lines;
    lines = imperialTxt.split(/(?:\r\n|\r|\n)/g);
    
    if (lines.length != 5)
    {
        alert("IMPERIAL.TXT incorrect number of lines: " + parseInt(lines.length));
        return;
    }
    
    var nPlanets = parseInt(lines[0]);
    var pSizes = parseInt(lines[1]);
    var pType = parseInt(lines[2]);
    var pPop = parseInt(lines[3]);
    var pCiv = parseInt(lines[4]);
    
    
    var text = "Number of planets:&nbsp;&nbsp;&nbsp;&nbsp;" + nPlanets + "<br><br>";
    
    text = text + "Sizes: <br><br>";
    
    var sizes = pSizes.split(" ");
    //3, 11, 7, 10;
    text = text + "planetoids:&nbsp;&nbsp;&nbsp;" + sizes[0]; + "<br>";
    text = text + "small:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[1]; + "<br>";
    text = text + "medium:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[2]; + "<br>";
    text = text + "large:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[3]; + "<br><br>";
    
    var types = pTypes.split(" ");
    
    //Climate types
    text = text + "Climate types: <br><br>";
    
    text = text + "temperate:" + space(3) + types[0]; + "<br>";
    text = text + "ice:" + space(16) + types[1]; + "<br>";
    text = text + "jungle:" + space(10) + types[2]; + "<br>";
    text = text + "water:" + space(11) + types[3]; + "<br>";
    text = text + "mountain:" + space(5) + types[4]; + "<br>";
    text = text + "volcanic:" + space(7) + types[5]; + "<br>";
    text = text + "desert:" + space(10) + types[6]; + "<br><br>";
    
    //Populations
    var pops = pPop.split(" ");
    text = text + "Pop. Density: <br><br>";
    
    text = text + "minimal:" + space(9) + pops[0]; + "<br>";
    text = text + "sparse:" + space(12) + pops[1]; + "<br>";
    text = text + "moderate:" + space(7) + pops[2]; + "<br>";
    text = text + "dense:" + space(14) + pops[3]; + "<br><br>";
    
    //Civilization types
    var civs = pCiv.split(" ");
    text = text + "Civ. Types: <br><br>";
    
    text = text + "outpost:" +              space(18) + civs[0]; + "<br>";
    text = text + "industrial:" +           space(14) + civs[1]; + "<br>";
    text = text + "ind./agricultural:" +    space(2) + civs[2]; + "<br>";
    text = text + "agricultural:" +         space(10) + civs[3]; + "<br>";
    text = text + "mercantile:" +           space(12) + civs[4]; + "<br>";
    text = text + "mixed:" +                space(19) + civs[5]; + "<br>";
    text = text + "primitive:" +            space(14) + civs[6]; + "<br>";

    document.getElementById("impstats").innerHTML = text;
}

