const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
const validUrl = require('valid-url');

var parseUrl = function(url) {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }

    return url;
};

app.get('/', function(req, res) {
    var urlToScreenshot = parseUrl(req.query.url);

    if (validUrl.isWebUri(urlToScreenshot)) {
        console.log('Screenshotting: ' + urlToScreenshot);
        (async() => {
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const urls = ["google.com","twitter.com","facebook.com"]
            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                await page.goto(`${url}`);
                await page.waitForNavigation({ waitUntil: 'networkidle' });
                await page.screenshot().then(function(buffer) {
                    res.setHeader('Content-Disposition', 'attachment;filename="' + urlToScreenshot + '.png"');
                    res.setHeader('Content-Type', 'image/png');
                    res.send(buffer)
                });
            }

            

            await browser.close();
        })();
    } else {
        res.send('Invalid url: ' + urlToScreenshot);
    }

});

app.listen(port, function() {
    console.log('App listening on port ' + port)
})
