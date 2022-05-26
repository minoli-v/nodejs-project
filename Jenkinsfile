pipeline {
   agent any
   tools {nodejs "node"}

   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               echo "hello"
               sh 'npm install'
               sh 'npm install selenium-webdriver'
               sh 'sleep 30'
               sh 'node new.js'
            }
         }
      }
    }
  }

