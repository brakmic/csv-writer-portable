# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.6.6] - 2023-09-22
- Improve ESLint configuration
- Fixed various linting errors in source and test
- Improved tests
  
## [1.6.5] - 2023-09-21
- Add Webpack support
- Add scripts for generating browser bundles
- Add "public" html folder for local http server testing 
- Add public/index.html & /public/bundle.js for testing
- Support browser debugging with ts-loader
## [1.6.3] - 2023-09-21
- Added browser compatibility
- Replaced Mocha with Jest
- Added Browser compatibility tests
- Updated NPM scripts
- Updated node packages

## [1.6.1] - 2023-09-20
- Fixed compilation issues regarding return types in index.ts
- Replaced TSLint with ESLint
- Replaced redundant tslint.json with .eslintrs.js
- Temporarily disabled ESLint checks for "any" in `record.ts`, `helper.ts`, and `write-object-records.ts`
- Fixed compilation issues regarding return types in csv-writer-factory.ts

## [1.6.0] - 2020-01-18
### Added
- Support for specifying values in nested objects. [#34](https://github.com/ryu1kn/csv-writer/pull/34)

## [1.5.0] - 2019-07-13
### Added
- Added `alwaysQuote` flag to always double-quote all fields. [#21](https://github.com/ryu1kn/csv-writer/pull/21)

## [1.4.0] - 2019-06-19
### Added
- Allow CRLF as a record delimiter. [#27](https://github.com/ryu1kn/csv-writer/pull/27)

## [1.3.0] - 2019-04-19
### Changed
- Changed project language from JavaScript to TypeScript.

### Added
- Made TypeScript type definitions accessible. Thanks to @coyotte508.
  [PR #23](https://github.com/ryu1kn/csv-writer/pull/23)

## [1.2.0] - 2018-08-22
### Added
- CSV records are now not limited to an array but can be an iterable object. Thanks to @pineapplemachine.
  [PR #11](https://github.com/ryu1kn/csv-writer/pull/11)

## [1.1.0] - 2018-08-20
### Added
- Allow semicolon as a field delimiter as it is commonly used in CSV in some regions. Thanks to @HKskn.
  [PR #8](https://github.com/ryu1kn/csv-writer/pull/8), [#6](https://github.com/ryu1kn/csv-writer/pull/6)

## [1.0.1] - 2018-08-09
### Fixed
- Fixed the issue that coverage report badge on README shows question mark.
  Use Coveralls instead of CodeClimate to get code coverage.

## [1.0.0] - 2018-02-28
### Added
- Support for adding CSV records to already existing files. Thanks to @jonmelcher. [PR #4](https://github.com/ryu1kn/csv-writer/pull/4)

## [0.0.3] - 2016-11-09
### Fixed
- Fixed the bug that fields were not always surrounded by double quotes
- Fixed the bug that white space characters on the edge of fields were trimmed

## [0.0.2] - 2016-10-15
### Fixed
- Fixed the bug that field values were not quoted when they have newline characters

## [0.0.1] - 2016-09-09
### Added
- Initial release of csv-writer
