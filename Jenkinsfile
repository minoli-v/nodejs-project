pipeline {
   agent any
   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               npm install    
            }
         }
      }
    }
  }

