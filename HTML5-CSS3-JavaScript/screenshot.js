const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', 'Bootstrap-5', 'node_modules', 'puppeteer'));

const baseDir = __dirname;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fileUrl(filePath) {
  return `file:///${filePath.replace(/\\/g, '/')}`;
}

function findBrowserExecutable() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates = [
    'C:\\Users\\USER\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\USER\\AppData\\Local\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

async function clickIfExists(page, selector) {
  const element = await page.$(selector);
  if (!element) {
    return false;
  }
  await element.click();
  return true;
}

async function typeIfExists(page, selector, value) {
  const element = await page.$(selector);
  if (!element) {
    return false;
  }
  await element.click({ clickCount: 3 });
  await element.type(value);
  return true;
}

async function selectIfExists(page, selector, value) {
  const element = await page.$(selector);
  if (!element) {
    return false;
  }
  await page.select(selector, value);
  return true;
}

async function waitForText(page, selector, text, timeout = 15000) {
  await page.waitForFunction(
    ({ selector, text }) => {
      const element = document.querySelector(selector);
      return element && element.textContent && element.textContent.includes(text);
    },
    { timeout },
    { selector, text }
  );
}

async function interactHomePage(page) {
  try {
    await waitForText(page, '#loaderText', 'Latest Announcements', 30000);
  } catch (err) {
    console.log('Announcement wait timed out, continuing with page capture.');
  }

  try {
    await page.waitForFunction(
      () => document.querySelectorAll('#eventsContainer .event-card').length >= 3,
      { timeout: 30000 }
    );
  } catch (err) {
    console.log('Event card wait timed out, continuing with page capture.');
  }

  const firstGallery = await page.$('.gallery-img');
  if (firstGallery) {
    await firstGallery.click({ clickCount: 2 });
  }

  const firstRegister = await page.$('#eventsContainer .event-card button:not([disabled])');
  if (firstRegister) {
    await firstRegister.click();
    await sleep(350);
  }

  await typeIfExists(page, '#eventSearch', 'Tech');
  await page.keyboard.press('Enter');
  await sleep(250);

  await selectIfExists(page, '#categoryFilter', 'workshop');
  await sleep(250);

  await typeIfExists(page, 'input[name="fullName"]', 'Asha Kumar');
  await typeIfExists(page, 'input[name="userEmail"]', 'asha@example.com');
  await typeIfExists(page, '#phoneField', '9876543210');
  await typeIfExists(page, 'input[name="attendDate"]', '2026-07-20');
  await selectIfExists(page, '#eventSelect', 'workshop');
  await typeIfExists(page, '#messageBox', 'Looking forward to the music fest');
  await sleep(250);

  await clickIfExists(page, '#registerBtn');
  try {
    await waitForText(page, '#formFeedback', 'Success id:', 60000);
  } catch (err) {
    console.log('Form success wait timed out, continuing with page capture.');
  }
  await sleep(500);

  const videoStarted = await page.$eval('#promoVideo', async video => {
    try {
      video.muted = true;
      await video.play();
      return true;
    } catch (err) {
      return false;
    }
  }).catch(() => false);

  if (videoStarted) {
    await sleep(4000);
  } else {
    console.log('Video did not start, continuing with page capture.');
    await sleep(4000);
  }
}

async function takeScreenshot(page, htmlFile, screenshotName, viewport = { width: 1440, height: 1800 }) {
  await page.setViewport(viewport);
  await page.goto(fileUrl(path.join(baseDir, htmlFile)), { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(500);

  if (htmlFile === 'index.html') {
    await interactHomePage(page);
  }

  await page.screenshot({
    path: path.join(baseDir, screenshotName),
    fullPage: true
  });
  console.log(`Saved screenshot: ${path.join(baseDir, screenshotName)}`);
}

async function main() {
  const executablePath = findBrowserExecutable();
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await takeScreenshot(page, 'index.html', 'index-screenshot.png');
  await takeScreenshot(page, 'help.html', 'help-screenshot.png', { width: 900, height: 700 });

  await browser.close();
  console.log('All interactive screenshots completed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
