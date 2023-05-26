# Chatbot Application

This chatbot application is built using GPT-3.5, Azure NLP, PostgreSQL database, ReactJS, Tailwind CSS, WebSocket, and FastAPI. The primary purpose of this chatbot is to provide insights into your data based on training it with your company's data using the Language Model (LLM) like OpenAI.
![image](https://github.com/Himanshuub2/_chatbot/assets/100412858/bc8f9e70-4089-4d56-bee1-25f8e23a7b4b)

## Features

1. **Data Insight**: The chatbot utilizes GPT-3.5 to analyze and provide insights into your company's data. It can answer questions, perform data analysis, generate reports, and provide valuable information based on the data it has been trained on.

2. **LLM Training**: The chatbot has been trained using your company's data, enabling it to understand the specifics of your business and provide more accurate insights. This training is based on the powerful GPT-3.5 language model.

3. **Azure NLP**: The application leverages Azure NLP services to enhance its natural language understanding capabilities. It utilizes various NLP techniques such as sentiment analysis, entity recognition, and language detection to provide a more comprehensive and context-aware conversation.

4. **PostgreSQL Database**: The chatbot integrates with a PostgreSQL database to store and retrieve relevant information. It can access and analyze data from your company's database, ensuring real-time and up-to-date insights.

5. **ReactJS and Tailwind CSS**: The frontend of the application is built using ReactJS, a popular JavaScript library for building user interfaces. Tailwind CSS is used for styling, providing a customizable and responsive design.

6. **WebSocket**: The application uses WebSocket technology to enable real-time, bidirectional communication between the client (browser) and the server (FastAPI). This ensures a seamless and interactive chat experience with the chatbot.

7. **FastAPI**: The backend of the application is powered by FastAPI, a modern, fast (high-performance), web framework for building APIs with Python. FastAPI enables efficient handling of requests, allowing the chatbot to process user queries quickly and respond in a timely manner.

8. **Single Sign-On (SSO)**: The chatbot application also supports Single Sign-On functionality. It can be integrated with your existing authentication system, providing a secure and streamlined login experience for your users.

## Getting Started

To run the chatbot application locally, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Install dependencies:
   - Backend:
     - Navigate to the backend directory: `cd fastApi`
     - Create a virtual environment: `python3 -m venv venv`
     - Activate the virtual environment:
       - Windows: `venv\Scripts\activate`
       - Linux/MacOS: `source venv/bin/activate`
     - Install required packages: `pip install -r requirements.txt`
   - Frontend:
     - Navigate to the frontend directory: `cd chatbot-FE`
     - Install dependencies: `npm install`
3. Configure the application:
   - Edit the backend configuration file (`fastApi/`) and provide the necessary credentials and settings for Azure NLP, PostgreSQL database, and SSO integration.
   - Update the frontend configuration file (`chatbot-FE/src/`) with the appropriate backend API endpoint.
4. Run the application:
   - Backend: In the `backend` directory, run `uvicorn main:app --reload` to start the FastAPI server.
   - Frontend: In the `frontend` directory, run `npm start` to start the React development server.
5. Access the application: Open your browser and navigate to `http://localhost:3000` to interact with the chatbot.
![image](https://github.com/Himanshuub2/_chatbot/assets/100412858/0d97c29c-bee3-47b6-9fff-7e29ed08f3c0)

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Ensure your code adheres to the project's coding style and best practices.
4. Create a pull request, clearly describing the changes you've made.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

The chatbot application makes use of various open-source libraries and technologies. We would like to express our gratitude to the developers and contributors of the following projects:

- GPT-3.5 by OpenAI
- Azure NLP Services
- PostgreSQL
- ReactJS
- Tailwind CSS
- WebSocket
- FastAPI

## Contact

If you have any questions, suggestions, or feedback, please contact me at [iihimanshu.b2@hotmail.com] We would be happy to assist you.
