
function printReports(pages) {
    console.log("===============");
    console.log("REPORT");
    console.log("===============");
    const sortedPages = sortpages(pages)
    
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page : ${url}`);
    }
    console.log("===============");
    console.log("END REPORT");
    console.log("===============");

}


function sortpages(pages) {

  const pageArr = Object.entries(pages);
  pageArr.sort((a, b) => {
    const aHits = a[1];
    const bHits = b[1];
    return bHits - aHits;
  });

  return pageArr;
}

module.exports = {
  sortpages,
  printReports,
};
