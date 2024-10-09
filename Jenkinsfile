pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clona el repositorio
                git url: 'https://github.com/SaulMachado97/clean-code-nodejs.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // Aquí puedes agregar comandos para construir tu aplicación
                sh 'npm install'  // Ejemplo para aplicaciones Node.js
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Aquí puedes agregar comandos para ejecutar tus pruebas
                sh 'npm test'  // Ejemplo para ejecutar pruebas en Node.js
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Aquí puedes agregar comandos para desplegar tu aplicación
                // Por ejemplo, podrías usar Docker o subir a un servidor
                sh 'docker build -t my-app .'  // Construir la imagen Docker
                sh 'docker run -d -p 80:3000 my-app'  // Ejecutar el contenedor
            }
        }
    }
}
