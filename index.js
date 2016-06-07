
var { ToggleButton } = require('sdk/ui/button/toggle');
var { PageMod } = require('sdk/page-mod');

var prefs = require('sdk/simple-prefs');

var data = require('sdk/self').data;


var page;


function Button()
{
    this.button = ToggleButton(
    {
        id: 'simplenighttime-button',
        label: 'Enable/disable night theme',
        icon: './icons/sunny-day.svg',
        onChange: buttonChange
    });
}
Button.prototype =
{
    constructor: Button,

    check: function()
    {
        this.button.label = 'Disable night theme',

        this.button.icon = './icons/half-moon.svg';
    },
    uncheck: function()
    {
        this.button.label = 'Enable night theme',

        this.button.icon = './icons/sunny-day.svg';
    }
}

var button = new Button();


var config =
{
    get theme() { return prefs.prefs['theme']; },
    set theme( value ) { prefs.prefs['theme'] = value; },
    
    get enabled() { return prefs.prefs['enabled']; },
    set enabled( value ) { prefs.prefs['enabled'] = value; }
}

if( config.enabled )
{
    button.check();

    applyTheme();
}


function applyOnEnabled()
{
    if( config.enabled )
    {
        button.check();

        applyTheme();
    }
    else
    {
        button.uncheck();

        removeTheme();
    }
}


// prefs change event

prefs.on('enabled', function( key ){
    applyOnEnabled();
});


function buttonChange(state)
{
    if( state.checked )
    {
        config.enabled = true;
    }
    else
    {
        config.enabled = false;
    }
}

function applyTheme()
{
    page = PageMod({
        include: ['*','about:*', 'file://*'], // * -> http, https, ftp, 
        contentStyleFile: './css/' + config.theme + '.css'
    });

    //console.log("page mod on");
}

function removeTheme()
{
    page.destroy();

    //console.log("page mod off");
}
