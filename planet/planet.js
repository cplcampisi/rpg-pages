var view = "home";
var date = "0000.00.0";
var plistTxt = "";
var planetList = [];
var imperialTxt = "";
var quadTxt = "";
var regionTxt = "";
var pList = [];

const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');

function exitbutton()
{
    window.location.href = "../gxi50.html"+urlparam+"&skip=1";
}
  
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
    //------------------------------------------------
    //Clear all information
    document.getElementById("qtitle").innerHTML = "";
    document.getElementById("qmain").innerHTML = "";
    document.getElementById("qsizes").innerHTML = "";
    document.getElementById("qtypes").innerHTML = "";
    document.getElementById("qpops").innerHTML = "";
    document.getElementById("qcivs").innerHTML = "";
    document.getElementById("qfoot").innerHTML = "QUADRANT ";
    document.getElementById("qrightcol").innerHTML = "";
    //------------------------------------------------
    try
    {
      const response = await fetch("QUAD"+parseInt(n)+".TXT");
      quadTxt = await response.text();
      ProcessQuad(n);
    } catch (err) {
      console.error(err);
    }

}

async function loadRegion(name, n)
{
    regionTxt = "";
    //------------------------------------------------
    //Clear all information
    document.getElementById("rtitle").innerHTML = "";
    document.getElementById("rmain").innerHTML = "";
    document.getElementById("rsizes").innerHTML = "";
    document.getElementById("rtypes").innerHTML = "";
    document.getElementById("rpops").innerHTML = "";
    document.getElementById("rcivs").innerHTML = "";
    document.getElementById("rfoot").innerHTML = "";
    document.getElementById("rnotes").innerHTML = "";
    document.getElementById("rquad").innerHTML = "";
    document.getElementById("rrightcol").innerHTML = "";
    document.getElementById("rimage").style.backgroundImage="";
    //------------------------------------------------
    try
    {
      const response = await fetch("./quad"+parseInt(n)+"/"+name+".TXT");
      regionTxt = await response.text();
      ProcessRegion(name);
    } catch (err) {
      console.error(err);
    }
}

function loadPlanet(name)
{
    ProcessPlanet(name);
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

class planetDetail
{
    constructor(core, name, dName, vectors, size, type, pop, resources, civ, products, hazard, special, notes, region, quad, rName)
    {
        this.core = core;
        this.name = name;
        this.dName = dName;
        this.vectors=vectors;
        this.size = size;
        this.type = type;
        this.pop = pop;
        this.resources = resources;
        this.civ = civ;
        this.products = products;
        this.hazard = hazard;
        this.special = special;
        this.notes = notes;
        this.region = region;
        this.quad = quad;
        this.rName = rName;
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
    var vec0 = parseFloat(vecs[0]).toFixed(1);
    var vec1 = parseFloat(vecs[1]).toFixed(1);
    var vec2 = parseFloat(vecs[2]).toFixed(1);
    var v0 = vec0.toString();
    var v1 = vec1.toString();
    var v2 = vec2.toString();
    
    if (vec0 > 0)
        v0 = "+"+v0;
    if (vec1 > 0)
        v1 = "+"+v1;
    if (vec2 > 0)
        v2 = "+"+v2;
    
    mainText += "Vectors (x,y,z):" + space(12);
    mainText += v0 +", ";
    mainText += v1 +", ";
    mainText += v2 +"<br><br>";
    
    mainText += "Number of planets in quadrant:" + space(4) + nPlanets + "<br>";
    
    //------------------------------------------------
    // STATS
    //------------------------------------------------
    var sizeText =  "Sizes: <br><br>";
    
    var sizes = pSizes.split(" ");
    //3, 11, 7, 10;
    sizeText = sizeText + "planetoids:&nbsp;&nbsp;&nbsp;" + sizes[0] + "<br>";
    sizeText = sizeText + "small:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[1] + "<br>";
    sizeText = sizeText + "medium:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[2] + "<br>";
    sizeText = sizeText + "large:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[3] + "<br><br>";
    
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

    //Draw stats
    document.getElementById("qtitle").innerHTML = "QUADRANT " + romanNumeral(n);
    document.getElementById("qmain").innerHTML = mainText;
    document.getElementById("qsizes").innerHTML = sizeText;
    document.getElementById("qtypes").innerHTML = climText;
    document.getElementById("qpops").innerHTML = popText;
    document.getElementById("qcivs").innerHTML = civText;
    
    document.getElementById("qfoot").innerHTML = "QUADRANT " + romanNumeral(n);
    
    // xPos = 20 190 , yPos = 30 +55
    
    //------------------------------------------------
    // REGIONS
    //------------------------------------------------
    //line 8 is seperator
    var rList = [];
    var nRegions = parseInt(lines[9]);
    var i = 10; //starting line
    var xPos = 20;
    var yPos = 30;
    var column = 1;
    var buttons = "";
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
        i++;

        var lName = title.charAt(0) + ". of " + shortName(name);
        var r = new region(name, rName, title, type, lName);
        rList.push(r);
        
        buttons += "<div class='planetbuttons' style='left:"+xPos+"px;top:"+yPos+"px;' onclick='goRegion(\""+name+"\", "+parseInt(n)+");'>"+lName+"</div>";
        
        if (column==1)
        {
            xPos = 190;
            column = 2;
        }
        else
        {
            xPos = 20;
            yPos += 55;
            column = 1;
        }
    }
    //Add Unassigned button
    buttons += "<div class='planetbuttons' style='left:"+xPos+"px;top:"+yPos+"px;' onclick='goRegion(\"UNASSIGNED\", "+parseInt(n)+");'>UNASSIGNED</div>";
    
    document.getElementById("qrightcol").innerHTML = buttons;
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

function shortName(name)
{
    var n = name.split(" ");
    if (n.length<2)
        return name;
    
    var newName = n[0];
    switch(n[1].toUpperCase())
    {
        case "MAJOR":
            newName += "+";
        break;
        case "MINOR":
            newName += "-";
        break;
        case "ALPHA":
            newName += " A";
        break;
        case "BETA":
            newName += " B";
        break;
        case "GAMMA":
            newName += " G";
        break;
        case "PRIME":
            newName += " 1";
        break;
        default:
            newName = name;
        break;
    }
    return newName;
}

function ProcessRegion(returnName)
{
    var unassigned = false;
    var lines;
    lines = regionTxt.split(/(?:\r\n|\r|\n)/g);
    //alert(regionTxt);

    var name = lines[0];
    if (name == "UNASSIGNED")
        unassigned = true;
    var gov = lines[1];
    var quad = lines[2];
    var nPlanets = lines[3];
    
    if (!unassigned)
    {
        var nCore = lines[4];
        //place holder line
        var pSizes = lines[6];
        var pType = lines[7];
        var pPop = lines[8];
        var pCiv = lines[9];
        var notes = lines[10];
    }
    var mainText = "STATISTICS:<br><br>Number of planets:" + space(6) + nPlanets + "<br>";
    
    if (!unassigned)
    {
        //------------------------------------------------
        // STATS
        //------------------------------------------------
        var sizeText =  "Sizes: <br><br>";
        
        var sizes = pSizes.split(" ");
        //3, 11, 7, 10;
        sizeText = sizeText + "planetoids:&nbsp;&nbsp;&nbsp;" + sizes[0] + "<br>";
        sizeText = sizeText + "small:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[1] + "<br>";
        sizeText = sizeText + "medium:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[2] + "<br>";
        sizeText = sizeText + "large:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sizes[3] + "<br><br>";
        
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
        
        //Draw stats
        document.getElementById("rcore").style.visibility = "visible";
        document.getElementById("rnoncore").style.visibility = "visible";
        document.getElementById("rquad").innerHTML = "Q." + romanNumeral(parseInt(quad));
        document.getElementById("rtitle").innerHTML = gov + " of " + name;
        document.getElementById("rmain").innerHTML = mainText;
        document.getElementById("rsizes").innerHTML = sizeText;
        document.getElementById("rtypes").innerHTML = climText;
        document.getElementById("rpops").innerHTML = popText;
        document.getElementById("rcivs").innerHTML = civText;
        document.getElementById("rnotes").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + notes;
        document.getElementById("rfoot").innerHTML = gov + " of " + name;
    }
    else
    {
        //Draw stats
        document.getElementById("rcore").style.visibility = "hidden";
        document.getElementById("rnoncore").style.visibility = "hidden";
        document.getElementById("rquad").innerHTML = "Q." + romanNumeral(parseInt(quad));
        document.getElementById("rtitle").innerHTML = name;
        document.getElementById("rmain").innerHTML = mainText;
        document.getElementById("rfoot").innerHTML = "UNASSIGNED";
    }
    document.getElementById("rback").onclick = function() {goToQuad(parseInt(quad));}; 
    //--------------------------------------------------------------
    // Display constellation image
    if (!unassigned)
    {
        var picName = name.replace(/ /g, '_') + ".jpg"
        document.getElementById("rimage").style.backgroundImage="url(constellations/"+picName+")";
    }
    //--------------------------------------------------------------
    //Read planet information
    var i = 11;
    if (unassigned)
        i = 4;
    pList = [];
    var dMode = 1;  //display mode for buttons (core/non-core)
    if (unassigned)
        dMode = 2;
    var count = 1;
    var xPos = 10; //96, 182, 268
    var yPos = 44;
    var buttons = "";
    var column = 1;
    //core, name, dName, vectors, pSize, pType, pPop, resources, pCiv, products, hazard, special, pNotes
    for (var x=0;x<nPlanets;x++)
    {
        i++; //skip separator
        var core = lines[i];
        i++;
        var pName = lines[i];
        i++;
        var dName = lines[i];
        i++;
        var vectors = lines[i];
        i++;
        var pSize = lines[i];
        i++;
        var pType = lines[i];
        i++;
        var pPop = lines[i];
        i++;
        var resources = lines[i];
        i++;
        var mainResource = lines[i]; //not used
        i++;
        var pCiv = lines[i];
        i++;
        var products = lines[i];
        i++;
        var hazard = lines[i];
        i++;
        var special = lines[i];
        i++;
        var pNotes = lines[i];
        i++;
        var govName = gov + " of " + name;
        
        if (unassigned)
            govName = "N/A";

            
        var fName = pName.replace(/ /g, '_');
            
        var p = new planetDetail(core, pName, dName, vectors, pSize, pType, pPop, resources, pCiv, products, hazard, special, pNotes, govName, quad, returnName);
        
        pList[fName] = p;
        
        var linkName = shortName(pName);
        
        buttons += "<div class='planetbuttont' style='left:"+xPos+"px;top:"+yPos+"px;' onclick='goPlanet(\""+fName+"\");'>"+linkName+"</div>";
        
        if (dMode==1 && count>=nCore)
        {
            yPos = 275;
            dMode = 2;
        }
        else
        {
            count++;
            if (dMode==2)
            {
                if (column==1)
                {
                    xPos=96;
                    column=2;
                }
                else if (column==2)
                {
                    xPos=182;
                    column=3;
                }
                else if (column==3)
                {
                    xPos=268;
                    column=4;
                }
                else if (column==4)
                {
                    xPos=10;
                    yPos+=24;
                    column=1;
                }
            }
            else
            {
                yPos+=24;
            }
        }
    }
    
    document.getElementById("rrightcol").innerHTML = buttons;
}
//(core, pName, dName, vectors, pSize, pType, pPop, resources, pCiv, products, hazard, special, notes, region, quad);
//core, name, dName, vectors, size, type, pop, resources, civ, products, hazard, special, potes, region, quad
function ProcessPlanet(name)
{
    var pDetail = pList[name];

    document.getElementById("pquad").innerHTML = "Q." + romanNumeral(parseInt(pDetail.quad));

    document.getElementById("ptitle").innerHTML = pDetail.name;
    
    document.getElementById("pfoot").innerHTML = pDetail.name;
    
    var intro = "Affiliation:" + space(5) + pDetail.region +"<br><br><br>";
    
    var vectors = pDetail.vectors.split(",");
    var vec0 = parseFloat(vectors[0]).toFixed(3);
    var vec1 = parseFloat(vectors[1]).toFixed(3);
    var vec2 = parseFloat(vectors[2]).toFixed(3);
    var v0 = vec0.toString();
    var v1 = vec1.toString();
    var v2 = vec2.toString();
    
    if (vec0 > 0)
        v0 = "+"+v0;
    if (vec1 > 0)
        v1 = "+"+v1;
    if (vec2 > 0)
        v2 = "+"+v2;
        
    intro += "Coordinates (x,y,z):" + space(7) + v0 + "," + space(3) + v1 + "," + space(3) + v2;
    
    document.getElementById("pintro").innerHTML = intro;
    document.getElementById("pSize").innerHTML = pDetail.size;
    document.getElementById("pClimate").innerHTML = pDetail.type;
    document.getElementById("pPop").innerHTML = pDetail.pop;
    document.getElementById("pCiv").innerHTML = pDetail.civ;
    document.getElementById("pRes").innerHTML = pDetail.resources;
    if (pDetail.products.length == 0)
    {
        document.getElementById("pProdTitle").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("pProdTitle").style.visibility = "visible";
    }
    //Need to do this each time, as the innerHTML is not "blanked" between different pages
    document.getElementById("pProd").innerHTML = pDetail.products;
    
    var main = "";  
    if (pDetail.special!="none")
        main += "Notable:" + space(3) + pDetail.special + "<br>";
        
    if (pDetail.hazard!="none")
        main += "<br>Navigational hazards:" + space(3) + pDetail.hazard + "<br>";
        
    main += "<br>" + pDetail.notes;
        
    document.getElementById("pmain").innerHTML = main;

    document.getElementById("pback").onclick = function() {goRegion(pDetail.rName, parseInt(pDetail.quad));}; 
}
