var view = "login";
var textfield = 0;
var user = "";
var pass = "";
var option = "";
var selectPage = "";
var caret = "&#x203A ";
var cursor = "&#x2588" ;
var date = "0000.00.0";

var papers = []; //consider renaming (used for other list items).
var pages = []; // array to hold pages of individual article
var currentPage;  //int to mark current page

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

//Function for checking if a value is numeric
function isNumeric(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
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
    document.getElementById(fieldname).innerHTML="";
    document.getElementById(fieldname).innerHTML=text;
}

function CheckOption()
{
    if (view=="home")
    {
        switch (option)
        {
            case "A":
            case "B":
            case "C":
            case "D":
                selectPage = option;
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
                if (isNumeric(option) && selectPage=="D")
                    RetrieveListing(option);
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
    else if(view=="article")
    {
        var char = String.fromCharCode(newChar)
        if (char == "R")
        {
            gotoPage("select");
        }
        else if (char == "N")
        {
            if (currentPage < pages.length-1)
            {
                currentPage++;
                document.getElementById("arttext").innerHTML=""; //clear before to prevent odd behavior
                document.getElementById("arttext").innerHTML=pages[currentPage];
            }
        }
        else if (char == "P")
        {
            if (currentPage > 0)
            {
                currentPage--;
                document.getElementById("arttext").innerHTML="";
                document.getElementById("arttext").innerHTML=pages[currentPage];
            }
        }
    }
}
//*********************************************
// Load select page
//*********************************************
function LoadSelect()
{
    switch(selectPage)
    {
        case "A":
            LoadPrograms();
        break;
        case "B":
            LoadBulletins();
        break;
        case "C":
            LoadFaculty();
        break;
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
    papers = [];
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
            text = text + lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>";
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

//name, title, author, department, refNum, abstract
function ShowPaper(n)
{
    document.getElementById("arttitle").innerHTML=("TITLE:&nbsp;&nbsp;" + papers[n].title.toUpperCase()).slice(0,65);
    document.getElementById("artlisting").innerHTML=("LISTING:&nbsp;&nbsp;" + papers[n].refNum.toUpperCase()).slice(0,34);
    document.getElementById("artauthor").innerHTML="AUTHOR(S):&nbsp;&nbsp;" + papers[n].author.toUpperCase();
    document.getElementById("artdept").innerHTML="DEPT:&nbsp;&nbsp;" + papers[n].department.toUpperCase();

    //paginate the abstract
    pages = papers[n].abstract.split("*-*-*");
    currentPage = 0;

    document.getElementById("arttext").innerHTML=pages[0];
    
    document.getElementById("artcommands").innerHTML="R - RETURN TO LISTINGS; N - NEXT PAGE; P - PREVIOUS PAGE";
}
//*********************************************
// Load programs
//*********************************************
function LoadPrograms()
{
    papers = [];

    var mainText = "PROGRAMS - <br><br>";
    mainText += "NO PROGRAMS ARE CURRENTLY AVAILABLE.";
    document.getElementById("mtext").innerHTML=mainText;
    
    //In this case the list is empty, do the following:
    document.getElementById("list").innerHTML=" XX";
    
    setTimeout(function(){AddPaper(1);}, 200);  //Should cause the return options to load.
}

//*********************************************
// Load bulletins
//*********************************************
function LoadBulletins()
{
    papers = [];
    var p = new paper("EVENTS", "", "", "", "", "");
    papers.push(p);
    p = new paper("RENTALS", "", "", "", "", "");
    papers.push(p);
    p = new paper("WANTED", "", "", "", "", "");
    papers.push(p);
    p = new paper("MUSIC", "", "", "", "", "");
    papers.push(p);
    p = new paper("SPORTS", "", "", "", "", "");
    papers.push(p);
    p = new paper("LOST/FOUND", "", "", "", "", "");
    papers.push(p);
    p = new paper("OTHER", "", "", "", "", "");
    papers.push(p);

    var mainText = "BULLETINS - <br><br>";
    mainText += " * TUITION DUE - 05.9<br>";
    mainText += " * LAST DAY TO SIGN UP FOR OFF-WORLD SUMMER ARCHAELOGY FIELD TRIP - 06.1<br>";
    mainText += " * STUDENT UNION ORIENTATION MEETING - 06.2<br>";
    
    document.getElementById("mtext").innerHTML=mainText;
    setTimeout(function(){AddPaper(0);}, 200);  //Should cause the return options to load.
}

//*********************************************
// Load Faculty / Staff
//*********************************************
function LoadBulletins()
{
    papers = [];
    var p = new paper("GENERAL ADMIN", "", "", "", "", "");
    papers.push(p);
    p = new paper("BURSAR'S OFFICE", "", "", "", "", "");
    papers.push(p);
    p = new paper("FACILITIES", "", "", "", "", "");
    papers.push(p);
    p = new paper("BUSINESS", "", "", "", "", "");
    papers.push(p);
    p = new paper("EDUCATION", "", "", "", "", "");
    papers.push(p);
    p = new paper("ENERGY", "", "", "", "", "");
    papers.push(p);
    p = new paper("ENGINEERING", "", "", "", "", "");
    papers.push(p);
    p = new paper("HUMANITIES & SCI", "", "", "", "", "");
    papers.push(p);
    p = new paper("LAW", "", "", "", "", "");
    papers.push(p);
    p = new paper("MEDICINE", "", "", "", "", "");
    papers.push(p);

    var mainText = "FACULTY/STAFF LISTINGS - <br><br>";
    mainText += " PLEASE MAKE A SELECTION FROM THE LIST AT LEFT TO SEE LISTINGS FOR THOSE SCHOOLS OR ADMINISTRATIVE BRANCHES<br><br>";
    mainText += " * GENERAL ASSISTANCE: #000<br>";
    mainText += " * BURSARS'S MAIN OFFICE: #005<br>";
    mainText += " * PRESIDENT'S OFFICE: #010<br>";
    mainText += " * SPORTS AND SPECIAL EVENTS: #112<br>";
    mainText += " * CAMPUS POLICE: #555 / (NON-EMERGENCY): #211/4<br>";
    
    document.getElementById("mtext").innerHTML=mainText;
    setTimeout(function(){AddPaper(0);}, 200);  //Should cause the return options to load.
}



//*********************************************
// Generic Functions related to the select page
//*********************************************
function ClearSelect()
{
    document.getElementById("selectinput").innerHTML="";
    document.getElementById("commands").innerHTML="";
    document.getElementById("list").innerHTML="";
    document.getElementById("mtext").innerHTML="";
}
function RetrieveListing(option)
{
    var o = parseInt(option);
    if (selectPage == "D")
    {
        if (o-1 < papers.length)
        {
            gotoPage("article");
            ShowPaper(o-1);
        }
    }
}

//Consider renaming to show list item, reused for other options.
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
