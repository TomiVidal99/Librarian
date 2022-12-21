# Librarian

> Desktop made with Typescript, Electron.js, React.js, Webpack and sass. The gold is to have the program organize and make backup of our data by setting everything up just once.

## Screenshots

<!-- ![Example screenshot](./assets/Librarian-Screenshot.png) -->

<!-- If you have screenshots you'd like to share, include them here. -->

## Table of Contents

- [Screenshots](#screenshots)
- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Contribute](#development)
- [Build](#build)
- [Project Status](#project-status)
- [To do](#todo)
- [Contact](#contact)
- [License](#license)

## General Information

<!--- Provide general information about your project here.-->

- Made from the this (template)[https://www.electronforge.io/guides/framework-integration/react-with-typescript].
- The gold is to provide an UI to setup files organization and backups.
- I decided to work on this project because i see people all the time with cluttered folders.
- Initially i had a script on python that has the same functionallity has this app, but normies can't use it, so i dicided to provide UI.

<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

## Technologies Used

- Typescript - 4.5.4
- React.js - 18.2.0
- Electron.js - 21.3.1

## Features

List the ready features here:

- [ ] none yet 😪.

## Contribute

`yarn start` will start the app for development if you'd like to contribute.

## Build

`yarn package` will create a folder _'out'_ in which you'll find the corresponding executables for your OS.

## Project Status

Project is: _in progress_.

<!-- ## Room for Improvement-->
<!--Include areas you believe need improvement / could be improved. Also add TODOs for future development.-->

<!--Room for improvement:-->
<!--- Improvement to be done 1-->
<!--- Improvement to be done 2-->

## TODO:

- [ ] FIX: add hashing to windows path names, so no conflic occurs when filtering the route.
- [ ] FIX: remove frames on windows.
- [ ] FIX: the store should be handled in the state handler file, move dependencies to it and make the refactors in the functions.
- [ ] FIX/ADD: the language should be loaded in the backend and then given to the frontend.
- [ ] FIX: handle case for when the file already exists.
- [ ] FIX: in general settings (and some other elements) there should be tooltips, to further explain what's up.
- [ ] FIX: add more type checking to filters, expecially if a filter like format is added with a dot '.', should parse that correctly.
- [ ] FIX: make the list and the items of the origin and destination folders it's own component.
- [ ] FIX: language not syncronizing properly with translation files.
- [ ] ADD: disable/enable organize files, inside the tray and the settings page.
- [ ] ADD: think a way to handle recentlyMoved folder, like: how to remove them, how many should you store, etc.
- [ ] ADD: edit destination folders.
- [ ] ADD: frontend to activate/deactivate file organization when just launched (all files that already exists inside folders).
- [ ] ADD: recursion to the origin folders.
- [ ] ADD: shift + click to select multiple items in lists.
- [ ] ADD: maybe check if there are conflicting filters?, i.e: work (name) conflics with work.pdf (pdf).
- [ ] ADD: theme selector (light and dark, later maybe more palettes).
- [ ] ADD: navigation.
- [ ] MAYBE ANIMATION: to the items in the list, so the name originally it's centered and the moves to the left as the path appears.
- [ ] IMPROVE: organize all ipcMain handlers better.

## Contact

Created by [@TomiVidal99](https://www.tomasvidal.xyz/) - feel free to contact me!

<!-- Optional -->

## License

This project is open source and available under the [MIT License]().

<!-- You don't have to include all sections - just the one's relevant to your project -->
