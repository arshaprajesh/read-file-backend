pipeline {
  agent any

  environment {
    ECR_REGISTRY = '303785347823.dkr.ecr.us-east-1.amazonaws.com'
    ECR_REPO = 'read-user-file-frontend'
    IMAGE_NAME = 'read-user-file-fe'
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
        echo 'Repository cloned. Working from root directory.'
      }
    }

    stage('Install & Build Frontend') {
      steps {
        sh 'npm install'
        sh 'npm run build'
        echo 'Frontend build completed.'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
        sh 'docker images'
        echo 'Docker image built.'
      }
    }

    stage('Push to ECR') {
      steps {
        sh 'aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY'
        sh 'docker tag $IMAGE_NAME $ECR_REGISTRY/$ECR_REPO'
        sh 'docker push $ECR_REGISTRY/$ECR_REPO'
        echo 'Image pushed to ECR.'
      }
    }

    stage('Test') {
      steps {
        echo '✅ Frontend pipeline completed successfully.'
      }
    }
  }
}
