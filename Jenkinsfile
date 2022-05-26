pipeline {
   agent any
   tools {nodejs "node"}

   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               echo "hello"
               sh 'npm install'
               sh 'npm i selenium-webdriver-3'
               sh 'node new.js'
            }
         }
      }
    }
  }

