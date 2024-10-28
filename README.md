# employee-cms

## Description

This app allows the user to manage a sql database with employee information by following prompts and providing information in the terminal. The user is able to view, add, and update information through the app. 

I built this project to get more experience using sql queries, commmunicating with a sql database, and using the inquirer node module. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Perform a git clone of the repo into a local folder, then open in VS Code or similar program. Right click on the package.json file and select the "open in integrated terminal" option, and run the command "npm install".

Copy the SSH Key from the [GitHub Repository](https://github.com/dcartolano/employee-cms) and perform a git clone into the directory of your choice. Open in VS Code or similar program. In the terminal, run "git i" to download all relevant node modules.

Create a new database within your pgAdmin (or similar sql editor) server entitled "employees_db" and run the code from db/schema.sql to create your tables, and then use db/seeds.sql to populate them. If you'd like to use your own values, follow the format from db/seeds.sql and edit as desired.

## Usage

To use, right click on the package.json file and select "Open in Integrated Terminal" (if using VS Code). Follow the prompts and enter or select the information as requested.

For more details, check out this [demo video](https://drive.google.com/file/d/151G_2TJLTPdzzFAC9zDqHdp5HFPS1t0A/view) showing the app in action.

## Credits

Thanks to EdX and Northwestern for the starter code and the opportunity to practice these skills. 

Thanks to the EdX tutors for their great help and many clarifications.

Thanks also to Jake Smith for his suggestion to utlize the map method instead of the intensive chain of nested logic loops I was attempting to use previously. You can find his GitHub profile [here](https://github.com/5mitty). 

## License

n/a
