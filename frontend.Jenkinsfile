pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        // This clones the repo and sets the working directory to root
        checkout scm
        echo 'Repository cloned. Working from root directory.'
      }
    }
    stage('Build JAR') {
      steps {
        sh './mvnw clean package -DskipTests'
        echo 'JAR built successfully.'
      }
    }

    stage('Build') {
      steps {
        // Assumes backend Dockerfile is in root, frontend in ./frontend
        sh 'docker build -t read-user-file-be .'
        echo 'Build successfull.'
        sh 'docker images'
        echo 'image successfull.'
      }
    }

    stage('Push to ECR') {
      steps {
        // Replace with your actual ECR login and repo URLs
        sh 'aws ecr get-login-password | docker login --username AWS --password-stdin 303785347823.dkr.ecr.us-east-1.amazonaws.com/read-user-file'
        echo 'login successfully.'
        sh 'docker tag read-user-file-be 303785347823.dkr.ecr.us-east-1.amazonaws.com/read-user-file'
        echo 'tag successfully.'
        sh 'docker push 303785347823.dkr.ecr.us-east-1.amazonaws.com/read-user-file'
        echo 'pushed successfully.'

      }
    }
    stage('Test') {
          steps {
            echo 'Pipeline is working!'
          }
        }

  }
}
