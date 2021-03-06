# Librarian

> Desktop made with Typescript, Electron.js, React.js, Webpack and sass. The gold is to have the program organize and make backup of our data by setting everything up just once.

## Screenshots

![Example screenshot](./assets/Librarian-Screenshot.png)

<!-- If you have screenshots you'd like to share, include them here. -->

## Table of Contents

- [Screenshots](#screenshots)
- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Project Status](#project-status)
- [To do](#todo)
- [Contact](#contact)
- [License](#license)

## General Information

<!--- Provide general information about your project here.-->

- The gold is to provide an UI to setup files organization and backups.
- I decided to work on this project because i see people all the time with cluttered folders.
- Initially i had a script on python that has the same functionallity has this app, but normies can't use it, so i dicided to provide UI.

<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

## Technologies Used

- Typescript - 4.2.4
- React.js - 17.0.2
- Electron.js - 13.1.8
- css-loader - 5.7.2 (when upgrading this package the app breaks, webpack won't compile properly)

## Features

List the ready features here:

- Organizes files.

## Setup

You can get the compiled version that matches your OS [_here_](https://drive.google.com/drive/folders/1H64d7qW_NE-Uzm5RjM3dDNjM7AF094wG?usp=sharing) <!--TODO: add compiled links-->

- If you just want to make your own changes or contribute first clone this repo, inside the folder run: `yarn` and then `yarn start`

- To package for production (just in current OS run): `yarn package`

<!--- To compile for all OS run: `yarn package-all`-->

- To package for production (for an specific OS ) run: `yarn package --mac`

## Project Status

Project is: _in progress_.

<!-- ## Room for Improvement-->
<!--Include areas you believe need improvement / could be improved. Also add TODOs for future development.-->

<!--Room for improvement:-->
<!--- Improvement to be done 1-->
<!--- Improvement to be done 2-->

## TODO:

- [ ] FIX: Check if the new path (origin and destination) doesn't aleady exist.
- [ ] FIX: When new filters are added check spelling (FiltersMenu.jsx).
- [ ] FIX: better method to handle app version when packed.
- [ ] FIX: moving files not working on windows.
- [ ] FIX: should add some logging file on production.
- [ ] FIX: when the path on the selects it's empty.
- [ ] ADD: default watching and destination folders.
- [ ] ADD: Auto updater.
- [ ] ADD: regex filtering.
- [ ] ADD: more filtering options.
- [ ] ADD: languages system.
- [ ] ADD: better notifications.
- [ ] ADD: edit destination folders.
- [ ] ADD: on filters page add buttons for depth recursion and should match uppercase, .
- [ ] CHANGE: arrow on the custom select component.
- [ ] CHANGE: improve icons and UI.
- [ ] CHANGE: Refactor functions in main.ts and organize them in more files.
- [x] FIX: Connect the tray menu with the settings menu.
- [x] FIX: Dialog menu popping behind the BrowserWindow.
- [x] FIX: Add development check to set the autolaunch.
- [x] ADD: recently moved cap (to 200?).
- [x] FIX: hook tray buttons with the front end.
- [x] FIX: configuration not persisting when rebooted.
- [x] ADD: front end for canMoveFiles state property, so the user can switch between enabling the app or no.
- [x] ADD: icon on the settings page (mainWindow).
- [x] FIX: Recently moved filters all the files after the first three and doesn't delete the history.
- [x] FIX: Auto launch.
- [x] FIX: don't have app version as state, only update once on startup.
- [x] FIX: when hovering checkbox the mouse is not pointer.
- [x] ADD: filters selection when selecting a new destination folder.
- [x] FIX: error when selecting a single conflicting path??.
- [x] FIX: separated dispatch actions for all selected folders.
- [x] FIX: check for repeated paths on when adding new ones.
- [x] ADD: Section with the basic app information (what is it and how to use it).
- [x] ADD: functionallity.

## Contact

Created by [@TomiVidal99](https://www.tomas-vidal.xyz/) - feel free to contact me!

<!-- Optional -->

## License

This project is open source and available under the [MIT License]().

<!-- You don't have to include all sections - just the one's relevant to your project -->
