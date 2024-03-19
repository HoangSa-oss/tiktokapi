import Queue from 'bull';

const queueComment = new Queue('queueAccount','redis://127.0.0.1:6379')

const urlVdideo = [
  "chăm sóc sức khỏe",
  "dịch vụ chăm sóc sức khỏe",
  "Healthcare",
  "dịch vụ y tế",
  "bảo hiểm y tế",
  "sản xuất thuốc và thiết bị y tế",
  "mô hình chăm sóc y tế",
  "hệ sinh thái chăm sóc sức khỏe",
  "chi phí chăm sóc sức khoẻ",
  "hiệu quả chăm sóc sức khỏe, khám chữa bệnh",
  "sức khoẻ kỹ thuật số",
  "Ca phẫu thuật"
  
  ,
  // "Bác sĩ",
  // "Bệnh viện",
  // "Kiên nhẫn",
  // "Sự đối đãi",
  // "Thuốc",
  // "Triệu chứng",
  // "Chẩn đoán",
  // "Sức khỏe tinh thần",
  // "Dịch bệnh",
  // "Chăm sóc sức khỏe",
  // "Bệnh",
  // "Đơn thuốc",
  // "Bệnh dịch",
  // "tiêm chủng",
  // "trị liệu",
  // "chăm sóc sức khỏe người cao tuổi",
  // "chăm sóc sức khỏe người tại nhà",
  // "chăm sóc sức khỏe người chủ động",
  // "Chăm sóc sức khỏe phụ nữ",
  // "Y tế châu Á",
  // "Y tế số",
  // "Y tế phòng ngừa",
  // "Y tế ứng dụng",
  // "Y tế học cộng đồng",
  // "Y tế tâm thần",
  // "Y tế điều trị",
  // "Cải thiện sức khoẻ thể chất",
  // "Cải thiện tình trạng sức khoẻ",
  // "Tình trạng sức khoẻ",
  // "Tư vấn sức khoẻ",
  // "Triệu chứng",
  // "Điều trị",
  // "Khám chữa bệnh",
  // "Phòng khám",
  // "Dinh dưỡng",
]

for(let i=0;i<urlVdideo.length;i++){
    queueComment.add({keyword:`${urlVdideo[i]}`})
    console.log({keyword:`${urlVdideo[i]}`})
}

// await queueComment.obliterate({ force: true });
// const a = await queueComment.count()
// console.log(a)
