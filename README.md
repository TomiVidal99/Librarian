# Librarian

> Desktop made with Typescript, Electron.js and React.js. The gold is to have the program organize and make backup of our data by setting everything up just once.

## Screenshots

![Example screenshot](./screenshots/screenshot.png)

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

You can get the compiled version that matches your OS [_here_](https://) <!--TODO: add compiled links-->

- If you just want to make your own changes or contribute first clone this repo, inside the folder run: `yarn` and then `yarn start`

- To compile for your current OS run: `yarn package`

- To compile for all OS run: `yarn package-all`

- To compile for an specific OS run: `yarn package --mac`

## Project Status

Project is: _in progress_.

<!-- ## Room for Improvement-->
<!--Include areas you believe need improvement / could be improved. Also add TODOs for future development.-->

<!--Room for improvement:-->
<!--- Improvement to be done 1-->
<!--- Improvement to be done 2-->

## TODO:

- [ ] ADD: default watching and destination folders.
- [x] ADD: icon on the settings page (mainWindow).
- [ ] ADD: Auto updater.
- [ ] ADD: Auto launch.
- [ ] ADD: regex filtering.
- [ ] ADD: more filtering options.
- [ ] ADD: languages system.
- [ ] ADD: better notifications.
- [ ] ADD: edit destination folders.
- [ ] ADD: on filters page add buttons for depth recursion and should match uppercase, .
- [ ] FIX: hook tray buttons with the front end.
- [ ] FIX: when the path on the selects it's empty.
- [ ] CHANGE: arrow on the custom select component.
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
