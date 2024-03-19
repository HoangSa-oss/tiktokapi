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

puppeteer.use(StealthPlugin());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const date = '2024-03-10'
const dateTimeStamp = moment(date).format('X')
const TT_REQ_PERM_URL =
"https://www.tiktok.com/api/post/item_list/?WebIdLastTime=1694080746&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F120.0.0.0%20Safari%2F537.36%22&channel=tiktok_web&cookie_enabled=true&count=35&coverFormat=2&cursor=0&device_id=7276021344730334727&device_platform=web_pc&focus_state=true&from_page=user&history_len=2&is_fullscreen=false&is_page_visible=true&language=en&os=windows&priority_region=&referer=&region=VN&screen_height=1080&screen_width=1920&secUid=MS4wLjABAAAAPvTTzV9HF_QEH73vS5A61yx2CYGtiYkhQWlVkVelt5fr029jQVgMF_jYdOHdxo-p&tz_name=Asia%2FBangkok&verifyFp=verify_lm8zy1iy_x0Y0i89Y_01k7_4q5z_8WAT_GV80tpVMQzCh&webcast_language=en&msToken=&X-Bogus=DFSzswVO8ghANCdTt78vTt9WcBJp&_signature=_02B4Z6wo00001Bub5zwAAIDAG5vnP92oXAQbm-OAAGN31c";

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
        try {
              
        let urlRes = ''
        page.on('request',(req)=>{
            if(req.url().includes("https://www.tiktok.com/api/search/user/full")){
                urlRes = req.url()
            }
        })
        await page.setBypassCSP(true)
        await page.goto('https://www.tiktok.com')
        domTiktok = domtiktokkey.english
        await page.waitForSelector('a > span > svg')
        await page.focus(domTiktok.elementSearchBar)
        await delay(3000)
        await page.keyboard.type(job.data.keyword.trim(),{delay: 100})
        await delay(1000)
        await page.keyboard.press('Enter')
        await delay(10000)
        await page.click(domTiktok.elementClickAccount)
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
            // for(let i=0;i<1000;i++){
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
            //         let userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
            //         const unsignedUrl = `https://www.tiktok.com/api/challenge/item_list/?${qs}`
            //         let verify_fp = generateVerifyFp();
            //         let newUrl = unsignedUrl + "&verifyFp=" + verify_fp;
            //         let token = await page.evaluate(`generateSignature("${newUrl}")`);
            //         let signed_url = newUrl + "&_signature=" + token;
            //         let queryString = new URL(signed_url).searchParams.toString();
            //         let bogus = await page.evaluate(`generateBogus("${queryString}","${userAgent}")`);
            //         signed_url += "&X-Bogus=" + bogus;
            //         const xTtParams = await xttparams(queryString)
            //         for(let i=0;i<10;i++){
           
            //             try {
            //                 var res = await testApiReq({ userAgent, xTtParams ,TT_REQ_PERM_URL});
            //                 var { data } = res;
            //                 if(data.itemList!=undefined){
            //                     break;
            //                 }
            //             } catch (error) {
            //                 await delay(4000)
            //                 console.log("loi for:  "+error.message)
            //             }
                      
                      
                    
            //         }      
            //         console.log(data.hasMore)
            //         if(data.itemList!=undefined){
            //             data.itemList.map(async(item)=>{
            //                 if(item.createTime>dateTimeStamp){
            //                     if(item.author!=undefined){
            //                         let insert = new schemacomment({hashtag:job.data.hashtag,"date":item.createTime,urlPost:`https://www.tiktok.com/@${item.author.uniqueId}/video/${item.id}`})
            //                         await insert.save()
            //                     }
                            
            //                 }       
            //             })
            //         }
            //         if(data.hasMore==false){
            //             break;
            //         }
            //         await delay(2000)
            // }  
        } catch (error) {
       
            if(error.message!="Cannot read properties of undefined (reading 'slice')"){
                queueComment.add({hashtag:`${job.data.hashtag}`})
                console.log('add')
            }
         
            console.log(error.message)

        }
        // try {
        //     await page.close()
        //     await browser.close()
        // } catch (error) {
            
        // }
       
        // done();  
    })
}
for(let i=1;i<3;i++){
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
async function testApiReq({ userAgent, xTtParams,TT_REQ_PERM_URL }) {
    const options = {
      method: "GET",
      timeout: 50000,

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