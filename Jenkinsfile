pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Setup and Run') {
            steps {
                browserstack(credentialsId: '83338aa0-2e7b-41dc-9d11-a5352b5b037e', localConfig: [localOptions: '', localPath: '']){
                    sh 'brew install wget'
                    sh 'wget "https://www.browserstack.com/browserstack-local/BrowserStackLocal-darwin-x64.zip"'
                    sh 'unzip BrowserStackLocal-darwin-x64.zip'
                    sh './BrowserStackLocal --key $BROWSERSTACK_ACCESS_KEY --daemon start'
                    sh 'npm install'
                    sh 'node local.js'
                    sh './BrowserStackLocal --key $BROWSERSTACK_ACCESS_KEY --daemon stop'
                }
                browserStackReportPublisher 'automate'
            }
        }
    }
}
