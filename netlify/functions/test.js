
const axios = require('axios');
const cheerio = require('cheerio');



exports.handler = async (info) => {

    // const searchField = "fullstack%20Developer"
    const { jobTitle } = JSON.parse(info.body)
    console.log(jobTitle)
    const url = `https://de.indeed.com/jobs?q=${jobTitle}&l=&from=searchOnDesktopSerp`;

    const apiKey = "be608c635565a46f7d18b61113ffe3df9f2e6cda"
    // return { statusCode: 200, body: JSON.stringify({ jobTitle }) }
    // const myfunc = async () => {

    try {
        const response = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                'url': url,
                'apikey': apiKey,
                'js_render': 'false',
                'premium_proxy': 'false',
            },
        })
        const $ = cheerio.load(response.data);
        const jobs = [];
        $('li.css-5lfssm').each((index, element) => {
            const title = $(element).find('[id^="jobTitle"]').text().trim();
            const company = $(element).find('[data-testid="company-name"]').text().trim();
            const location = $(element).find('[data-testid="text-location"]').text().trim();
            jobs.push({ company, title, location });
        })
        return { statusCode: 200, body: JSON.stringify({ jobs }) }
    } catch (error) {
        console.log("error")
    }

    // }
    // myfunc()

}