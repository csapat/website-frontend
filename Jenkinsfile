pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
        sh 'yarn build'
        sh 'mv build csapat.space'
        sh 'rm -rf /var/www/csapat.space'
        sh 'mv csapat.space /var/www'
      }
    }
  }
}