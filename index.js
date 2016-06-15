
var { ToggleButton } = require('sdk/ui/button/toggle');
var { PageMod } = require('sdk/page-mod');

var prefs = require('sdk/simple-prefs');



function Button()
{
    this.button = ToggleButton(
    {
        id: 'simplenightowl-button',
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
        this.button.label = 'Disable night theme';

        this.button.icon = './icons/half-moon.svg';

        this.button.checked = true;
    },
    uncheck: function()
    {
        this.button.label = 'Enable night theme';

        this.button.icon = './icons/sunny-day.svg';

        this.button.checked = false;
    }
}

var button = new Button();

var page;


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



// prefs change event

prefs.on('enabled', function( key )
{
    if( config.enabled )
    {
        applyTheme();

        button.check();
    }
    else
    {
        removeTheme();

        button.uncheck();
    }
});

// theme change event

prefs.on('theme', function( key )
{
    if( config.enabled )
    {
        removeTheme();

        applyTheme();
    }
});


function buttonChange( state )
{
    config.enabled = !config.enabled;
}

function applyTheme()
{
    page = PageMod({
        include: ['*','about:*', 'file://*'], // * -> http, https, ftp, 
        contentStyleFile: './css/' + config.theme + '.css',
        attachTo: ['existing', 'top']
    });

    //console.log("page mod on");
}

function removeTheme()
{
    page.destroy();

    //console.log("page mod off");
}
