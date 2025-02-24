
# Event Booking System

This project is a robust event booking interface built using React, TypeScript, and Tailwind CSS. It allows users to book slots for events, cancel bookings, and join a waiting list when all slots are occupied. The application uses localStorage for persistent state management, ensuring that data is retained across page refreshes.


## Features

- Slot Booking: Users can book slots for events. If slots are available, the booking is confirmed. Otherwise, users can join a waiting list.
- Cancellation: Users can cancel their bookings, freeing up slots for others.
- Waiting List: When all slots are occupied, users can join a waiting list. If a slot becomes available, the first user on the waiting list is automatically allocated the slot.
- Persistence: All data (available slots, bookings, waiting list) is stored in localStorage and persists across page refreshes.
- Reset Option: Users can reset the booking system to its initial state.
- Responsive UI: The interface is built using Tailwind CSS, ensuring a modern and responsive design.


## Technologies Used

- Frontend: React.js, Tailwind CSS, Typescript

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

## Run Locally

Clone the project

```bash
  git clone https://github.com/hadhihassan/EventPro-Event-Booking-System
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
