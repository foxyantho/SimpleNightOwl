
var self = require("sdk/self");

var { ToggleButton } = require("sdk/ui/button/toggle");

var prefs = require('sdk/simple-prefs');
var setting = prefs.prefs;

var pageMod = require("sdk/page-mod");



function d(x){console.log(x);}



var button = ToggleButton({
    id: "simplenighttime-button",
    label: "Enable/disable night theme",
    icon: "./icons/svg/sunny-day.svg",
    onChange: buttonChange
});


function buttonChange(state)
{
    if (state.checked) {
        console.log(state);
    }
}

function applyTheme()
{
    pageMod.PageMod({
        include: ["*"],
        contentStyleFile: './css.css'
    });
}



function prefsEnabled( key )
{
    button.state('window', { checked: setting[key] }); //bool
}

prefs.on("enabled", prefsEnabled);




