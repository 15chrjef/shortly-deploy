module.exports = function(grunt) {
  console.log('INIT CONFIG');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push ssh://root@192.241.225.73/root/shortly/shortly.git master'
      }
    },

    git_deploy: {
      your_target: {
        options: {
          url: 'ssh://root@192.241.225.73/root/shortly/shortly.git',
          branch: 'master'
        },
        src: './'
      },
    },

  gitcommit: {
    your_target: {
      options: {
        cwd: process.env.CWD,
        verbose: true
      },
      files: [
        {
          src: '*.*',
          expand: true,
          cwd: "/path/to/repo"
        }
      ]
    }
  },
    
  });
  console.log('INIT CONFIG COMPLETE');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git-deploy');
  grunt.loadNpmTasks('grunt-git');
  console.log('LOADED TASKS');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('push', [
    's'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('server-dev', function (target) {
    console.log('RUNNING SERVER-DEV');
    grunt.task.run([ 'nodemon', 'watch' ]);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      console.log('IN UPLOAD. RUNNING SERVER DEV');
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function() {
    console.log('IN DEPLOY. RUNNING SERVER-DEV');
    grunt.task.run(['server-dev']);
  });


  grunt.registerTask('default', [
    'push'
  ]);


};
