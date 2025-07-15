# PersonaForge

PersonaForge is a web application designed to empower users to create highly detailed and nuanced AI personas through an intuitive, character-creation-style user interface. It bridges the gap between abstract AI agent definitions and human-centric character design, allowing users to define psychological, stylistic, and behavioral traits for AI entities. The output is standardized JSON data, ready for seamless integration into agentic LLM frameworks like CrewAI.

## Purpose

The core purpose of PersonaForge is to provide a visual, interactive, and guided experience for defining the characteristics of AI agents. It transforms the complex task of AI persona creation into an accessible and engaging process, similar to designing a character in a video game.

## Target Users

*   **AI Developers & Researchers:** For precise control over agent personalities and behaviors in multi-agent systems (e.g., CrewAI, LangChain).
*   **Content Creators & Storytellers:** To define AI characters for interactive narratives, virtual assistants, or conversational AI with distinct voices and traits.
*   **UX Designers & Product Managers:** For prototyping and testing AI interactions with specific persona characteristics.
*   **Educators & Students:** As a tool for learning and demonstrating the impact of different AI traits on agent performance and interaction.

## Key Features

1.  **Character-Creation-Style UI:** An intuitive, visual interface with sliders, toggles, and interactive elements for defining persona traits.
2.  **Trait-Based Persona Definition:** Users can adjust values (0-1) for various psychological and stylistic traits, grouped into logical categories.
3.  **Real-time Persona Preview:** Dynamic preview (e.g., text-based output or simulated interaction) demonstrates the persona's likely behavior or communication style as traits are adjusted.
4.  **JSON Output:** Generates a standardized JSON schema of the defined persona, ready for consumption by LLM systems.
5.  **Integration with Agentic Frameworks:** Specifically designed to facilitate easy integration with CrewAI, allowing personas to inform agent roles and behaviors.
6.  **Save/Load Functionality:** Users can save their created personas, load existing ones, and manage a library of AI characters.
7.  **Guided Creation Process:** Steppers, progress indicators, and tooltips guide users through the persona definition process.

## UX Philosophy

PersonaForge's user experience is built upon cognitive design principles to make AI persona creation efficient and enjoyable:

*   **Hick’s Law (Simplicity & Progressive Disclosure):** The UI minimizes choices at each step, presenting information progressively. Advanced settings are hidden behind toggles or in separate sections, reducing cognitive load and preventing overwhelm.
*   **Goal-Gradient Effect (Motivation & Progress):** Visual representations of user progress, such as progress bars and step indicators, motivate users to complete their personas. Perceived progress accelerates as completion nears, fostering engagement.
*   **Zeigarnik Effect (Completion & Retention):** Incomplete sections or traits are clearly indicated, subtly prompting users to finish tasks. Autosave features ensure work is retained, encouraging users to return and complete their personas.

## Getting Started

To run PersonaForge locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kliewerdaniel/PersonaForge01.git
    cd PersonaForge01/persona-forge
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

## Project Structure

The project is organized into the following main directories:

*   `persona-forge/`: Contains the main React application.
*   `specs/`: Contains detailed specification documents for various aspects of the application.

## Contributing

We welcome contributions! Please see our `CONTRIBUTING.md` (if available) for guidelines on how to contribute.

## License

This project is licensed under the MIT License.
