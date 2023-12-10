import Queue from 'bull';

const queueComment = new Queue('queueHashtagCrawlApiCopy','redis://127.0.0.1:6379')

const urlVdideo = [
  "#miule",
  "#mono",
  "#mtp",
  "#m-tp",
  "#sontung",
  "#sontungmtp",
  "#mytam",
  "#hoaminzy",
  "#puka",
  "#gintuankiet",
  "#leduongbaolam",
  "#minhtu",
  "#chipu",
  "#huonggiang",
  "#hoahauhuonggiang",
  "#tranthanh",
  "#tranthanhtown",
]

for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({hashtag:`${urlVdideo[i]}`})
    console.log({hashtag:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
// const a = await queueComment.count()
// console.log(a)
