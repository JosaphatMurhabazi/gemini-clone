# Gemini Clone

Gemini Clone is a cutting-edge interactive application that leverages Google's Generative AI and zustand to provide dynamic and insightful prompt handling. It offers a responsive user interface, robust state management, and seamless API integration to enhance user experiences.

# Features

## AI Integration

- Uses Google's gemini-2.0-flash generative model for prompt-based responses.
- Configurable model settings (e.g., temperature, topP, topK) to fine-tune outputs.

## State Management

- Powered by zustand for managing user inputs, results, and application states.
- Handles states such as recentPrompt, prevPrompts, isLoading, and more.

## User Interface

### Main Component:

- Displays input fields and result data dynamically.
- Includes loader animations for enhanced user interaction.

### Sidebar Component:

- Expandable navigation bar with features like recent prompts, help, activity, and settings.

## Installation

To get started with Gemini Clone:

1. Clone the repository:

```bash
git clone https://github.com/JosaphatMurhabazi/gemini-clone.git
cd gemini-clone
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

- Create a .env file in the root directory.
- Add your Google Generative AI API key:
  VITE_GEMINI_API_KEY=your-api-key

## Run the Application

### Start the development server:

```bash
npm run dev
```
