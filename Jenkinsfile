pipeline {
   agent any
   tools {nodejs "node"}

   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '<browserstackCredentialsID>') {
               echo "hello"
               sh 'npm install'
               sh 'node new.js'
            }
         }
      }
    }
  }

