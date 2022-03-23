var view = "login";
var textfield = 0;
var user = "";
var pass = "";
var option = "";
var caret = "&#x203A ";
var cursor = "&#x2588" ;
var date = "0000.00.0";

var papers = [];

class paper
{
    constructor(name, title, author, department, refNum, abstract)
    {
        this.name = name;
        this.title = title;
        this.author = author;
        this.department = department;
        this.refNum = refNum;
        this.abstract = abstract;
    }
}

const urlparam = window.location.search;
const urlParams = new URLSearchParams(urlparam);
if (urlParams.has('date'))
    date = urlParams.get('date');

function SetUser()
{
    var dates = document.getElementsByClassName("date");
    for (var i=0; i<dates.length; i++)
        dates[i].innerHTML=date;
        
    var users = document.getElementsByClassName("user");
    for (var i=0; i<users.length; i++)
        users[i].innerHTML="USER: "+user;
}

//Function for padding the front of number (string)
function pad(num, size)
{
    var s = "00" + num;
    return s.substr(s.length-size);
}

//*********************************************
// Functions for LOGIN
//*********************************************
function ActivateTextField (field)
{
    var fieldname ="";
    var text = "";
    switch (field)
    {
        case 0:
            fieldname = "username";
            user = "";
            text = caret + user + cursor;
            break;
        case 1:
            fieldname = "password";
            pass = "";
            text = caret + pass + cursor;
            break;
    }
    
    document.getElementById(fieldname).innerHTML=text;
}

function DeactivateTextField (field)
{
    var fieldname ="";
    var text = "";
    switch (field)
    {
        case 0:
            fieldname = "username";
            text = "&nbsp;&nbsp;" + user;
            break;
        case 1:
            fieldname = "password";
            text = "&nbsp;&nbsp;" + pass;
            break;
    }
    
    document.getElementById(fieldname).innerHTML=text;
}

function CheckPassword()
{
    var text = "";
    if (user.trim()=="TONY2" && pass.trim()=="SHEDS")
    {
        text = "LOGGING INTO SCIENCE PORTAL";
        setTimeout(function(){gotoPage("home");}, 2000);
    }
    else
    {
        text="INVALID CREDENTIALS<br>R TO RETRY | A TO ABORT";
        textfield = 4;
    }
    
    document.getElementById("logintext").innerHTML=text;
}

function ResetLogin()
{
    user = "";
    pass = "";
    document.getElementById("logintext").innerHTML="";
    document.getElementById("password").innerHTML=pass;
    textfield = 0;
    ActivateTextField(0);
}

//*********************************************
// Generic for handling Options
//*********************************************
function OptionInput(fieldname)
{
    var text = "";
    text = caret + option + cursor;
    
    document.getElementById(fieldname).innerHTML=text;
}

function CheckOption()
{
    if (view=="home")
    {
        switch (option)
        {
            case "A":
            case "D":
                gotoPage("select");
            break;
            case "Z":
                gotoPage("login");
            break;
            default:
                SetUser();
                option = "";
                OptionInput("homeinput");
            break;
        }
    }
    else if (view=="select")
    {
        switch (option)
        {
            case "H":
                gotoPage("home");
            break;
            case "M":
                
            break;
            default:
                //RetrieveListing(option);
                SetUser();
                option = "";
                OptionInput("selectinput");
            break;
        }
    }
}

//*********************************************
// Key press
//*********************************************
document.onkeydown = function(event)
{
    var charInput = event.keyCode;
    var newChar = charInput;
    var fieldname = "";
    var text = "";
    if((charInput >= 97) && (charInput <= 122))
    {
        if(!e.ctrlKey && !e.metaKey && !e.altKey)
            newChar = charInput - 32;
    }
    if (view=="login")
    {
        switch (textfield)
        {
            case 0:
                if (newChar == 13 || newChar == 9)
                {
                    textfield = 1;
                    DeactivateTextField(0);
                    ActivateTextField(textfield);
                    return;
                }
                else if (newChar == 8)
                    user = user.slice(0, -1);
                else
                    user += String.fromCharCode(newChar);
                    
                fieldname = "username";
                text = caret + user + cursor;
            break;
            case 1:
                if (newChar == 13)
                {
                    textfield = 2;
                    DeactivateTextField(1);
                    CheckPassword();
                    //ActivateTextField(textfield);
                    return;
                }
                else if (newChar == 8)
                    pass = pass.slice(0, -1);
                else
                    pass += String.fromCharCode(newChar);

                fieldname = "password";
                text = caret + pass + cursor;
            break;
            case 4:
                if (newChar == 82) //R
                {
                    ResetLogin();
                    return;
                }
                else if (newChar == 65) //A
                {
                    window.location.href = "../gxi50.html"+urlparam+"&skip=1";
                    return;
                }
            break;
            default:
                return;
            break;
        }
        document.getElementById(fieldname).innerHTML=text;
    }
    else if(view=="home")
    {
        if (newChar == 13)
        {
            CheckOption();
            //return;
        }
        else if (newChar == 8)
            option = option.slice(0, -1);
        else
            option += String.fromCharCode(newChar);
            
        OptionInput("homeinput");
    }
    else if(view=="select")
    {
        if (newChar == 13)
        {
            CheckOption();
            //return;
        }
        else if (newChar == 8)
            option = option.slice(0, -1);
        else
            option += String.fromCharCode(newChar);
            
        OptionInput("selectinput");
    }
}
//*********************************************
// Load select page
//*********************************************
function LoadSelect()
{
    switch(option)
    {
        case "D":
            LoadPapers();
        break;
        default:
        break;
    }
}
//*********************************************
// Load papers
//*********************************************
async function LoadPapers()
{
    try
    {
      const response = await fetch("uapaper.txt");
      var paperTxt = await response.text();
      ProcessPapers(paperTxt);
    } catch (err) {
      console.error(err);
    }

}
function ProcessPapers(paperTxt)
{
    var lines;
    lines = paperTxt.split(/(?:\r\n|\r|\n)/g);
    
    var nPapers = parseInt(lines[0]);
    var i = 1; //starting line
    for (var x=0;x<nPapers;x++)
    {
        i++; //skip separator
        var name = lines[i];
        i++;
        var title = lines[i];
        i++;
        var author = lines[i];
        i++;
        var department = lines[i];
        i++;
        var refNum = lines[i];
        i++;
        var nPara = parseInt(lines[i]);
        i++;
        var text = "";
        
        for (var y=0; y<nPara; y++)
        {
            text = text + lines[i] + "<br>";
            i++;
        }
        
        var p = new paper(name, title, author, department, refNum, text);
        papers.push(p);
    }
    
    var mainText = "RECENT PAPERS - <br><br>";
    mainText += "RECENTLY PUBLISHED PAPERS AND PAPERS OF NOTE ARE LISTED ON THIS SCREEN.  PLEASE CHOOSE A PAPER FROM THE LIST.  THIS SCREEN IS PERIODICALLY UPDATED AS NEW PAPERS BECOME AVAILABLE.";
    document.getElementById("mtext").innerHTML=mainText;
    
    setTimeout(function(){AddPaper(0);}, 200);
}

function AddPaper(n)
{
    if (n >= papers.length)
    {
        //Finished loading, set commands and option input.
        document.getElementById("commands").innerHTML="H - HOME SCREEN; M - MORE LISTINGS";
        option = "";
        OptionInput("selectinput");
        return;
    }

    var list =  document.getElementById("list").innerHTML;
    list += pad((n+1).toString(), 3);
    list += " - ";
    list += papers[n].name.toUpperCase();
    list += "<br>";
    document.getElementById("list").innerHTML=list;
    setTimeout(function(){AddPaper(n+1);}, 150);
}
