const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const defaultViewport = { width: 1280, height: 1024 };

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

async function addActiveClass(page, selector) {
    await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (element) {
            element.classList.add('active');
        }
    }, selector);
}

async function preventFormSubmit(page) {
    await page.evaluate(() => {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', event => event.preventDefault(), { once: true });
        });
    });
}

async function activateNavItemGroup(page, listSelector, index) {
    await page.evaluate((args) => {
        const items = [...document.querySelectorAll(`${args.listSelector} .nav-link`)];
        if (!items.length || !items[args.index]) {
            return;
        }
        items.forEach((item, itemIndex) => {
            item.classList.toggle('active', itemIndex === args.index);
            if (itemIndex === args.index) {
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }, { listSelector, index });
}

async function clickNavItemByIndex(page, listSelector, index) {
    await page.evaluate((args) => {
        const items = [...document.querySelectorAll(`${args.listSelector} .nav-link`)];
        if (items[args.index]) {
            items[args.index].click();
        }
    }, { listSelector, index });
}

function viewportForFile(fileName) {
    switch (fileName) {
        case '06-1-navbar.html':
        case '10-1-navbar.html':
            return { width: 390, height: 860 };
        default:
            return defaultViewport;
    }
}

async function interactWithPage(page, fileName) {
    switch (fileName) {
        case '01-1-cdn.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '01-2-local.html':
            if (await clickIfExists(page, 'button.btn.btn-success')) {
                await addActiveClass(page, 'button.btn.btn-success');
            }
            break;
        case '02-2-bundle.html':
            if (await clickIfExists(page, 'button[data-bs-target="#demoModal"]')) {
                await page.waitForFunction(() => document.querySelector('#demoModal')?.classList.contains('show'), {
                    timeout: 10000
                });
            }
            break;
        case '06-1-navbar.html':
            await sleep(250);
            break;
        case '06-2-card.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '08-1-register.html':
            await preventFormSubmit(page);
            await typeIfExists(page, '#username', 'johndoe');
            await typeIfExists(page, '#email', 'john@example.com');
            await selectIfExists(page, '#eventSelect', 'ai');
            await clickIfExists(page, '#termsCheck');
            await clickIfExists(page, 'button[type="submit"]');
            break;
        case '08-2-floating.html':
            await preventFormSubmit(page);
            await typeIfExists(page, '#floatingInput', 'user@example.com');
            await typeIfExists(page, '#floatingPassword', 'Secret123!');
            await clickIfExists(page, 'button[type="submit"]');
            break;
        case '09-1-contextual.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '09-2-groups.html':
            await clickIfExists(page, 'label[for="btncheck1"]');
            await clickIfExists(page, 'label[for="btncheck3"]');
            break;
        case '10-1-navbar.html':
            await clickIfExists(page, 'button.navbar-toggler');
            await page.waitForFunction(() => document.querySelector('#navbarSupportedContent')?.classList.contains('show'), {
                timeout: 10000
            });
            break;
        case '10-2-tabs.html':
            await clickNavItemByIndex(page, '.nav-tabs', 1);
            await activateNavItemGroup(page, '.nav-tabs', 1);
            await clickNavItemByIndex(page, '.nav-pills', 2);
            await activateNavItemGroup(page, '.nav-pills', 2);
            break;
        case '11-1-card.html':
            if (await clickIfExists(page, 'a.btn.btn-primary')) {
                await addActiveClass(page, 'a.btn.btn-primary');
            }
            break;
        case '12-2-pricing.html':
            if (await clickIfExists(page, '.card .btn.btn-primary')) {
                await addActiveClass(page, '.card .btn.btn-primary');
            }
            break;
        case '13-2-gradient.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '14-1-display.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '14-2-sidebar.html':
            await sleep(250);
            break;
        case '15-2-shadows.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        case '16-1-fixed.html':
            await page.evaluate(() => window.scrollTo(0, 700));
            await sleep(250);
            break;
        case '17-1-social.html':
            if (await clickIfExists(page, 'footer a.text-secondary')) {
                await page.evaluate(() => {
                    const link = document.querySelector('footer a');
                    if (link) {
                        link.classList.remove('text-secondary');
                        link.classList.add('text-primary');
                    }
                });
            }
            break;
        case '17-2-icons.html':
            if (await clickIfExists(page, 'button.btn.btn-outline-primary')) {
                await addActiveClass(page, 'button.btn.btn-outline-primary');
            }
            break;
        case '18-1-modal.html':
            if (await clickIfExists(page, 'button[data-bs-target="#exampleModal"]')) {
                await page.waitForFunction(() => document.querySelector('#exampleModal')?.classList.contains('show'), {
                    timeout: 10000
                });
            }
            break;
        case '18-2-accordion.html':
            if (await clickIfExists(page, 'button[data-bs-target="#collapseThree"]')) {
                await page.waitForFunction(() => document.querySelector('#collapseThree')?.classList.contains('show'), {
                    timeout: 10000
                });
            }
            break;
        case '19-1-sass.html':
        case '19-2-customize.html':
            if (await clickIfExists(page, 'button.btn.btn-primary')) {
                await addActiveClass(page, 'button.btn.btn-primary');
            }
            break;
        default:
            break;
    }
}

async function takeScreenshots() {
    const executablePath = findBrowserExecutable();
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    const exercises = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Exercise-'))
        .map(dirent => dirent.name)
        .sort();

    for (const exercise of exercises) {
        const exercisePath = path.join(baseDir, exercise);
        const files = fs.readdirSync(exercisePath)
            .filter(file => file.endsWith('.html'))
            .sort();

        for (const file of files) {
            const filePath = path.join(exercisePath, file);
            const screenshotPath = path.join(exercisePath, file.replace('.html', '-screenshot.png'));
            const viewport = viewportForFile(file);

            await page.setViewport(viewport);
            await page.goto(fileUrl(filePath), { waitUntil: 'networkidle2', timeout: 60000 });
            await sleep(300);
            await interactWithPage(page, file);
            await sleep(300);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Saved screenshot: ${screenshotPath}`);
        }
    }

    await browser.close();
    console.log('All interactive screenshots completed.');
}

takeScreenshots().catch(err => {
    console.error(err);
    process.exit(1);
});
