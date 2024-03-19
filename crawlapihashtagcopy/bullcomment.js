import Queue from 'bull';

const queueComment = new Queue('queueHashtagCrawlApiCopy','redis://127.0.0.1:6379')

const urlVdideo = [
  "#ChiDepDapGioReSong",
  "#ChiDep2023",
  "#2Ngay1Dem",
  "#ConcertSMDCL",
  "#saonhapngu2024",
  "#Saonhapngu",
  "#GanKetLamNenTetDieuKy",
  "#NgoiSaoXanh2023",
  "#GiaiThuongNgoiSaoXanh",
  "#AsianTVAwards2023",
  "#MissGlobal2023",
  "#BETHESKY",
  "#bethesky",
  "#QuyenNangGalaxyAI",
  "#lehoiTetViet",
  "#TetVincom2024",
  
]
for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({hashtag:`${urlVdideo[i]}`})
    console.log({hashtag:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
// const a = await queueComment.count()
// console.log(a)
