pipeline {
   agent any
   tools {nodejs "node"}

   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: 'd0471dcf-db68-430b-969d-0dc95f07f7b3', localConfig) {
               echo "hello"
               sh 'npm install'
               sh 'npm install selenium-webdriver'
               sh 'sleep 10'
               sh 'node new.js'
            }
         }
      }
    }
  }

