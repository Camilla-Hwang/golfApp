# Golf Directory App

A map-based directory of golf courses in Singapore and Malaysia. This application allows users to easily find and get information about golf courses.

## Features

- **Interactive Map View:** Browse golf courses on an interactive map.
- **List View:** See a sortable and searchable list of all golf courses.
- **Detailed Course Information:** View details for each course, including address, contact information, and more.
- **Weather Forecast:** Get the latest weather forecast for the selected golf course location.
- **Supabase Backend:** All data is managed through a Supabase backend.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production.
- [Supabase](https://supabase.io/) - Open source Firebase alternative for the backend.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Camilla-Hwang/golfApp.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd golfApp
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    -   Create a new file named `.env.local` in the root of your project.
    -   Copy the contents of `.env.example` into `.env.local`.
    -   Fill in your Supabase project URL and anon key:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
        ```
    -   You can find these in your [Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true).

5.  **Run the development server**
    ```sh
    npm run dev
    ```
    The app should now be running on [http://localhost:3000](http://localhost:3000).
