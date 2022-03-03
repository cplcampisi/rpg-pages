var view = "home";
var date = "0000.00.0";
var plistTxt = "";
var planetList = [];
var imperialTxt = "";
var quadTxt = "";

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

async function loadQuad(n)
{
    quadTxt = "";
    try
    {
      const response = await fetch("QUAD"+parseInt(n)+".TXT");
      quadTxt = await response.text();
      ProcessQuad(n);
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

class region
{
    constructor(name, rName, rTitle, type, lName)
    {
        this.name = name;
        this.rName = rName;
        this.rTitle = rTitle;
        this.type = type;
        this.lName = lName;
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
    
    var nPlanets = lines[0];
    var pSizes = lines[1];
    var pType = lines[2];
    var pPop = lines[3];
    var pCiv = lines[4];
    
    
    var text = "Number of planets:&nbsp;&nbsp;&nbsp;&nbsp;" + nPlanets + "<br><br>";
    
    text = text + "Sizes: <br><br>";
    
    var sizes = pSizes.split(" ");
    //3, 11, 7, 10;
    text = text + "planetoids:&nbsp;&nbsp;&nbsp;" + sizes[0] + "<br>";
    text = text + "small:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[1] + "<br>";
    text = text + "medium:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[2] + "<br>";
    text = text + "large:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[3] + "<br><br>";
    
    var types = pType.split(" ");
    
    //Climate types
    text = text + "Climate types: <br><br>";
    
    text = text + "temperate:" + space(3) + types[0] + "<br>";
    text = text + "ice:" + space(16) + types[1] + "<br>";
    text = text + "jungle:" + space(10) + types[2] + "<br>";
    text = text + "water:" + space(11) + types[3] + "<br>";
    text = text + "mountain:" + space(5) + types[4] + "<br>";
    text = text + "volcanic:" + space(7) + types[5] + "<br>";
    text = text + "desert:" + space(10) + types[6] + "<br><br>";
    
    //Populations
    var pops = pPop.split(" ");
    text = text + "Pop. Density: <br><br>";
    
    text = text + "minimal:" + space(9) + pops[0] + "<br>";
    text = text + "sparse:" + space(12) + pops[1] + "<br>";
    text = text + "moderate:" + space(7) + pops[2] + "<br>";
    text = text + "dense:" + space(14) + pops[3] + "<br><br>";
    
    //Civilization types
    var civs = pCiv.split(" ");
    text = text + "Civ. Types: <br><br>";
    
    text = text + "outpost:" +              space(18) + civs[0] + "<br>";
    text = text + "industrial:" +           space(14) + civs[1] + "<br>";
    text = text + "ind./agricultural:" +    space(2) + civs[2] + "<br>";
    text = text + "agricultural:" +         space(10) + civs[3] + "<br>";
    text = text + "mercantile:" +           space(12) + civs[4] + "<br>";
    text = text + "mixed:" +                space(19) + civs[5] + "<br>";
    text = text + "primitive:" +            space(14) + civs[6] + "<br>";

    document.getElementById("impstats").innerHTML = text;
}

function ProcessQuad(n)
{
    var lines;
    lines = quadTxt.split(/(?:\r\n|\r|\n)/g);

    var quad = lines[0];
    var vectors = lines[1];
    //blank line
    var nPlanets = lines[3];
    var pSizes = lines[4];
    var pType = lines[5];
    var pPop = lines[6];
    var pCiv = lines[7];
    
    var mainText = "QUADRANT STATISTICS:<br><br>";
    var vecs = vectors.split(" ");
    mainText += "Vectors (x,y,z):";
    mainText += vecs[0] +", ";
    mainText += vecs[1] +", ";
    mainText += vecs[2] +"<br>";
    
    mainText += "Number of planets in quadrant:" + space(4) + nPlanets + "<br>";
    
    //------------------------------------------------
    // STATS
    //------------------------------------------------
    var sizeText =  "Sizes: <br><br>";
    
    var sizes = pSizes.split(" ");
    //3, 11, 7, 10;
    sizeText = sizeText + "planetoids:&nbsp;&nbsp;&nbsp;" + sizes[0] + "<br>";
    sizeText = sizeText + "small:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[1] + "<br>";
    sizeText = sizeText + "medium:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[2] + "<br>";
    sizeText = sizeText + "large:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[3] + "<br><br>";
    
    //Climate types
    var types = pType.split(" ");
    var climText = "Climate types: <br><br>";
    
    climText = climText + "temperate:" + space(3) + types[0] + "<br>";
    climText = climText + "ice:" + space(16) + types[1] + "<br>";
    climText = climText + "jungle:" + space(10) + types[2] + "<br>";
    climText = climText + "water:" + space(11) + types[3] + "<br>";
    climText = climText + "mountain:" + space(5) + types[4] + "<br>";
    climText = climText + "volcanic:" + space(7) + types[5] + "<br>";
    climText = climText + "desert:" + space(10) + types[6] + "<br><br>";
    
    //Populations
    var pops = pPop.split(" ");
    var popText = "Pop. Density: <br><br>";
    
    popText = popText + "minimal:" + space(9) + pops[0] + "<br>";
    popText = popText + "sparse:" + space(12) + pops[1] + "<br>";
    popText = popText + "moderate:" + space(7) + pops[2] + "<br>";
    popText = popText + "dense:" + space(14) + pops[3] + "<br><br>";
    
    //Civilization types
    var civs = pCiv.split(" ");
    var civText = "Civ. Types: <br><br>";
    
    civText = civText + "outpost:" +              space(18) + civs[0] + "<br>";
    civText = civText + "industrial:" +           space(14) + civs[1] + "<br>";
    civText = civText + "ind./agricultural:" +    space(2) + civs[2] + "<br>";
    civText = civText + "agricultural:" +         space(10) + civs[3] + "<br>";
    civText = civText + "mercantile:" +           space(12) + civs[4] + "<br>";
    civText = civText + "mixed:" +                space(19) + civs[5] + "<br>";
    civText = civText + "primitive:" +            space(14) + civs[6] + "<br>";

    //------------------------------------------------
    // REGIONS
    //------------------------------------------------
    //line 8 is seperator
    var rList = [];
    var nRegions = parseInt(lines[9]);
    var i = 10; //starting line
    for (var x=0;x<nRegions;x++)
    {
        i++; //skip separator
        var name = lines[i];
        i++;
        var rName = lines[i];
        i++;
        var title = lines[i];
        i++;
        var type = lines[i];

        var lName = title.charAt(0) + ". of " + rName;
        var r = new region(name, rName, title, type, lName);
        rList.push(r);
    }
    
    document.getElementById("qtitle").innerHTML = "QUADRANT " + romanNumeral(n);
    document.getElementById("qmain").innerHTML = mainText;
    document.getElementById("qsizes").innerHTML = sizeText;
    document.getElementById("qtypes").innerHTML = climText;
    document.getElementById("qpops").innerHTML = popText;
    document.getElementById("qcivs").innerHTML = civText;
    
    document.getElementById("qfoot").innerHTML = "QUADRANT " + romanNumeral(n);
}

function romanNumeral(n)
{
    var numeral = "";
    switch(n)
    {
        case 1:
            numeral = "I";
        break;
        case 2:
            numeral = "II";
        break;
        case 3:
            numeral = "III";
        break;
        case 4:
            numeral = "IV";
        break;
        case 5:
            numeral = "V";
        break;
        case 6:
            numeral = "VI";
        break;
        case 7:
            numeral = "VII";
        break;
        case 8:
            numeral = "VIII";
        break;
    }
    
    return numeral;
}

