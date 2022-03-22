var view = "login";
var textfield = 0;
var user = "";
var pass = "";
var option = "";
var caret = "&#x203A ";
var cursor = "&#x2588" ;
var date = "0000.00.0";

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
