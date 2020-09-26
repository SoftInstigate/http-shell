#!/usr/bin/env node

// get node off the argv
process.argv.shift()

if (process.env.TRAVIS_JOB_ID) {
  process.argv.push('--no-colors')
}

process.argv.push('--command-context=[""]')
process.env.KUI_HEADLESS = true

require('@kui-shell/core').main(process.argv)