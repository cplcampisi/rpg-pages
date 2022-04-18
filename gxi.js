audioCtx = new(window.AudioContext || window.webkitAudioContext)();
function beep(volume, frequency, type, duration)
{
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    //oscillator.connect(gainNode);
    //gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    //gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
    oscillator.connect(gainNode);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    oscillator.start();

    setTimeout(
        function()
        {
            oscillator.stop();
        },
        duration
    );
};

//************************************************************************* 
//*************************************************************************
// VIEW0 (INTRO)
//*************************************************************************
//*************************************************************************
var vol = 0.1;
var ready;
var view = 0;
var urlparam = window.location.search;

function funca()
{
    document.getElementById("intro").style.display='block';
    startSnd();
    setTimeout(func0, 900);
}
function func0()
{
    document.getElementById("loadtext").style.visibility= 'hidden';
    setTimeout(func1, 400);
}
function func1()
{
    beep(vol, 100, "square", 400);
    document.getElementById("gxred").style.visibility= 'visible';
    document.getElementById("v0").style.visibility= 'visible';
    setTimeout(func2, 600);
}
function func2()
{
    beep(vol, 150, "square", 400);
    document.getElementById("iblue").style.visibility= 'visible';
    document.getElementById("v1").style.visibility= 'visible';
    setTimeout(func3, 600);
}
function func3()
{
    beep(vol, 200, "square", 380);
    document.getElementById("gxgreen").style.visibility= 'visible';
    document.getElementById("v2").style.visibility= 'visible';
    setTimeout(func4, 600);
}
function func4()
{
    beep(vol, 250, "square", 350);
    document.getElementById("igreen").style.visibility= 'visible';
    document.getElementById("v3").style.visibility= 'visible';
    document.getElementById("g0").style.visibility= 'visible';
    document.getElementById("g1").style.visibility= 'visible';
    document.getElementById("g2").style.visibility= 'visible';
    document.getElementById("g3").style.visibility= 'visible';
    setTimeout(func5, 600);
}
function func5()
{
    document.getElementById("begintext").style.visibility= 'visible';
    ready = true;
}

function go()
{
    view = 1;
    document.getElementById("intro").style.display= 'none';
    setTimeout(function(){document.getElementById("main").style.display= 'block';}, 200);
    start1();
    //window.location.href = "gxi50a.html"+urlparam;
}

//*************************************************************************
//*************************************************************************
// BEEPS
//*************************************************************************
//*************************************************************************
function startSnd()
{
    beep(vol, 220, "square", 200);
}
function successSnd()
{
    beep(vol, 350, "square", 150);
}
function errorSnd1()
{
    beep(vol, 170, "square", 150);
}

function errorSnd2()
{
    beep(vol, 150, "square", 150);
    beep(vol, 100, "square", 150);
}

//************************************************************************* 
//*************************************************************************
// VIEW1 (MAIN)
//*************************************************************************
//*************************************************************************
var connecting;
var sel;
var custom;
var network, page;
var connectErr;

function start1()  //executes when the page finishes loading
{
    connecting = false;
    custom = false;
    sel = 0;
    network = "";
    page = "";
    connectErr = false;
    setTimeout(func1a, 500);  //sets a timer which calls function func1 after 2,000 milliseconds = 2 secs.   
};
/*function start()
{
    document.getElementById("start").style.display='none';
    document.getElementById("main").style.display='block';
    setTimeout(func0, 1100);
}*/
function func1a()
{
    if (connecting)
        return;
    document.getElementById("selection").style.color='#A3A3A3';
    document.getElementById("selection").style.textDecoration='none';
    setTimeout(func2a, 500);
}
function func2a()
{
    if (connecting)
        return;
    document.getElementById("selection").style.color='#000000';
    document.getElementById("selection").style.textDecoration='underline';
    setTimeout(func1a, 500);
}
function reset()
{
    connecting = false;
    custom = false;
    network = "";
    page = "";
    connectErr = false;
    document.getElementById("customn").style.visibility='hidden';
    func2a();
}
function handleSelection()
{
    switch (sel)
    {
    case 0:  //Exit
        document.getElementById("message").innerHTML="EXITING . . .";
        beep(vol, 175, "square", 350);
        setTimeout(function(){window.location.href = "exited.html";},1000);
        break;
    case 1:  //IPIN
        network = "IPIN";
        page = "ipin/home.html";
        initConnection();
        break;
    case 2:  //HBS
        //connectErr = true;
        network = "HBS";
        page = "hbs/home.html";
        initConnection();
        break;
    case 3:  //GNA
        //connectErr = true;
        network = "GNA";
        page = "gna/gna.html";
        initConnection();
        break;
    case 4:  //Planet guide
        //connectErr = true;
        network = "PLANETS";
        page = "planet/planet.html";
        initConnection();
        break;
    case 6:  //Weapon guide
        //connectErr = true;
        network = "GEEN";
        page = "geen/geen.html";
        initConnection();
        break;
    case 9: //custom
        custom = true;
        document.getElementById("customn").style.visibility='visible';
        document.getElementById("customn").focus();
        break;
    default:
        //error selection
        errorSnd2();
        document.getElementById("message").innerHTML="*ERROR H32*";
        setTimeout(reset, 1000);
        break;
    }
}

function handleCustom()
{
    var customNetwork = document.getElementById("customn").value.toUpperCase();
    document.getElementById("customn").blur();
    var customHtml = "";
    
    if (customNetwork == "UARGOS")
    {
        //connectErr = true;
        customHtml = "uargos/uargos.html";
    }
    else
    {
        //error
        errorSnd2();
        document.getElementById("message").innerHTML="*ERROR H32*";
        setTimeout(reset, 1000);
        return;
    }
    network = customNetwork;
    page = customHtml;
    initConnection();
}

function initConnection()
{
    document.getElementById("message").innerHTML="CONNECTING TO "+network+" . . .";
    setTimeout(initTransfer, 1000);
}

function initTransfer()
{
    if (connectErr)
    {
        document.getElementById("message").innerHTML="ERROR CONNECTING TO "+network+" . . .";
        errorSnd2();
        setTimeout(reset, 1000);
    }
    else
    {
        document.getElementById("message").innerHTML="TRANSFERRING TO "+network+" . . .";
        successSnd();
        setTimeout(function(){window.location.href = page+urlparam;},1000);
    }
}

document.onkeydown = function(event)
{
    if (view==0)
    {
        if (ready)
        {
            successSnd();
            setTimeout(go, 200);
        }
    }
    else
    {
        var key_press = String.fromCharCode(event.keyCode);
        var key_code = event.keyCode;
        if (!connecting)
        {
            if ((parseInt(key_press)>=0 && parseInt(key_press)<=6) || parseInt(key_press)==9)
            {
                sel = parseInt(key_press);
                document.getElementById("selection").innerHTML=key_press;
            }
            else if (key_code==13)
            {
                //handle "enter"
                connecting = true;
                document.getElementById("selection").style.color='#870000';
                document.getElementById("selection").style.textDecoration='underline';
                handleSelection();
            }
            else if (key_code==8)
            {
                //handle "delete"
                sel = parseInt("0");
                document.getElementById("selection").innerHTML="0";
            }
            else
            {
                errorSnd1();
            }
        }
        else if (custom)
        {
            if (key_code==13)
            {
                //handle "enter"
                connecting = true;
                handleCustom();
            }
        }
    }
}
