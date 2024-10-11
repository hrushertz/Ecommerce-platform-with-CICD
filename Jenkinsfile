pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                echo("Build")
            }
        }

        stage('Test'){
            steps{
                echo("Testing")
            }
        }

        stage('Integration Testing'){
            steps{
                echo("Integration Testing")
            }
        }

        stage('Build Docker Image'){
           steps{
             echo("Building Docker Image")
           }
        }

        stage('Push Docker Image'){
           steps{
             echo("Pushing Docker Image")
           }
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