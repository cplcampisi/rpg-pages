var articles = []; //consider renaming (used for other list items).
var currentArt = 0;


//***************************************************************************
// GENERAL
//***************************************************************************
class article
{
    constructor(name, title, dateline, abstract, picture, text)
    {
        this.name = name;
        this.title = title;
        this.dateline = dateline;
        this.text = text;
        this.abstract = abstract;
        this.picture = picture;
    }
}


//*********************************************
// Load articles
//*********************************************
async function LoadArticles()
{
    try
    {
      const response = await fetch("gna1.txt");
      var artTxt = await response.text();
      ProcessArticles(artTxt);
    } catch (err) {
      console.error(err);
    }

}
function ProcessArticles(artTxt)
{
    articles = [];
    var lines;
    lines = artTxt.split(/(?:\r\n|\r|\n)/g);
    
    var nArt = parseInt(lines[0]);
    var i = 1; //starting line
    for (var x=0;x<nArt;x++)
    {
        i++; //skip separator
        var name = lines[i];
        i++;
        var title = lines[i];
        i++;
        var abstract = lines[i];
        i++;
        var picture = lines[i];
        i++;
        var dateline = lines[i];
        i++;
        var nPara = parseInt(lines[i]);
        i++;
        var text = "";
        
        for (var y=0; y<nPara; y++)
        {
            text = text + "&nbsp;&nbsp;&nbsp;&nbsp;" + lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>";
            i++;
        }
        
        var p = new article(name, title, dateline, abstract, picture, text);
        articles.push(p);
    }
    
    //Set headline
    if (articles.length<1)
    {
        document.getElementById("maintitle").innerHTML="no_source";
        return;
    }
    
    document.getElementById("maintitle").innerHTML=articles[0].name;
    document.getElementById("maintext").innerHTML=articles[0].abstract;
    var stories = "";
    c = 1;
    
    for (var n=1; n<articles.length; n++)
    {
        stories+= "<div class='fp_art' onclick='gotoArticle("+n.toString()+");'>";
        stories+=  "<div class='fp_title'>" + articles[n].name + "</div>";
        stories+=  "<div class='fp_text'>&nbsp;&nbsp;&nbsp;&nbsp;" + articles[n].abstract + "</div>";
        stories+= "</div>";
        
        if (n == 2)
        {
            document.getElementById("column1").innerHTML=stories;
            c++;
            stories="";
        }
        else if (n == 4)
        {
            document.getElementById("column2").innerHTML=stories;
            c++;
            stories="";
        }
    }
    
    //Check to see that all stories have been posted
    if (stories != "")
    {
        document.getElementById("column"+c.toString()).innerHTML=stories;
    }
}

//name, title, author, department, refNum, abstract
function ShowArticle(n)
{
    document.getElementById("arttitle").innerHTML=articles[n].title;
    if (articles[n].picture.trim() == "")
    {
        document.getElementById("artpicture").style.display="none";
    }
    else
    {
        document.getElementById("artpicture").style.backgroundImage="url(pictures/"+articles[n].picture+")";
        document.getElementById("artpicture").style.display="block";
    }
    document.getElementById("dateline").innerHTML=articles[n].dateline;
    document.getElementById("arttext").innerHTML=articles[n].text;
    //paginate the abstract -- kept for potential future consideration
    /*pages = papers[n].abstract.split("*-*-*");
    currentPage = 0;

    document.getElementById("arttext").innerHTML=pages[0];*/
}
