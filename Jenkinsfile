#!groovy

node('CloudEJ2') {
    try {
        deleteDir()

        stage('Import') {
            git url: 'https://gitlab.syncfusion.com/essential-studio/ej2-groovy-scripts.git', branch: 'master', credentialsId: env.JENKINS_CREDENTIAL_ID
            shared = load 'src/shared.groovy'
        }

        stage('Checkout') {
            checkout scm
            shared.getProjectDetails()
            shared.gitlabCommitStatus('running')
        }

        stage('Install') {
            shared.install()
        }

        // stage('Test') {
        //     shared.test()
        // }

        stage('Build') {
            shared.runShell('npm run build')
            shared.runShell('gulp change-path')
        }

        stage('Publish') {
            shared.publish()
        }

        shared.gitlabCommitStatus('success')
        deleteDir()
    }
    catch(Exception e) {
        println(e)
        shared.gitlabCommitStatus('failed')
        deleteDir()
        error('Build Failed')
    }
}