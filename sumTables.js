const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [52,53,54,55,56,57,58,59,60,61];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const sum = await page.evaluate(() => {
      let total = 0;
      const cells = document.querySelectorAll("table td");
      cells.forEach(cell => {
        const num = parseFloat(cell.innerText);
        if (!isNaN(num)) total += num;
      });
      return total;
    });

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);
  await browser.close();
})();
