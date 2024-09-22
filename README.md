# Expense Tracker

## Overview

This project is a simple web-based expense tracking application. It allows users to sign in using Google authentication, add income and expense transactions, and view their total balance, income, and expenses. The application uses Firebase for authentication and Firestore for storing transactions.

## Features

- **Google Authentication**: Users can sign in with their Google account.
- **Add Transactions**: Users can add income and expense transactions with a description and amount.
- **View Balance**: Users can view their total balance, income, and expenses.
- **Transaction List**: A list of all added transactions is displayed for easy tracking.
- **Sign Out**: Users can sign out, which clears their session.

## File Structure

- **`App.tsx`**: Handles user authentication via Google Sign-In using Firebase.
- **`ExpenseTracker.tsx`**: Main component for managing and displaying transactions.

## Components

### `App.tsx` - Authentication

This component manages user authentication using Firebase. Once the user is authenticated via Google, their session is stored in `localStorage`, and they are navigated to the expense tracker page.

#### Key Functions:

- **`signInWithGoogle`**: Signs in the user with Google, stores their information, and navigates to the expense tracker.
- **Conditional Rendering**: If the user is already authenticated, they are automatically redirected to the expense tracker.

### `ExpenseTracker.tsx` - Expense Tracker

This is the main component where users can add, view, and calculate their transactions.

#### Key Features:

- **Transaction Form**: Users can add a new transaction (either income or expense) by filling out a form with a description, amount, and transaction type.
- **Transaction List**: Displays all added transactions with their description, amount, and type.
- **Balance Calculation**: The component calculates and displays the user's total balance, income, and expenses using the `useMemo` hook for performance optimization.
- **Sign Out**: Users can sign out, which clears the session and returns them to the login page.

#### Key Functions:

- **`addTransaction`**: Adds a new transaction to the list.
- **`calculateTotal`**: Calculates the total income, expense, and balance based on the transactions.
- **`signUserOut`**: Signs the user out, clears the local storage, and navigates back to the authentication page.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Set up Firebase Authentication (Google sign-in).
   - Create Firestore for transaction storage.
   - Copy your Firebase config into `src/firebaseConfig.ts`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## Dependencies

- React
- Firebase (Authentication and Firestore)
- React Router
- TailwindCSS

## License

This project is licensed under the MIT License.
