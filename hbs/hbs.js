var view = "home";
var date = "0000.00.0";
var infoTxt = "";
var entTxt = "";
var newsTxt = "";

const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');

async function loadTextFiles() 
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
  }

function exitbutton()
{
    window.location.href = "../gxi50.html"+urlparam+"&skip=1";
}

class information
{
    constructor(name,title,text)
    {
        this.name = name;
        this.title = title;
        this.text = text;
    }
}

function ProcessText(page)
{
    var lines;

    if (page=="info")
        lines = infoTxt.split(/(?:\r\n|\r|\n)/g);
    else if (page=="govern")
        lines = governTxt.split(/(?:\r\n|\r|\n)/g);
    else if (page=="agencies")
        lines = agenciesTxt.split(/(?:\r\n|\r|\n)/g);
    else if (page=="military")
        lines = militaryTxt.split(/(?:\r\n|\r|\n)/g);
    else if (page=="tech")
        lines = techTxt.split(/(?:\r\n|\r|\n)/g);
    
    var n = parseInt(lines[0]);
    var i = 1; //current line number

    var sectionArray = [];

    for (var x = 0; x < n; x++)
    {
        i++; //ignore '---------------' separator
        var name = lines[i];
        i++;
        var title = lines[i];
        i++;
        var len = lines[i];  //Number of lines in text
        i++;
        var text = "";
        for (var j = 0; j < len; j++)
        {
            text = text + lines[i] + "<br>";
            i++;           
        }

        var info = new information(name, title, text);

        sectionArray.push(info);
    }

    return sectionArray;
}

function CreateButtons(info)
{
    var htmlStr = "";
    var yPos = 95;
    for (var i = 0; i < info.length; i++)
    {
        htmlStr += "<div class=\"hbsbuttonl\" onclick=\"loadPage(" + i.toString() + ");\" style=\"left:352px;top:"+yPos.toString()+"px;\">"
        htmlStr += info[i].name;   
        htmlStr += "</div>";
        yPos += 55;
    }

    return htmlStr;
}
