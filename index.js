
var self = require("sdk/self");
var { ToggleButton } = require("sdk/ui/button/toggle");



var button = ToggleButton({
    id: "simplenighttime-button",
    label: "my button",

    icon: "./icons/svg/sunny-day.svg",
    onChange: changed
});

function changed(state) {
  button.badge = state.badge + 1;
  if (state.checked) {
    button.badgeColor = "#AA00AA";
  }
  else {
    button.badgeColor = "#00AAAA";
  }
  console.log(state);
}


setToolbarIcon(config.addon.state);


