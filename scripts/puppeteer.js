const puppeteer = require("puppeteer");

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({ defaultViewport: null });

  const page = await browser.newPage();

  // Navigate to the page you want to capture
  await page.goto("http://localhost:3000/z7qbl04yaf", {
    waitUntil: "networkidle0",
  });

  // Generate PDF
  await page.pdf({
    path: "output.pdf",
    format: "A3",
    printBackground: true,
    scale: 0.9,
  });

  // Close the browser
  await browser.close();
})();
