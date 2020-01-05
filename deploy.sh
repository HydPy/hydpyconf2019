#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

build_files_and_commit_changes() {
  bundle install
  bundle exec jekyll build
  git clone https://github.com/HydPy/hydpy.github.io.git pyconf-websites
  cd pyconf-websites
  rm -rf 2019
  mkdir 2019
  cp -rf ../_site/* 2019/
  git add .
  git commit -m "Travis build: $TRAVIS_BUILD_NUMBER"
}

push_files_to_github() {
  git remote add origin-pages https://${GH_TOKEN}@github.com/HydPy/hydpy.github.io.git
  git push origin-pages master
}

setup_git
build_files_and_commit_changes
push_files_to_github

