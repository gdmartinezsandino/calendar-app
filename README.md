# Calendar App - Angular Challenge

## Assignment

The goal of this exercise is to create a demo calendar application using Angular.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:

<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandotory Features

 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city. :heavy_check_mark:
 - Ability to edit reminders - including changing text, city, day, and time. :heavy_check_mark:
 - Ability to know the weather of the city in each reminder via a weather service call from [OpenWeather](https://openweathermap.org/forecast16) to get the weather forecast (e.g. Rain). :heavy_check_mark:

## Bonus (Optional)

- Expand the calendar to support more than the current month or year. :x:
- Properly handle overflow when multiple reminders appear on the same date. :heavy_check_mark:
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.* :x:

## Considerations

 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - Show us your capabilities on CSS and styling, if possible.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Screenshots

<div align="center">
    <img src="https://raw.githubusercontent.com/gdmartinezsandino/calendar-app/tree/main/screenshots/view-full.png"/>
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/gdmartinezsandino/calendar-app/tree/main/screenshots/create-reminder.png"/>
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/gdmartinezsandino/calendar-app/tree/main/screenshots/edit-reminder.png"/>
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/gdmartinezsandino/calendar-app/tree/main/screenshots/delete-reminder.png"/>
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/gdmartinezsandino/calendar-app/tree/main/screenshots/language-change.png"/>
</div>
