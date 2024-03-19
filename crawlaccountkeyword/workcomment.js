import puppeteer from 'puppeteer-extra';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Queue from 'bull';
import schemacomment from './schema/schemacomment.js';
import delay from 'delay'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import  {executablePath} from 'puppeteer'
import {createCipheriv } from 'crypto'
import moment from 'moment';
import domtiktokkey from './domtiktokkey.json' assert { type: 'json' }
import cookie from './cookiedefault.json' assert { type: 'json' }

puppeteer.use(StealthPlugin());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const date = '2024-03-10'
const dateTimeStamp = moment(date).format('X')

const  tiktokProfile = async(i)=>{
    const queueComment = new Queue('queueAccount','redis://127.0.0.1:6379')
    process.setMaxListeners(0);
    queueComment.process(1,async (job,done)=>{
        var domTiktok = ''
        await delay(i*1000)
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
        await delay(1000)
        const page = await browser.newPage({});
       
        let cookieArray = cookie[10]
        await page.setCookie(...cookieArray[2])
        try {
        const userAgent = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        let urlRes = ''
        page.on('request',(req)=>{
            if(req.url().includes("https://www.tiktok.com/api/search/user/full")){
                urlRes = req.url()
            }
        })
        await page.setBypassCSP(true)
        await page.goto('https://www.tiktok.com')
        domTiktok = domtiktokkey.english
        // await page.waitForSelector('a > span > svg')
        await page.focus(domTiktok.elementSearchBar)
        await delay(3000)
        await page.keyboard.type(job.data.keyword.trim(),{delay: 100})
        await delay(1000)
        await page.keyboard.press('Enter')
        await delay(10000)
        await page.evaluate((domTiktok)=>{
            document.querySelector(domTiktok.elementClickAccount).click()
        },domTiktok);
        await delay(5000)
        const page2 = await browser.newPage({});
        await page2.goto(urlRes,{ waitUntil: "networkidle0" })
        const text = await page2.evaluate(()=>{
            return document.querySelector("body > pre")?.textContent
        });
        var data = JSON.parse(text)
        data.user_list.map(async(x)=>{
            let insert = new schemacomment({ 
                keyword:job.data.keyword,
                urlAuthor:`https://www.tiktok.com/@${x.user_info.unique_id}`,
                nameAuthor:x.user_info.unique_id,
                nicknameAuthor:x.user_info.nickname,
                descriptionAuthor:x.user_info.signature.replace(/\r?\n/g, " "),
                follow:x.user_info.follower_count,
            })
            await insert.save()
        })
        const search_id = data.rid
        const arrayUrl = urlRes.split('&')
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
            // await delay(3000)
            // let  b = 0
            for(let i=1;i<1000;i++){
                const PARAMS = {
                    WebIdLastTime: 1704247151,
                    aid: 1988,
                    app_language: "en",
                    app_name: "tiktok_web",
                    browser_language: "en-US",
                    browser_name: "Mozilla",
                    browser_online: true,
                    browser_platform: "Win32",
                    browser_version: "537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                    channel: "tiktok_web",
                    cookie_enabled: true,
                    cursor: i*10,
                    device_id: 7319685601477264897,
                    device_platform: "web_pc",
                    focus_state: false,
                    from_page: "search",
                    history_len: 4,
                    is_fullscreen: false,
                    is_page_visible: true,
                    keyword: job.data.keyword,
                    os: "windows",
                    priority_region: "",
                    referer: "",
                    region: "VN",
                    screen_height: 900,
                    screen_width: 1440,
                    search_id: search_id,
                    tz_name: "Asia/Saigon",
                    web_search_code: {"tiktok":{"client_params_x":{"search_engine":{"ies_mt_user_live_video_card_use_libra":1,"mt_search_general_user_live_card":1}},"search_server":{}}},
                    webcast_language: "en"
                  };
                    const qsObject = new URLSearchParams(PARAMS) ;
                    const qs = qsObject.toString();
                    let userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
                    const unsignedUrl = `https://www.tiktok.com/api/search/user/full/?${qs}`
                    let verify_fp = await generateVerifyFp();
                    let newUrl = unsignedUrl + "&verifyFp=" + verify_fp;
                    let token = await page.evaluate(`generateSignature("${newUrl}")`);
                    let signed_url = newUrl + "&_signature=" + token;
                    let queryString = new URL(signed_url).searchParams.toString();
                    let bogus = await page.evaluate(`generateBogus("${queryString}","${userAgent}")`);
                    signed_url += "&X-Bogus=" + bogus;
                    for(let i=0;i<10;i++){
                        try {
                            await page2.goto(signed_url,{ waitUntil: "networkidle0" })
                            const text = await page2.evaluate(()=>{
                                return document.querySelector("body > pre")?.textContent
                            });
                            var data = JSON.parse(text)
                            if(data.user_list!=undefined){
                                break;
                            }
                        } catch (error) {
                            await delay(4000)
                            console.log("loi for:  "+error.message)
                        }
                    }      
                    console.log(data.has_more)
                    if(data.user_list!=undefined){
                        data.user_list.map(async(x)=>{
                            let insert = new schemacomment({ 
                                keyword:job.data.keyword,
                                urlAuthor:`https://www.tiktok.com/@${x.user_info.unique_id}`,
                                nameAuthor:x.user_info.unique_id,
                                nicknameAuthor:x.user_info.nickname,
                                descriptionAuthor:x.user_info.signature.replace(/\r?\n/g, " "),
                                follow:x.user_info.follower_count,
                            })
                            await insert.save()
                        })
                    }
                    if(data.has_more==0){
                        break;
                    }
                    await delay(1000)
            }  
        } catch (error) {
       
            if(error.message!="Cannot read properties of undefined (reading 'slice')"){
                queueComment.add({keyword:`${job.data.keyword}`})
                console.log('add')
            }
         
            console.log(error.message)

        }
        try {
            await page.close()
            await browser.close()
        } catch (error) {
            
        }
       
        done();  
    })
}
for(let i=0;i<1;i++){
    tiktokProfile(i)  
}


async function xttparams(query_str) {
    query_str += "&is_encryption=1";
    const password = "webapp1.0+202106";
    // Encrypt query string using aes-128-cbc
    const cipher = createCipheriv("aes-128-cbc", password, password);
    return Buffer.concat([cipher.update(query_str), cipher.final()]).toString(
        "base64"
    );
}
async function testApiReq({ userAgent,TT_REQ_PERM_URL }) {
    const options = {
      method: "GET",
      timeout: 50000,

      headers: {
        "user-agent": userAgent,
      },
      url: TT_REQ_PERM_URL,
    };
    return axios(options);
  }
async function generateVerifyFp() {
    var e = Date.now();
    var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
        ),
        e = t.length,
        n = Date.now().toString(36),
        r = [];
    (r[8] = r[13] = r[18] = r[23] = "_"), (r[14] = "4");
    for (var o = 0, i = void 0; o < 36; o++)
        r[o] ||
        ((i = 0 | (Math.random() * e)), (r[o] = t[19 == o ? (3 & i) | 8 : i]));
    return "verify_" + n + "_" + r.join("");
} 