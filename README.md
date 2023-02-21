# Onfido Studio Web SDK
This is a Node.js application that uses the Onfido API to create an applicant, generate an SDK token, and create a new workflow run id. The application allows users to input their first name, last name and workflow id, and then initialises the SDK on the page.

## Requirements
- Node.js
- npm
- Onfido API token

## Installation
1. Clone the repository to your local machine
```
git clone https://github.com/<your-username>/onfido-studio-nodejs.git
```

2. Install the necessary dependencies
```
npm install
```

3. Create a .env file in the root directory of the project and add your Onfido API token like this
```
ONFIDO_API_TOKEN=<your-api-token>
```

4. Start the server
```
npm start
```

5. Visit http://localhost:3000 in your browser to access the application

## Usage
1. Input your first name, last name and workflow id in the form
2. Click the submit button
3. The SDK will be initialised and displayed on the page

## Note
- It is recommended to exclude the node_modules folder and the .env file in the .gitignore file.
- You need to replace `<your-api-token>` and `<your-username>` with your Onfido API token and GitHub username respectively.

## Contribute
If you would like to contribute to the development of this project, please fork the repository and make a pull request.
