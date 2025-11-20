# Smart Home Front End

A modern, responsive smart home mobile application built with **Expo** and **React Native**. This application provides users with a secure interface to manage their smart home devices, receive critical safety alerts (Fire, Flood), and set smart reminders.

## 🚀 Features

*   **Secure Authentication**: User-friendly Login and Registration screens with "Remember Me" functionality.
*   **Real-time Safety Alerts**:
    *   **Global Fire Alert**: Immediate notifications and interface for fire detection.
    *   **Global Flood Alert**: Critical alerts for water leakage or flooding.
*   **Smart Reminders**: Set and manage reminders for various home tasks.
*   **Home Dashboard**: Centralized hub for monitoring and controlling smart devices.
*   **Modern UI/UX**: Sleek dark mode design with custom "Unna" typography and intuitive navigation.

## 🛠 Tech Stack

*   **Framework**: [Expo](https://expo.dev/) (React Native)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) & React Native StyleSheet
*   **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
*   **Icons**: Lucide React & Expo Vector Icons

## 📂 Project Structure

```
smart-home-front-end/
├── app/                    # Main application source code
│   ├── (tabs)/             # Tab-based navigation screens (Home, etc.)
│   ├── components/         # Reusable UI components (Alerts, Reminders, etc.)
│   ├── index.tsx           # Entry point (Authentication Screen)
│   └── _layout.tsx         # Root layout configuration
├── assets/                 # Images, fonts, and other static resources
├── scripts/                # Utility scripts
└── package.json            # Dependencies and scripts
```

## 🏁 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd smart-home-front-end
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npx expo start
```

In the output, you'll find options to open the app in:
*   **Development Build**
*   **Android Emulator**
*   **iOS Simulator**
*   **Expo Go**: Scan the QR code with your phone (Android/iOS) to run the app instantly.

## ⚙️ Configuration

This project uses environment variables for configuration. Create a `.env` file in the root directory (or modify the existing one) with the following keys:

```env
# The URL of your backend API
# IMPORTANT: If testing on a physical device, use your computer's local IP address (e.g., http://192.168.1.x:3000) instead of localhost.
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000

# OpenWeather API Key for weather data
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here

# Toggle for testing fire alerts (true/false)
EXPO_PUBLIC_FIRE_ALERT_ENABLED=false
```

**Note:** After changing `.env` variables, you must restart the Expo server (`Ctrl + C` -> `npx expo start`) for changes to take effect.

## 📱 Screens

*   **Login/Register**: The initial screen for user authentication.
*   **Home**: The main dashboard (accessible after login).
*   **Alerts**: Modal or screen overlays for critical warnings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
