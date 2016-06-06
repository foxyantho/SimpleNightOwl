
var self = require("sdk/self");

var { ToggleButton } = require("sdk/ui/button/toggle");

var prefs = require('sdk/simple-prefs');
var setting = prefs.prefs;



function d(x){console.log(x);}



var button = ToggleButton({
    id: "simplenighttime-button",
    label: "my button",
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

}



function prefsEnabled( key )
{
    button.state('window', { checked: setting[key] }); //bool
}

prefs.on("enabled", prefsEnabled);






