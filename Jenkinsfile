pipeline {
   agent any
   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               echo "hello"
               npm -v
               node -v
            }
         }
      }
    }
  }

