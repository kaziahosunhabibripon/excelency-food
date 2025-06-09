## Excellency files structures

```
excellency-food-ts/
│── public/
    │── assets/         # Static assets like images, icons, fonts
│── src/                # Source files for the application
│   │── app/            # Next.js App Router (if using App Router)
│   │── components/     # Reusable UI components
│   │── hooks/          # Custom React hooks
│   │── data/           # Static Data for using for UI.
│   │── helpers/        # Global Helpers for helping functionalities.
│   │── hooks/          # Global Hooks for helping or better UI functionalities.
│   │── redux/          # Redux store and slices (if using Redux)
│   │── services/       # API calls and business logic
│   │── styles/         # Global and module styles
│   │── types/          # TypeScript types and interfaces
│   └── utils/          # Utils for helping the application with global helper function and configs of others.
│── .env.local          # Environment variables (not committed to Git)
│── .gitignore          # Git ignore file
│── next.config.js      # Next.js configuration file
│── package.json        # Project dependencies and scripts
│── tsconfig.json       # TypeScript configuration (if using TypeScript)
└── README.md           # Documentation
```

## Explanation

- **`public/`**: Stores static assets like images, fonts, and favicons.
- **`src/app/`**: The main directory for Next.js **App Router** (used in Next.js 13+ with Server Components).
- **`src/components/`**: Stores reusable UI components to keep the code modular.
- **`src/hooks/`**: Custom React hooks to encapsulate logic.
- **`src/redux/`**: Redux store, slices, and state management logic (if using Redux Toolkit).
- **`src/services/`**: Handles API requests and business logic to keep API calls separate from components.
- **`src/styles/`**: Global styles, module styles, and Tailwind CSS configurations.
- **`src/types/`**: Stores TypeScript type definitions and interfaces.
- **`src/utils/`**: Utility functions used across the project.

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/rahat2020/excellency-food-ts.git
   cd excellency-food-ts
   ```
2. Install dependencies:
   ```sh
   npm install   # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev   # or yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Start the production server.
- `npm run lint` – Run linting.

## Contribution

Feel free to fork this repository and submit pull requests with improvements or fixes.

## License

This project is licensed under the MIT License.
# excellency-catering-resturent
# execelency-food
# excelency-food
