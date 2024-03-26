function printReport(pages) {
  console.log("Starting report...");
  console.log("===============================");
  const pagesArray = sortPages(pages);

  for (entry of pagesArray) {
    console.log(`Found ${entry[1]} internal links to ${entry[0]}`);
  }

  console.log("===============================");
  console.log("End of report");
}

function sortPages(pages) {
  // The follow does this:
  // let pagesArray = []
  // for (page in pages) {
  //   pagesArray.push([ page, pages[page] ])
  // }
  const pagesArray = Object.entries(pages);

  pagesArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  return pagesArray;
}

module.exports = {
  printReport,
  sortPages,
};
