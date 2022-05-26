pipeline {
   agent any
   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               echo "hello"
               
               node --version
            }
         }
      }
    }
  }

