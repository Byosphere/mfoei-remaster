export const PAD_A = 0;
export const PAD_B = 1;
export const PAD_UP = 12;
export const PAD_DOWN = 13;
export const PAD_LEFT = 14;
export const PAD_RIGHT = 15;
export const PAD = 'pad';
export const KEYBOARD = 'keyboard';
export const DEBUG = false;

// Game loader
export const LOADER_BACKGROUND = "#252525";

// Main menu
export const MAIN_MENU_PLAY_BUTTON_WIDTH = 264;
export const MAIN_MENU_PLAY_BUTTON_HEIGHT = 72;
export const MAIN_MENU_LOGO_SCALE_FACTOR = 3;
export const MAIN_MENU_PLAY_BUTTON_OFFSET_Y = 300;
export const MAIN_MENU_PLAY_BUTTON_FONT_SIZE = "32px";
export const MAIN_MENU_PLAY_BUTTON_FONT_FAMILY = "uni0553";
export const MAIN_MENU_PLAY_BUTTON_TEXT_COLOR = "#fff";
export const QUICK_PLAY = 'quick_play';

//character select screen
export const ROOSTER_WIDTH = 4;
export const ROOSTER_HEIGHT = 2;
export const ROOSTER_BASEX = 12;
export const ROOSTER_BASEY = 76;
export const ROOSTER_SIZE = 8;
export const CURSOR_UP = 6;
export const CURSOR_DOWN = 7;
export const CURSOR_LEFT = 8;
export const CURSOR_RIGHT = 9;
export const CURSOR_STEP = 128;
export const INIT_CURSOR_TOP = 68;
export const INIT_CURSOR_LEFT = 4;
export const AVATAR_UNKNOWN = 16;

// Scene
/* Countdown */
export const DURATION = 90;
export const COUNTDOWN_FONT_SIZE = "72px";
export const COUNTDOWN_FONT_FAMILY = "uni0553";
export const COUNTDOWN_TEXT_COLOR = "#8B3F8B";
export const COUNTDOWN_TEXT_SHADOW_COLOR = "rgba(163, 73, 164, 0.7)";
export const COUNTDOWN_TEXT_SHADOW_X = 4;
export const COUNTDOWN_TEXT_SHADOW_Y = 4;
export const COUNTDOWN_TEXT_SHADOW_BLUR = 7;

/* Health bar */
export const HEALTH_BAR_WIDTH = 540;
export const HEALTH_BAR_HEIGHT = 48;

/* Wave list */
export const SINUS = [9,9,9,9,8,8,7,6,4,2,1,1,0,0,0,0,0,0,0,0,1,1,2,4,6,7,8,8,9,9,9,9,
  9,9,9,9,8,8,7,6,4,2,1,1,0,0,0,0,0,0,0,0,1,1,2,4,6,7,8,8,9,9,9,9];
export const SAW = [9,8,8,7,7,6,5,5,4,4,3,2,2,1,1,0,9,8,8,7,7,6,5,5,4,4,3,2,2,1,1,0,
  9,8,8,7,7,6,5,5,4,4,3,2,2,1,1,0,9,8,8,7,7,6,5,5,4,4,3,2,2,1,1,0];
export const SMALLSAW = [0,5,4,4,3,2,2,1,1,5,4,4,3,2,2,1,1,5,4,4,3,2,2,1,1,5,4,4,3,2,2,1,1,
  5,4,4,3,2,2,1,1,5,4,4,3,2,2,1,1,5,4,4,3,2,2,1,1,5,4,4,3,2,2,1];
export const SMALLSINUS = [5,5,4,3,2,1,0,0,0,0,1,2,3,4,5,5,5,5,4,3,2,1,0,0,0,0,1,2,3,4,5,5,
  5,5,4,3,2,1,0,0,0,0,1,2,3,4,5,5,5,5,4,3,2,1,0,0,0,0,1,2,3,4,5,5];

/* Menu variables */
export const WAVEMENU_Y = 480;
export const COMBO_COLORS = ['#790CE8', '#04756F', '#FF8C00', '#FF2D00', '#D90000'];

/* Player variables */
export const PLAYER1X = 308;
export const PLAYER1Y = 400;
export const PLAYER2X = 824;
export const PLAYER2Y = 400;
export const PLAYER_NAME_FONT_SIZE = "24px";
export const PLAYER_NAME_FONT_FAMILY = "uni0553";
export const PLAYER_NAME_TEXT_COLOR = "#fff";
export const LIFE_FONT_SIZE = "32px";
export const LIFE_FONT_FAMILY = "uni0553";
export const LIFE_TEXT_COLOR = "#fff";
export const PLAYER_ACTIONS_INTERVAL = 500;
export const WAIT = 1;
export const STRONGHIT = 2;
export const DEFENSE = 3;
export const WEAKHIT = 4;

/* Waves variables */
export const LARGESPRITEX = 0;
export const LARGESPRITEY = 200;
export const ATK = 1;
export const HEAL = 2;
export const WAVEWIDTH = 256;
export const WAVEHEIGHT = 52;
export const FRAMESTEP = 4;
export const FRAMECOUNTSTEP = 3; // On avance de 1 groupe de FRAMESTEP pixels toutes les FRAMECOUNTSTEP frames
export const WAVE_TEXT_POSX = 50;
export const WAVE_TEXT_POSY = 50;
export const WAVE_FONT_SIZE = '20px';
export const WAVE_FONT_FAMILY = 'arial';
export const WAVE_TEXT_COLOR = '#FF0000';
export const WAVE_TEXT_ALIGN = 'left'
export const WAVE_RESET_DELAY = 2000;
export const LOCK_WAVE_SELECTION_DELAY = 300;
export const WAVE_BIG_POSX = 120;
export const WAVE_BIG_POSY = 200;
export const WAVE_BIG_WIDTH = 1280;
export const WAVE_BIG_HEIGHT = 208;
export const WAVE_CROP_RECTANGLE = 48;
export const WAVE_JAUGE_BASE_HEIGHT = 28;

// Waves states
export const WAVE_DEFAULT = 0;
export const WAVE_SELECTED = 1;
export const WAVE_ACTIVE = 2;
export const WAVE_COOLDOWN = 3;

export const NB_CHARACTERS = 4;
