<!-- @format -->

# Project Title

Money Tracker

# Project Description

This is a website that users can use to track their income & expenses, as well as set budgets. Bar charts are also available for users to compare their actual vs budgeted income or expense.

Features:

-   Able to create, edit & delete income / expense records
-   Different calendar views available (daily, weekly, monthly & YTD) where income / expense records are listed
-   Able to create, edit & delete budget for income / expense
-   Able to create, edit & delete different categories for income & expense
-   Analyse page available that shows a bar chart comparing actual vs budget income/expense across different categories
-   Register, login & logout
-   2 types of access/login available: normal user & admin

This is a full-stack website done as part of the course requirements for General Assembly's Software Engineering Immersive program.

## Technologies Used:

-   Front-end:

    -   HTML
    -   CSS
    -   React with TypeScript
    -   Material UI
    -   Axios
    -   Dayjs
    -   React Router
    -   Rechart

-   Back-end:
    -   Node.js
    -   Express
    -   Prisma
    -   PostgreSQL
    -   Bcrypt
    -   JWT
    -   UUID

## General Approach

I first started this project working on the back-end portion. While searching for a driver to connect my Express APIs & postgreSQL database, I came across Prisma, and decided to choose it to use on this project due to its detailed documentation & flexbility of being able to utilised on REST APIs as well as GraphQL (something I would like to try later).

For front-end, I decided to use context to store the logged in state (true/false) as well as the data returned via APIs if the user is logged in. Further processing of the data returned from API is done down at the respective components where required. I decided to go with this approach as I felt it was the most efficient way of minising the number of API calls required as a user moves through the website.

## Unsolved Problems and/or Major Hurdles

TypeScript, Axios, Prisma, and Rechart are new technologies I decided to try in this project as a challenge to myself, to see how much I can learn on-the-go while having to complete the project within a short timeframe. A lot of time was spent at the early stages learning how to use these technologies.

One major hurdle with this project is that there is a significant amount of date manipulation and comparison required. I decided to try out a date library (Dayjs) with readily-available utility functions for manipulation and comparison of dates. I chose Dayjs as it comes with concise and easy-to-understand documentation, and it is simple to implement.

## App Screenshots

![app](/images/app_calendar)

![app](/images/app_budget)

![app](/images/app_analyse)

![app](/images/app_settings)

![app](/images/app_admin)

# How to Install and Run Locally:

## Creating PostgresQL database & tables

1. Run `npm i` to install all dependencies

2. Create a postgreSQL database called "money_tracker"

3. Create a `.env` file with variable `DATABASE_URL`. The value will be "postgres://USER:PASSWORD@localhost:5432/money_tracker?schema=public"

    - See https://www.prisma.io/docs/concepts/database-connectors/postgresql
    - If connecting as root user, username will be the local computer username, and password will be the same as username.

4. Run `npx prisma`

5. Run `prisma migrate dev --name init`

# Future Features

-   Having other types of periods for budget records instead of just monthly (e.g. daily, weekly)

-   Have other kinds of charts available for analyse page\

-   Have stacked bar charts on budget page that shows the breakdown of income & expense into its respective categories

-   Have a page that allows tracking of stocks performance

-   Add change password feature in settings page

-   Add change website theme color feature in settings page

# Materials

## React Hierarchy Structure

![react_hierarchy](/images/react_hierarchy)

## Wireframes

![wireframe](/images/wireframe_home)

![wireframe](/images/wireframe_createRecordModal)

![wireframe](/images/wireframe_editRecordModal)

![wireframe](/images/wireframe_budget)

![wireframe](/images/wireframe_createBudgetModal)

![wireframe](/images/wireframe_editBudgetModal)

![wireframe](/images/wireframe_analyse)

![wireframe](/images/wireframe_settings)

![wireframe](/images/wireframe_editCategoryModal)

![wireframe](/images/wireframe_admin)

# Acknowledgements & Credits

## Assets used:

-   https://fonts.google.com/specimen/League+Spartan
-   https://tenor.com/view/kitty-kitten-lazy-pet-me-give-me-give-me-gif-16322510
-   https://tenor.com/view/you-aint-got-no-money-patricia-carson-the-ms-pat-show-youre-poor-you-dont-have-money-gif-25239898
-   https://www.iconfinder.com/icons/3827994/business_cash_management_money_icon
