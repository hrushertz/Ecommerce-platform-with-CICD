pipeline{
    agent any

    environment {
		dockerHome = tool 'myDocker'
		PATH = "$dockerHome/bin:$PATH"
    }

    stages{

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