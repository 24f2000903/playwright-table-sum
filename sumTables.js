import { chromium } from 'playwright';

const seeds = [52,53,54,55,56,57,58,59,60,61];
let grandTotal = 0;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");
    await page.waitForTimeout(1000); // wait for dynamic content

    const sum = await page.evaluate(() => {
      let total = 0;
      document.querySelectorAll("table td").forEach(cell => {
        const num = parseFloat(cell.innerText);
        if (!isNaN(num)) total += num;
      });
      return total;
    });

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
