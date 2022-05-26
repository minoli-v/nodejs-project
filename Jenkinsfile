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
               sh 'export BROWSERSTACK_USERNAME=minolivartak_7NMHef && export BROWSERSTACK_ACCESS_KEY=7zERhse86fXgg5qz3cbr'
               sh 'sleep 20'
               sh 'node new.js'
            }
         }
      }
    }
  }

