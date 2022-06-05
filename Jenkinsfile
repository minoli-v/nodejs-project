pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Setup and Run') {
            steps {
                browserstack(credentialsId: '83338aa0-2e7b-41dc-9d11-a5352b5b037e', localConfig: [localOptions: '', localPath: ''] ){
                    sh 'npm install'
                    sh 'node new.js'
                    echo 'Running parallel test'
                    sh 'node parallel.js'
                    echo 'Running local test'
                    sh 'node local.js'
                }
            }
        }
    }
}
