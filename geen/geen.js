var articles = []; // array to hold pages of individual article

//***************************************************************************
// GENERAL
//***************************************************************************
class article
{
    constructor(link, title, picture, text)
    {
        this.link = link;
        this.title = title;
        this.picture = picture;
        this.text = text;
    }
}

//*********************************************
// Load category
//*********************************************
async function LoadCategory(name)
{
    try
    {
      const response = await fetch(name+".txt");
      var categoryTxt = await response.text();
      ProcessCategory(categoryTxt);
    } catch (err) {
      console.error(err);
    }

}

//*********************************************
// Process category
//*********************************************
function ProcessCategory(catTxt)
{
    articles = [];
    var lines;
    lines = catTxt.split(/(?:\r\n|\r|\n)/g);

    var nArt = parseInt(lines[0]);
    var catTitle = lines[1];
    var catLink = lines[1];
    var catPic = lines[2];
    var nPara = parseInt(lines[3]);
    var text = "";
    var i = 4; //starting line
    for (var y=0; y<nPara; y++)
    {
        text = text + "&nbsp;&nbsp;&nbsp;&nbsp;" + lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>";
        i++;
    }
    var catText = text;

    for (var x=0;x<nArt;x++)
    {
        i++; //skip separator
        var link = lines[i];
        if (link.trim() == "BBBBBB")
        {
            var b = new article(link.trim(), "", "", "");
            articles.push(b);
            i++;
        }
        else
        {
            i++;
            var title = lines[i];
            i++;
            var picture = lines[i];
            i++;
            nPara = parseInt(lines[i]);
            i++;
            text = "";
            
            for (var y=0; y<nPara; y++)
            {
                text = text + "&nbsp;&nbsp;&nbsp;&nbsp;" + lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>";
                i++;
            }
            
            var p = new article(link, title, picture, text);
            articles.push(p);
        }
    }

    //Fill out category page:
    //catTitle, (no picture at moment), catText
    document.getElementById("catTitle").innerHTML=catTitle.toUpperCase();
    document.getElementById("catText").innerHTML=catText;
    var top = 5;
    var divStart = "<div class='shortlink' style='top:";
    var divEnd = "</div>";
    var linksHtml = "";
    for (var n=0;n<articles.length;n++)
    {
        //Handle separator
        if (articles[n].link=="BBBBBB")
        {
            //<div class="shortlink" style="top:155px;height:2px;border-bottom:2px solid;"></div>
            linksHtml += divStart + top.toString() + "px;height:2px;border-bottom:2px solid;'>" + divEnd;
            top += 10;
        }
        else
        {
            //<div class="shortlink" style="top:165px;" onclick="gotoArticle(1);">SEMI-AUTO PISTOL</div>
            linksHtml += divStart + top.toString() + "px;' onclick=gotoArticle(" + n.toString() + ");'>" + articles[n].link.toUpperCase() + divEnd;
            top += 30;
        }
    }

    document.getElementById("catLinks").innerHTML=linksHtml;    
}

//*********************************************
// Show article
//*********************************************
function ShowArticle(n, returnCat)
{
    // link, title, picture, text
    //artTitle, artText, artPic, artReturn
    document.getElementById("artTitle").innerHTML=articles[n].title.toUpperCase();
    document.getElementById("artText").innerHTML=articles[n].text;
    if (articles[n].picture.trim() != "")
        document.getElementById("artPic").style.backgroundImage="url(images/"+articles[n].picture+")";
    else
        document.getElementById("artPic").style.backgroundImage="none";

    document.getElementById("artReturn").onclick = function() {gotoCategory(returnCat);};
}