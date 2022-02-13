var view = "home";
var date = "0000.00.0";
const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');
    
window.onload=function()  //executes when the page finishes loading
{
    var dates = document.getElementsByClassName("date");
    for (var i=0; i<dates.length; i++)
        dates[i].innerHTML=date;
}

function exitbutton()
{
    window.location.href = "../gxi50a.html"+urlparam;
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

    if (page=="history")
        lines = historyTxt.split('\n');
    else if (page=="govern")
        lines = governTxt.split('\n');
    else if (page=="agencies")
        lines = agenciesTxt.split('\n');
    else if (page=="military")
        lines = militaryTxt.split('\n');
    else if (page=="tech")
        lines = techTxt.split('\n');
    
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
    var yPos = 155;
    for (var i = 0; i < info.length; i++)
    {
        htmlStr += "<div class=\"ipinbuttonl\" onclick=\"loadPage(" + i.toString() + ");\" style=\"left:100px;top:"+yPos.toString()+"px;\">"
        htmlStr += info[i].name;   
        htmlStr += "</div>";
        yPos += 55;
    }

    return htmlStr;
}