import Queue from 'bull';

const queueComment = new Queue('queueHashtagCrawlApiCopy','redis://127.0.0.1:6379')

const urlVdideo = [
  "#thaicongshop",
  "#thaicong",

  "#thaicongtiktokshop",
  
]
for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({hashtag:`${urlVdideo[i]}`})
    console.log({hashtag:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
// const a = await queueComment.count()
// console.log(a)
