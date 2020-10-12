export const COLOR_RED = "#f44336";
export const COLOR_YELLOW = "#ffee58";
export const COLOR_GREEN = "#86c06c";
export const COLOR_BLUE = "#64b5f6";

export const DARK_THEME_BACKGROUND = "#121212";
export const DARK_THEME_CIRCLE = "#333333";

export const LIGHT_THEME_BACKGROUND = "#dddddd";
export const LIGHT_THEME_CIRCLE = "#cccccc";

export function setBackground(theme) {
  let background = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: DARK_THEME_BACKGROUND,
  };
  // Set to light theme.
  if (theme == "dark") {
    return background;
  } else {  // Set to dark theme otherwise.
    return {
      ...background,
      backgroundColor: LIGHT_THEME_BACKGROUND,
    };
  }
}

export function setCircle(theme) {
  let circle = {
    alignItems: "center",
    backgroundColor: DARK_THEME_CIRCLE,
    borderRadius: 180,
    height: 360,
    justifyContent: "center",
    width: 360,
  }
  if (theme == "dark") {
    return circle;
  } else { 
    return {
      ...circle,
      backgroundColor: LIGHT_THEME_CIRCLE,
    };
  }
}

export function setInstructionsTextColor(theme) {
  if (theme == "dark") {
    return "#eeeeee";
  } else { 
    return "#000000";
  }
}

