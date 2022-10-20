# Social Black Hole

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application will allow the user to manage the backend portion of their social network through internal APIs.

## Table of Contents

- [Social Black Hole](#social-black-hole)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)
  - [License](#license)

## Installation

Download the files. Open a bash terminal in the main directory. Run "npm install". You will need mongoose installed and the connection details will need to be updated in the "index.js" file according to your database. Open a MySQL shell inside the "db" directory and run "source schema.sql;" to create the database. in a bash shell within the main directory of the store API, run "run seed" to seed the database (for testing with the default seed. Make sure to change the seeds directory to meet your needs before running it for your own purposes). Running "npm start" will start up the server.

## Usage

Run "node index.js" or "npm start". Routes may be accessed through any compatible application. For testing, a program such as Insomnia will provide assurance of a functional API.

You may view categories, products, and tags through the provided Get routes. Adding an id parameter onto these Get routes will return the requested item. Post routes may be used to add new categories, products, and tags. Put routes are available for updating categories, products, or tags. Finally, Delete routes are available for removing any of the aforementioned. In regards to deletion, a category cannot be deleted if it currently contains products.

[Video Link of Usage](https://drive.google.com/file/d/1FKWtq_2F7co2sqHqstdTY0i4XhN-CxRw/view)

[WebStoreAPI2x.webm](https://user-images.githubusercontent.com/35825121/193739893-b311c684-4735-4fa9-910e-16e06c923f6e.webm)


## Questions

Github Profile: [acotterson](https://github.com/acotterson)

If you have any additional questions, I can be reached at [acotterson@gmail.com](mailto:acotterson@gmail.com).

## License

Licensed under the MIT License: [MIT](https://opensource.org/licenses/MIT)
