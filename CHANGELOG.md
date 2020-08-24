# Change Log

All notable changes to the "Last Commit" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [1.1.0] - 2020-08-24
### Added
- Run commands synchronously with execGit method

### Changed
- Use fs.Watch instead of native VSCode function (createFileSystemWatcher)

### Fixed
- Use the drive letter while switching directory on Windows
- Watch the .git/logs directory instead of .git/COMMIT_EDITMSG file

### Removed
- Remove the delay before running the git log command

## [1.0.1] - 2020-08-19
### Changed
- Update the project description in package.json

### Fixed
- Use PAT from secrets in the publish step of CD workflow

## [1.0.0] - 2020-08-19

- Initial release