const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
  if (argv.length < 3 || argv.length > 3) {
    console.log(argv.length)
    console.log("Error: this program requires one argument.")
    return process.exit(1)
  }

  const url = argv[2]
  try {
    const pages = await crawlPage(url, url, {})
    printReport(pages)
  } catch (err) {
    console.log('got to here')
    console.log(err.message)
  }
}

main()
