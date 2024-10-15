pipeline {
    agent any

    environment {
        // Environment variables for frontend
        REACT_APP_BACKEND_URL = credentials('REACT_APP_BACKEND_URL')

        // Environment variables for backend
        VENV_DIR = 'venv'
        API_HEALTH_ENDPOINT = 'http://127.0.0.1:5000/products'
        REPO_URL = 'https://github.com/hrushertz/Ecommerce-platform-with-CICD.git'
        BRANCH = 'main' // Target branch for repository
    }

    stages {
        stage('Informative Checkouts') {
            steps {
                sh 'docker version'
                echo "Build"
                echo "PATH - $PATH"
                echo "BUILD_NUMBER - $env.BUILD_NUMBER"
                echo "BUILD_ID - $env.BUILD_ID"
                echo "JOB_NAME - $env.JOB_NAME"
                echo "BUILD_TAG - $env.BUILD_TAG"
                echo "BUILD_URL - $env.BUILD_URL"
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    // Clone the repository from GitHub
                    sh """
                        rm -rf Ecommerce-platform-with-CICD
                        git clone -b ${BRANCH} ${REPO_URL} Ecommerce-platform-with-CICD
                    """
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    dir('Ecommerce-platform-with-CICD/frontend') {
                        // Install npm dependencies for frontend
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('Ecommerce-platform-with-CICD/frontend') {
                        // Build the React application
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Archive Frontend Build Artifacts') {
            steps {
                script {
                    dir('Ecommerce-platform-with-CICD/frontend') {
                        // Archive the build artifacts for frontend
                        archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                    }
                }
            }
        }

        stage('Set up Python Environment') {
            steps {
                script {
                    // Set up Python virtual environment for backend
                    dir('Ecommerce-platform-with-CICD/backend') {
                        sh "python3 -m venv ${VENV_DIR}"
                    }
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                script {
                    // Activate the virtual environment and install requirements for backend
                    dir('Ecommerce-platform-with-CICD/backend') {
                        sh """
                            . ${VENV_DIR}/bin/activate
                            pip install -r requirements.txt
                        """
                    }
                }
            }
        }

        stage('Start Flask App') {
            steps {
                script {
                    // Run the Flask app in the background
                    dir('Ecommerce-platform-with-CICD/backend') {
                        sh """
                            . ${VENV_DIR}/bin/activate
                            nohup python eComAPIApp.py &
                        """
                        // Give the server time to start
                        sleep 5
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Declare Docker image variables outside the block for reuse
                    backendImage = docker.build("hrushertz/ecom-backend:${env.BUILD_NUMBER}", "Ecommerce-platform-with-CICD/backend")
                    frontendImage = docker.build("hrushertz/ecom-frontend:${env.BUILD_NUMBER}", "Ecommerce-platform-with-CICD/frontend")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Replace 'dockerhub-credentials-id' with your DockerHub credentials ID
                    docker.withRegistry('https://index.docker.io/v1/', 'Docker') {
                        // Push backend image
                        backendImage.push()
                        backendImage.push('latest')

                        // Push frontend image
                        frontendImage.push()
                        frontendImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                // Placeholder for deployment steps
                echo "Deploying to the server..."
                // e.g., use scp to transfer files, or call a deployment script.
            }
        }
    }

    post {
        always {
            // Cleanup - kill the Flask process to free up the port
            sh 'pkill -f eComAPIApp.py || true'

            // Clean up the workspace after the build
            cleanWs()

            // Docker cleanup
            sh '''
                docker container prune -f
                docker image prune -a -f
                docker volume prune -f
            '''
        }

        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build failed. Check logs for errors.'
        }
    }
}
