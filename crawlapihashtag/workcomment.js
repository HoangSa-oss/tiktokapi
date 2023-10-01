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

puppeteer.use(StealthPlugin());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const date = '2023-02-01'
const dateTimeStamp = moment(date).format('X')
const TT_REQ_PERM_URL =   "https://www.tiktok.com/api/challenge/item_list/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=0.54&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F109.0.0.0%20Safari%2F537.36&challengeID=13187&channel=tiktok_web&cookie_enabled=true&count=30&cursor=30&device_id=7195820289077478917&device_platform=web_pc&focus_state=true&from_page=hashtag&history_len=5&is_fullscreen=false&is_page_visible=true&language=en&os=mac&priority_region=&referer=&region=RO&root_referer=https%3A%2F%2Fwww.tiktok.com%2F404%3FfromUrl%3D%2Fhashtag&screen_height=1120&screen_width=1792&tz_name=Europe%2FBucharest&verifyFp=verify_ldo6d7go_rfalj7WR_Cqtf_4z9G_Aj1J_WSrSUzWZSJ6U&webcast_language=en&msToken=8G5wMuMotboG4hiWsuvDxdQ-VbOZh29r-tMYpFzA56ODNmsk1_RL6xYfiJJvzznY8jK4h4m9CHR2QHJLayqE7lzKFm97L5pmXen7VCGVVIt9s6vU2nNnlmiZW-HTn10YT83WW__OMEaK42s=&X-Bogus=DFSzswVOe5bANjvTS4iHxr7TlqCW&_signature=_02B4Z6wo0000146bL2gAAIDAGk10ZlbQ1n-OmyvAAICC3d";

const  tiktokProfile = async()=>{
    const queueComment = new Queue('queueHashtagCrawlApi','redis://127.0.0.1:6379')
  
    queueComment.process(1,async (job,done)=>{
        try {
              await delay(4000)
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
        let urlRes = ''
        page.on('request',(req)=>{
            if(req.url().includes("https://www.tiktok.com/api/challenge/item_list")){
                urlRes = req.url()
            }
        })
        await page.setBypassCSP(true)
        await page.goto(`https://www.tiktok.com/tag/${job.data.hashtag.slice(1,2000)}`,{      waitUntil: 'networkidle2'})
     
        try {
            // await page.waitForRequest(req=>{
            //     return req.url().includes("https://www.tiktok.com/api/challenge/item_list")
            // })
            // await page.goto("https://www.tiktok.com",{  waitUntil: 'networkidle0'})
    
            // await page.focus("#app-header > div > div.e15qqn8h0 > div > form > input")
            // await page.keyboard.type(job.data.hashtag.trim(),{delay: 100})
            // await delay(1000)
            // await page.keyboard.press('Enter')
            // await delay(3000)
            // console.log(job.data)
           
            const challengeID = urlRes.split('&')[9].slice(12,1000000000000)
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
            await delay(3000)
            let  b = 0
            for(let i=0;i<1000;i++){
                const PARAMS = {
                    aid: "1988",
                    count: 30,
                    challengeID: challengeID,
                    cursor: i*30,
                    cookie_enabled: true,
                    screen_width: 0,
                    screen_height: 0,
                    browser_language: "",
                    browser_platform: "",
                    browser_name: "",
                    browser_version: "",
                    browser_online: "",
                    timezone_name: "Europe/London",
                  };
                    const qsObject = new URLSearchParams(PARAMS) ;
                    const qs = qsObject.toString();
                    let userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
                    const unsignedUrl = `https://www.tiktok.com/api/challenge/item_list/?${qs}`
                    let verify_fp = generateVerifyFp();
                    let newUrl = unsignedUrl + "&verifyFp=" + verify_fp;
                    let token = await page.evaluate(`generateSignature("${newUrl}")`);
                    let signed_url = newUrl + "&_signature=" + token;
                    let queryString = new URL(signed_url).searchParams.toString();
                    let bogus = await page.evaluate(`generateBogus("${queryString}","${userAgent}")`);
                    signed_url += "&X-Bogus=" + bogus;
                    const xTtParams = await xttparams(queryString)
                    const res = await testApiReq({ userAgent, xTtParams });
                    const { data } = res;
                    console.log(data.hasMore)
                    if(data.itemList!=undefined){
                        data.itemList.map(async(item)=>{
                            if(item.createTime>dateTimeStamp){
                                if(item.author!=undefined){
                                    let insert = new schemacomment({hashtag:job.data.hashtag,"date":item.createTime,urlPost:`https://www.tiktok.com/@${item.author.uniqueId}/video/${item.id}`})
                                    await insert.save()
                                }
                            
                            }       
                        })
                    }
                    
                   
                  
                    if(data.hasMore==false){
                        break;
                    }
                    await delay(3000)
                
              
            }  
        } catch (error) {
            const a = await page.evaluate(()=>{
                return document.querySelector("#main-content-challenge > div > main > div > .emuynwa1")?.textContent
            })
            if(a!="Couldn't find this hashtag"&&a!="No videos with this hashtag yet"){
                queueComment.add({hashtag:`${job.data.hashtag}`})
                console.log('add')
            }
            console.log({hashtag:`${job.data.hashtag}`})

            console.log(error)

        }
        try {
            await page.close()
            await browser.close()
        } catch (error) {
            
        }
       
        done();  
         
        } catch (error) {
            console.log(error)
        }
      
    })
}
for(let i=0;i<3;i++){
    tiktokProfile()  
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
async function testApiReq({ userAgent, xTtParams }) {
    const options = {
      method: "GET",
      timeout: 20000,

      headers: {
        "user-agent": userAgent,
        "x-tt-params": xTtParams,
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