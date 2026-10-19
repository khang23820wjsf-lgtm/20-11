/**
 * Botanical Oracle Cards Data (Vietnamese & English)
 * Used in the "Hái Hoa Nhận Thông Điệp Vũ Trụ 20/10" (Mystery Bloom Oracle) experience.
 */

export interface BloomOracleCard {
  id: string;
  romanNumeral: string;
  flowerNameVi: string;
  flowerNameEn: string;
  latinName: string;
  auraVi: string;
  auraEn: string;
  quoteVi: string;
  quoteEn: string;
  messageVi: string;
  messageEn: string;
  blessingVi: string;
  blessingEn: string;
  accentColor: string;
}

export const bloomOracleCards: BloomOracleCard[] = [
  {
    id: "lotus",
    romanNumeral: "I",
    flowerNameVi: "Bạch Liên Hoa",
    flowerNameEn: "White Sacred Lotus",
    latinName: "Nelumbo nucifera",
    auraVi: "Sự Thanh Tao & Bình Yên Nội Tại",
    auraEn: "Serene Grace & Inner Peace",
    quoteVi: "Giữa vạn biến chuyển của cuộc đời, tâm hồn bạn vẫn giữ nguyên vẻ trong trẻo.",
    quoteEn: "Amidst the shifting tides of life, your spirit preserves its luminous clarity.",
    messageVi:
      "Lá bài Bạch Liên Hoa tìm đến bạn như một lời nhắc dịu dàng: bạn không cần phải chạy theo sự ồn ào của thế gian để tỏa sáng. Sự điềm tĩnh, lòng nhân hậu và chiều sâu tâm hồn chính là sức mạnh quý giá nhất của bạn trong chặng đường sắp tới.",
    messageEn:
      "The White Lotus arrives as a gentle reminder: you never need to chase the noise of the world to shine. Your quiet composure, kindness, and depth of spirit are your greatest strengths in the chapter ahead.",
    blessingVi: "Chúc bạn một mùa 20/10 nhẹ nhõm như hương sen sớm mai, luôn bình an trong từng lựa chọn.",
    blessingEn: "Wishing you an October 20th as tranquil as morning lotus mist, at peace in every choice you make.",
    accentColor: "#D4B47A",
  },
  {
    id: "sunflower",
    romanNumeral: "II",
    flowerNameVi: "Hướng Dương Hoàng Kim",
    flowerNameEn: "Golden Sunbloom",
    latinName: "Helianthus annuus",
    auraVi: "Năng Lượng Ấm Áp & Niềm Tin Rực Rỡ",
    auraEn: "Radiant Warmth & Unwavering Faith",
    quoteVi: "Nơi nào có sự hiện diện của bạn, nơi đó có ánh nắng.",
    quoteEn: "Wherever your presence rests, warm sunlight follows.",
    messageVi:
      "Bạn mang trong mình nguồn năng lượng tích cực tự nhiên khiến những người xung quanh luôn cảm thấy được tiếp thêm sức mạnh. Nhưng hôm nay, hãy để ánh mặt trời ấy sưởi ấm cho chính những ước mơ riêng tư nhất của bạn.",
    messageEn:
      "You carry a natural warmth that uplifts everyone around you. Yet today, let that golden sunlight turn inward to nourish your own most cherished dreams.",
    blessingVi: "Chúc bạn luôn rạng rỡ, tự tin và đón nhận những cơ hội tuyệt vời đang nở rộ phía trước.",
    blessingEn: "May you remain radiant, confident, and open to the bright opportunities blossoming ahead.",
    accentColor: "#E5B869",
  },
  {
    id: "rose",
    romanNumeral: "III",
    flowerNameVi: "Hồng Cổ Điển Tháng Mười",
    flowerNameEn: "Autumn Velvet Rose",
    latinName: "Rosa damascena",
    auraVi: "Bản Lĩnh Dịu Dàng & Tự Do Kiêu Hãnh",
    auraEn: "Tender Courage & Proud Freedom",
    quoteVi: "Dịu dàng không phải là yếu đuối; đó là sức mạnh đã chọn cách nở hoa.",
    quoteEn: "Gentleness is never weakness; it is strength that has chosen to bloom.",
    messageVi:
      "Đóa Hồng Cổ Điển tôn vinh cả sự mềm mại lẫn những chiếc gai bảo vệ ranh giới của riêng bạn. Bạn có quyền yêu hết mình, ước mơ hết mình và cũng có toàn quyền từ chối những điều không xứng đáng với giá trị của bản thân.",
    messageEn:
      "The Velvet Rose honors both your softness and the boundaries that protect your heart. You have every right to love deeply, dream boldly, and walk away from anything unworthy of your peace.",
    blessingVi: "Chúc bạn ngày 20/10 luôn kiêu hãnh, được trân trọng và yêu thương đúng với con người thật của mình.",
    blessingEn: "Wishing you an October 20th where you are cherished, respected, and loved for who you truly are.",
    accentColor: "#C98F9A",
  },
  {
    id: "magnolia",
    romanNumeral: "IV",
    flowerNameVi: "Hoa Mộc Lan Trắng",
    flowerNameEn: "Noble Magnolia",
    latinName: "Magnolia grandiflora",
    auraVi: "Trí Tuệ Độc Lập & Khởi Đầu Mới",
    auraEn: "Independent Wisdom & New Horizons",
    quoteVi: "Trước khi mùa xuân kịp gọi tên, bạn đã tự mình nở rộ.",
    quoteEn: "Even before spring calls your name, you have already chosen to bloom.",
    messageVi:
      "Mộc Lan là loài hoa dám bung nở ngay khi trời còn se lạnh. Lá bài này gửi đến bạn thông điệp của sự tiên phong và lòng dũng cảm: dự định hay ước mơ mà bạn đang ấp ủ hoàn toàn xứng đáng để bạn bắt đầu ngay từ hôm nay.",
    messageEn:
      "The Magnolia dares to blossom while the air is still cool. This card brings a message of courage and new beginnings: the dream you have been quietly holding is ready to take flight.",
    blessingVi: "Chúc mỗi bước chân sắp tới của bạn đều vững vàng, tự do và dẫn lối tới chân trời bạn hằng mong ước.",
    blessingEn: "May every step you take be steady, free, and guided toward the horizon you desire.",
    accentColor: "#D4B47A",
  },
  {
    id: "camellia",
    romanNumeral: "V",
    flowerNameVi: "Hoa Trà Đỏ Mùa Thu",
    flowerNameEn: "Crimson Camellia",
    latinName: "Camellia japonica",
    auraVi: "Sự Kiên Định & Vẻ Đẹp Bền Bỉ",
    auraEn: "Quiet Resilience & Enduring Beauty",
    quoteVi: "Những nỗ lực thầm lặng của bạn đang kết tinh thành điều phi thường.",
    quoteEn: "Your unseen efforts are crystallizing into something extraordinary.",
    messageVi:
      "Hoa Trà nở giữa sương giá mà từng cánh vẫn vẹn nguyên. Vũ trụ muốn nhắn với bạn rằng mọi cố gắng âm thầm, những đêm thức khuya và sự kiên trì không bỏ cuộc của bạn đều đang được thời gian ghi nhận và đền đáp xứng đáng.",
    messageEn:
      "The Camellia blooms through frost with every petal intact. Remember that all your quiet perseverance, late nights, and dedication are seen by time and will be richly rewarded.",
    blessingVi: "Chúc bạn luôn giữ vững ngọn lửa ấm trong tim và tự hào về hành trình mình đã đi qua.",
    blessingEn: "May you keep the warm flame in your heart alive and feel proud of how far you have come.",
    accentColor: "#C98F9A",
  },
  {
    id: "daisy",
    romanNumeral: "VI",
    flowerNameVi: "Cúc Họa Mi Tinh Khôi",
    flowerNameEn: "Pure Autumn Marguerite",
    latinName: "Bellis perennis",
    auraVi: "Niềm Vui Giản Dị & Tâm Hồn Tự Tại",
    auraEn: "Simple Joys & Untethered Spirit",
    quoteVi: "Hạnh phúc đôi khi chỉ là một buổi sáng thảnh thơi được là chính mình.",
    quoteEn: "Happiness is sometimes simply an unhurried morning being yourself.",
    messageVi:
      "Giữa những kỳ vọng và mục tiêu lớn lao, Cúc Họa Mi nhắc bạn dành chỗ cho những niềm vui nhỏ bé: một tách trà thơm, một bản nhạc dịu êm, một cuộc trò chuyện chân thành. Bạn xứng đáng có những ngày thật nhẹ nhàng.",
    messageEn:
      "Amidst grand goals and responsibilities, the Autumn Daisy invites you to savor small joys: a warm cup of tea, a quiet song, a sincere laugh. You deserve days of effortless lightness.",
    blessingVi: "Chúc bạn một ngày 20/10 ngập tràn tiếng cười trong veo và những khoảnh khắc bình dị đáng nhớ.",
    blessingEn: "Wishing you an October 20th filled with bright laughter and unforgettable simple moments.",
    accentColor: "#D4B47A",
  },
];
