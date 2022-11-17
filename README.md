<!-- @format -->

# Project Title

Money Tracker

# Project Description

This is a website that users can use to track their income & expenses, as well as set budgets. Bar charts are also available for users to compare their actual vs budgeted income or expense.

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

# How to Install and Run Locally:

## Creating PostgresQL database & tables

1. Run `npm i` to install all dependencies

2. Create a postgreSQL database called "money_tracker"

3. Create a `.env` file with variable `DATABASE_URL`. The value will be "postgres://USER:PASSWORD@localhost:5432/money_tracker?schema=public"

    - See https://www.prisma.io/docs/concepts/database-connectors/postgresql
    - If connecting as root user, username will be the local computer username, and password will be the same as username.

4. Run `npx prisma`

5. Run `prisma migrate dev --name init`

# Materials

## React Hierarchy Structure

(./images/react_hierarchy)

# Acknowledgements & Credits

## Assets used:

-   https://fonts.google.com/specimen/League+Spartan
-   https://tenor.com/view/kitty-kitten-lazy-pet-me-give-me-give-me-gif-16322510
-   https://tenor.com/view/you-aint-got-no-money-patricia-carson-the-ms-pat-show-youre-poor-you-dont-have-money-gif-25239898
-   https://www.iconfinder.com/icons/3827994/business_cash_management_money_icon
