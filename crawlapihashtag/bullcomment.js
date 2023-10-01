import Queue from 'bull';

const queueComment = new Queue('queueHashtagCrawlApi','redis://127.0.0.1:6379')

const urlVdideo = [

    "#uefachampionsleague",
    "#FPT",
    "#ChampionsLeague",
    "#FPT",
]

for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({hashtag:`${urlVdideo[i]}`})
    console.log({hashtag:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
