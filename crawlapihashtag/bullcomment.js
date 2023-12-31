import Queue from 'bull';

const queueComment = new Queue('queueHashtagCrawlApi','redis://127.0.0.1:6379')

const urlVdideo = [
  
    "#BigSea_Land" ,
    "#BigSea_Group",
    "#BigSeaLand" ,
    "#Bigseagroup",
      "#skodavietnam",
      "#skodagovap",
    "#mgvietnam",
    "#HCMCFILMFESTIVAL",
    "#FilmFestival",
    "#hiff2024",
    "#welcometohiff",
    "#LiênHoanPhim",
    "#ChàoMừngĐếnHIFF",
    "#PhépMàuĐiệnẢnh",
    "#HIFF2024",
    "#SaigonFilmScene",
    "#HIFFSteeringBoard",
    "#HCMCCultureSports",
    "#lienhoanphimquoctethanhphohochiminh",
    "#liênhoanphim",
    "#lienhoanphim",
    "#cinetour",
    "#CineParty",
    "#GiaoLưuĐiệnẢnh",
    "#KOCVIETNAM",
    "#KOCVIETNAM2023",
    "#DaichienKOC",
    "#VCCorp",
    "#Kenh14",
    "#Admicro",
    "#ahamove",
    "#signaturebyMvillage",
    "#benphaxacsong",
    "#culaoxacsong",
    "#JnT",
    "#jntexpressvietnam",
    "#jntexpress",
    "#jtexpressvn",
    "#taychayjnt",
    "#giaohangjt",
    "#bưucụcghtk",
    "#nhakiem",
    "#photghtk",
    "#shopeeExpress",
    "#taychayshopeeexpress",
    "#viettelpostnhanh",
    "#buucucviettelpost",
    "#giao_hàng_viettel",
    "#tẩychayviettelpost",
    "#buuchinhViettel",
    "#BEST_Express",
    "#bestexpress",
    "#everywherewithyou",
    "#buucucbest",
    "#photbestexpress",
    "#bestinc",
    "#bestincvietnam",
    "#buudienvietnam",
    "#vnpost",
    "#vietnampost",
    "#phốtVNPost",
    "#taychayvietnampost",
    "#ghnexpress",
    "#GHN",
    "#giaohangnhanh",
    "#trợgiúpgiảiđápkhiếunại",
    "#buucucGHN",
    "#tamsugiaohangcungghn",
    "#ghnhn",
    "#GHNHCM",
    "#GHN_phốt",
    "#ghnlừađảo",
    "#taychayghn",
    "#ghnvotrachnhiem",
    "#GHNlamhuhonghang",
    "#taychaygiaohangnhanh",
    "#ghnlàmănthiếutráchnhiệm",
    "#ghntraohang",
    "#ghnancap",
    "#giaohangnhanhantrom",
    "#phốtghn",
    "#ghnrutruot",
    "#Giao_hàng_nhanh_gian_lận",
    "#giaohangnhanhgianlan",
    "#comehomevietnam",
    "#firstoptionfx",
    "#infofinance",
    "#infofx",
    "#trustmarkets",
    "#LionBrokers",
    "#stradex",
    "#globalk",
    "#amtradex",
    "#extrim",
    "#iqxtrade",
    "#macroequities",
    "#sanmacroequities",
    "#dbayexchange",
    "#dbay",
    "#merritrade",
    "#londonex",
    "#zenomarkets",
    "#tapchitrading",
    "#neotrades",
    "#tradetime",
    "#asxmarkets",
    "#alphatradinghub",
    "#ATH",
    "#thebrokers",
    "#chmarkets",
    "#dexinvesting",
    "#lpltrade",
    "#leapcm",
    "#btmarkets",
    "#kamacapital",
    "#jasfx",
    "#iswiss",
    "#honorfx",
    "#MoMo",
    "#GiayChungNhanGenC",
    "#NgayKhongTienMat",
    "#MoMoBonBon",
    "#TrieuLyNuoc0Đ",
    "#SieuUngDungMoMo",
    "#MoMo",
    "#GiayChungNhanGenC",
    "#NgayKhongTienMat",
    "#MoMoBonBon",
    "#Shinhanfiance",
    "#CaSĩMặtNạ",
    "#CaSiMatNaMua2",
    "#casimatna",
    "#themaskedsingervietnam",
    "#TheMaskedSinger",
    "#masksinger",
    "#MusicVieChannel",
    "#VieON",
    "#VieChannel",
    "#TLC",
    "#dienquang",
    "#rangdong",
    "#vianco",
    "#viancolighting",
    "#đènledvianco",
    "#doibongsangden",
    "#doibong_sangden",
    "#HousenHome",
    "#HouseAreYou",
    "#firstoptionfx",
    "#infofinance",
    "#infofx",
    "#trustmarkets",
    "#LionBrokers",
    "#stradex",
    "#globalk",
    "#amtradex",
    "#extrim",
    "#iqxtrade",
    "#macroequities",
    "#sanmacroequities",
    "#dbayexchange",
    "#dbay",
    "#merritrade",
    "#londonex",
    "#zenomarkets",
    "#tapchitrading",
    "#neotrades",
    "#tradetime",
    "#asxmarkets",
    "#alphatradinghub",
    "#ATH",
    "#thebrokers",
    "#chmarkets",
    "#dexinvesting",
    "#lpltrade",
    "#leapcm",
    "#btmarkets",
    "#kamacapital",
    "#jasfx",
    "#iswiss",
    "#honorfx",
    "#ibmex",
    "#ibmexvietnam",
    "#chikky",
    "#serumapi",
    "#HumanActPrize",
    "#RoadtoGalaHAP",
]

for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({hashtag:`${urlVdideo[i]}`})
    console.log({hashtag:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
// const a = await queueComment.count()
// console.log(a)
