import puppeteer from 'puppeteer-extra';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Queue from 'bull';
import schemacomment from './schema/schemacomment.js';
const queueComment = new Queue('queueCommentCrawlApi','redis://127.0.0.1:6379')
import delay from 'delay'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import  {executablePath} from 'puppeteer'
import cookie from "./cookiedefault.json" assert { type: 'json' }

puppeteer.use(StealthPlugin());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const  tiktokProfile = async()=>{
    queueComment.process(1,async (job,done)=>{

        const browser = await puppeteer.launch({
            headless: false,
            // userDataDir: '/Users/hoangsa/Library/Application Support/Google/Chrome/Profile 3',
            args: [
                '--enable-features=NetworkService',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--shm-size=8gb', // this solves the issue
                '--user-agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"'
                ],
                ignoreHTTPSErrors: true,
                executablePath:executablePath(),  
        });
        const page = await browser.newPage({});
        await page.setCookie(...cookie[1][4])

        await page.setBypassCSP(true)
        const a = await page.goto("https://www.tiktok.com",{
        })
        await page.on('request',req=>{
           console.log(req.headers())
        })
        await delay(3000)
        page.goto(job.data.urlVideo,{
        })
        const urlRes = await page.waitForRequest(req=>{
            return req.url().includes("https://www.tiktok.com/api/challenge/item_list")
        })

        const msToken = urlRes.url().split('&')[31].slice(8,1000000000000)
        const challengeID = urlRes.url().split('&')[9].slice(12,1000000000000)
        let LOAD_SCRIPTS = ["signer.js", "webmssdk.js", "xbogus.js"];
            LOAD_SCRIPTS.forEach(async (script) => {
            await page.addScriptTag({
                path: `${__dirname}/javascript/${script}`,
            });
            // console.log("[+] " + script + " loaded");
        });
        await page.evaluate(() => {
            window.generateSignature = function generateSignature(url) {
                if (typeof window.byted_acrawler.sign !== "function") {
                throw "No signature function found";
                }
                return window.byted_acrawler.sign({ url: url });
            };
            window.generateBogus = function generateBogus(params) {
                if (typeof window.generateBogus !== "function") {
                throw "No X-Bogus function found";
                }
                return window.generateBogus(params);
            };
            return this;
        });
        // for(let i=0;i<1;i++){
        //     const PARAMS = {
        //         aid: "1988",
        //         count: 30,
        //         challengeID: challengeID,
        //         cursor: i*30,
        //         cookie_enabled: true,
        //         screen_width: 0,
        //         screen_height: 0,
        //         browser_language: "",
        //         browser_platform: "",
        //         browser_name: "",
        //         browser_version: "",
        //         browser_online: "",
        //         timezone_name: "Europe/London",
        //       };
        //         const qsObject = new URLSearchParams(PARAMS) ;
        //         const qs = qsObject.toString();

        //         const unsignedUrl = `https://www.tiktok.com/api/challenge/item_list/?${qs}`;
        //         let verify_fp = "verify_lj720og1_ONJPD8Y8_fmGX_4iwe_8rRB_UzTxV9tjNrKV";
        //         let newUrl = unsignedUrl + "&verifyFp=" + verify_fp;
        //         let token = await page.evaluate(()=>{
        //             return generateSignature("${newUrl}")
        //         });
        //         let signed_url = newUrl + "&_signature=" + token;
        //         let userAgent = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        //         let queryString = new URL(signed_url).searchParams.toString();
        //         const xTtParams = await xttparams(queryString)
        //         const res = await testApiReq({ userAgent, xTtParams });
        //         const { data } = res;
        //         console.log(data);
        // }
        // try {
        //     await page.close()
        //     await browser.close();
        // } catch (error) {
        // }
        console.log(urlRes.headers())
        console.log('done')
        done();   
    })
}
tiktokProfile()  


async function xttparams(query_str) {
    query_str += "&is_encryption=1";

    // Encrypt query string using aes-128-cbc
    const cipher = createCipheriv("aes-128-cbc", this.password, this.password);
    return Buffer.concat([cipher.update(query_str), cipher.final()]).toString(
        "base64"
    );
}
async function testApiReq({ userAgent, xTtParams }) {
    const options = {
      method: "GET",
      headers: {
        "user-agent": userAgent,
        "x-tt-params": xTtParams,
      },
      url: TT_REQ_PERM_URL,
    };
    return axios(options);
  }