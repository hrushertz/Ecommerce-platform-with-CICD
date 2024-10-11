pipeline{
    agent any
    stages{
        stage('Build'){
            echo("Build")
        }

        stage('Test'){
            echo("Testing")
        }

        stage('Integration Testing'){
            echo("Integration Testing")
        }

        stage('Build Docker Image'){
            echo("Building Docker Image")
        }

        stage('Push Docker Image'){
            echo("Pushing Docker Image")
        }
    }

    post {
		always {
			echo "I'm awesome, I run always"
		}
		success {
			echo "I run when you are successful"
		}
		failure {
			echo "I run when you fail"
		}
	}
}