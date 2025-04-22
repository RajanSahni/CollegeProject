pipeline {
    agent any

    environment {
        // Image names
        BACKEND_IMAGE = 'rajansahni/college-backend'
        FRONTEND_IMAGE = 'rajansahni/college-frontend'

        // Container names
        BACKEND_CONTAINER = 'college-backend-container'
        FRONTEND_CONTAINER = 'college-frontend-container'

        // Volume paths (host:container)
        BACKEND_VOLUME = '/app/backend/data:/usr/src/app/data'
        FRONTEND_VOLUME = '/app/frontend/build:/usr/share/nginx/html'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/RajanSahni/CollegeProject.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh "docker build -t ${BACKEND_IMAGE} ./backend"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE} ./mern-auth-frontend"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop & remove existing containers if running
                    sh "docker rm -f ${BACKEND_CONTAINER} || true"
                    sh "docker rm -f ${FRONTEND_CONTAINER} || true"

                    // Run backend container with volume
                    sh """
                    docker run -d \
                        --name ${BACKEND_CONTAINER} \
                        -v ${BACKEND_VOLUME} \
                        -p 5000:5000 \
                        ${BACKEND_IMAGE}
                    """

                    // Run frontend container with volume
                    sh """
                    docker run -d \
                        --name ${FRONTEND_CONTAINER} \
                        -v ${FRONTEND_VOLUME} \
                        -p 3000:3000 \
                        ${FRONTEND_IMAGE}
                    """
                }
            }
        }
    }

    post {
        success {
            echo ' App successfully built and deployed!'
        }

        failure {
            echo ' Build or deployment failed.'
        }
    }
}
