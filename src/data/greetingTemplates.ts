/**
 * Preset greeting generators based on relationship, tone & language (Vietnamese / English).
 * Implemented locally without external dependencies or mock AI calls.
 */

import { Language } from "../context/LanguageContext";

export function generateGreeting(
  recipientName: string,
  relationshipId: string,
  toneId: string,
  lang: Language = "vi"
): string {
  const name = recipientName.trim();
  const address = name ? name : getDefaultAddress(relationshipId, lang);

  const key = `${relationshipId}_${toneId}`;

  if (lang === "en") {
    const templatesEn: Record<string, string> = {
      // Mother
      mother_heartfelt: `Dearest ${address},\n\nOn this October 20th, my greatest wish is for your continued health, a peaceful heart, and a radiant smile every single day. Thank you for being the safest harbor of my life through all these years. I love you deeply!`,
      mother_encouraging: `Dearest ${address},\n\nYou have spent so many years caring for our family—today and in the days ahead, I hope you take time to cherish and care for yourself first. You deserve all the gentleness, freedom, and beauty life has to offer!`,
      mother_elegant: `To ${address},\n\nWishing you an October 20th filled with serene joy and timeless grace. May the passing years only deepen the warmth, wisdom, and quiet happiness in your eyes.`,
      mother_lighthearted: `Happy 20/10, ${address}!\n\nWishing you endless youth, laughter, and zero worries today! Sit back, enjoy your favorite tea, and celebrate a day that is completely yours!`,

      // Grandmother
      grandmother_heartfelt: `Dearest ${address},\n\nOn Vietnamese Women's Day (20/10), I wish you abundant health, longevity, and peaceful days surrounded by our family. Your warm love is the greatest treasure we carry in our hearts.`,
      grandmother_encouraging: `Dearest ${address},\n\nMay you wake up each morning with a light heart, simple joys, and deep peace. We are forever proud of and grateful for every gentle lesson you have taught us.`,
      grandmother_elegant: `To ${address},\n\nWishing you a tranquil, luminous October 20th overflowing with love and reverence. May time always be gentle with your health and your kind smile.`,
      grandmother_lighthearted: `Beloved ${address},\n\nWishing you a wonderful 20/10 filled with delicious meals, restful sleep, and the brightest smiles with all of us! We love you so much!`,

      // Sister
      sister_heartfelt: `Dear ${address},\n\nWishing you an October 20th filled with warmth and appreciation. May you always have the confidence to pursue your own dreams, knowing how uniquely wonderful you are.`,
      sister_encouraging: `Dear ${address},\n\nNever doubt your strength or your brilliance! Whatever challenges lie ahead, I know you will walk forward with courage and shine in your own way. Cheering for you always!`,
      sister_elegant: `To ${address},\n\nWishing you a graceful October 20th filled with inspiration and love for life. May you always stay proud and free as you write your own story.`,
      sister_lighthearted: `Hey ${address}!\n\nHappy 20/10! Wishing you glowing days, smooth projects, and every goal checked off effortlessly! Don't forget to treat yourself to something special today!`,

      // Teacher
      teacher_heartfelt: `Dear ${address},\n\nOn this October 20th, I want to express my deepest gratitude to you. Thank you not only for sharing knowledge, but for teaching us how to live with sincerity, courage, and kindness. Wishing you wonderful health and happiness!`,
      teacher_encouraging: `Dear ${address},\n\nTeaching carries so many quiet, unseen efforts, yet the seeds you plant today will blossom far into the future. May you always keep your passion and joy alive with every generation of students.`,
      teacher_elegant: `To ${address},\n\nWishing you a refined and meaningful October 20th. Thank you for the dedication, wisdom, and warmth you bring to every single lesson.`,
      teacher_lighthearted: `Happy 20/10, ${address}!\n\nWishing you boundless energy, bright smiles, inspiring classes, and countless joyful moments with your students!`,

      // Friend
      friend_heartfelt: `Dear ${address},\n\nThank you for always being there to listen and share life's quiet and joyful moments alike. This October 20th, may you find deep peace within your soul and be surrounded by genuine care.`,
      friend_encouraging: `Dear ${address},\n\nYou are so much stronger and more capable than you realize! No matter how big your next dream is, keep stepping forward with confidence—I am always in your corner cheering you on!`,
      friend_elegant: `To ${address},\n\nWishing you a poetic, serene October 20th. May you always preserve your calm grace, depth of spirit, and freedom in every choice you make.`,
      friend_lighthearted: `Hey ${address}!\n\nHappy 20/10! Wishing you stress-free deadlines, wonderful meals, spontaneous adventures, and a radiant smile every single day!`,

      // Colleague
      colleague_heartfelt: `Dear ${address},\n\nIt is such a privilege to work alongside someone as dedicated, thoughtful, and warm as you. Wishing you a joyful October 20th, rewarding projects, and lasting inspiration!`,
      colleague_encouraging: `Dear ${address},\n\nYour dedication and quiet excellence inspire everyone around you. Wishing you confidence as you take on new horizons and celebrate many well-deserved milestones ahead!`,
      colleague_elegant: `To ${address},\n\nOn Vietnamese Women's Day (20/10), wishing you a day of grace, meaningful growth, and a harmonious balance between career and life.`,
      colleague_lighthearted: `Hello ${address}!\n\nHappy 20/10! Wishing you smooth workflows, effortless milestones, great coffee, and endless positive energy every day!`,

      // Someone Special
      special_heartfelt: `Dearest ${address},\n\nYour presence brings a quiet warmth and meaning to my life that words can barely capture. This October 20th, may you always feel deeply seen, respected, cherished, and at peace.`,
      special_encouraging: `Dearest ${address},\n\nNo matter how busy or demanding the world outside becomes, remember that I am always here supporting your dreams. Be free, be bold, and be wonderfully yourself!`,
      special_elegant: `To ${address},\n\nWishing the extraordinary woman in my life an October 20th bathed in golden light and poetry. May your eyes always hold their bright wonder and faith in life.`,
      special_lighthearted: `Dearest ${address},\n\nWishing you the happiest 20/10 filled with flowers, laughter, and all your favorite things! Today is all about celebrating you!`,
    };

    return (
      templatesEn[key] ||
      `Dear ${address},\n\nOn Vietnamese Women's Day (20/10), wishing you peace, freedom, and lasting joy. May you always be free to be yourself, shine in your own way, and savor the beauty of every ordinary day.`
    );
  }

  const templatesVi: Record<string, string> = {
    // Mother
    mother_heartfelt: `Gửi ${address},\n\nNhân ngày 20/10, con chỉ mong mẹ luôn có thật nhiều sức khỏe, sự thảnh thơi trong tâm hồn và nụ cười rạng rỡ mỗi ngày. Cảm ơn mẹ vì bao năm tháng qua đã luôn là bến đỗ bình yên nhất của cuộc đời con. Con yêu mẹ rất nhiều!`,
    mother_encouraging: `Gửi ${address},\n\nCả một đời mẹ đã chăm lo cho gia đình, hôm nay và những ngày sau, mong mẹ hãy dành thời gian để yêu thương và chăm sóc chính bản thân mình. Mẹ xứng đáng được tận hưởng mọi điều dịu dàng và đẹp đẽ nhất của cuộc sống!`,
    mother_elegant: `Kính gửi ${address},\n\nKính chúc mẹ một ngày 20/10 vẹn tròn niềm vui và an yên. Mong rằng năm tháng trôi qua chỉ làm đậm thêm vẻ đẹp đôn hậu, bình thản và hạnh phúc trong ánh mắt của mẹ.`,
    mother_lighthearted: `Mẹ ơi!\n\nChúc ${address} ngày 20/10 luôn tươi trẻ, vui vẻ và bớt bận lòng vì chúng con nhé! Hôm nay mẹ cứ nghỉ ngơi, thong thả uống trà và tận hưởng ngày của riêng mình thật trọn vẹn mẹ nhé!`,

    // Grandmother
    grandmother_heartfelt: `Kính gửi ${address},\n\nNhân ngày Phụ nữ Việt Nam 20/10, con kính chúc bà luôn mạnh khỏe, trường thọ và an nhiên bên con cháu. Tình thương ấm áp của bà là tài sản quý giá nhất mà chúng con luôn mang theo trong tim.`,
    grandmother_encouraging: `Kính gửi ${address},\n\nMong bà mỗi ngày đều thức dậy với một trái tim nhẹ nhõm, nhiều niềm vui giản dị và bình an. Con cháu luôn tự hào và biết ơn từng bài học dịu dàng của bà.`,
    grandmother_elegant: `Kính gửi ${address},\n\nKính chúc bà một mùa 20/10 an lành, thanh bạch và tràn ngập tình yêu thương. Mong thời gian luôn dịu dàng với sức khỏe và nụ cười hiền hậu của bà.`,
    grandmother_lighthearted: `Bà kính yêu,\n\nChúc bà ngày 20/10 thật nhiều niềm vui, ăn ngon miệng, ngủ ngon giấc và luôn cười thật tươi cùng con cháu ạ! Chúng con yêu bà nhiều lắm!`,

    // Sister
    sister_heartfelt: `Gửi ${address},\n\nChúc em/chị một ngày 20/10 ngập tràn yêu thương. Mong bạn luôn có đủ tự tin để theo đuổi ước mơ của mình, luôn biết rằng bạn đặc biệt và tuyệt vời theo cách rất riêng.`,
    sister_encouraging: `Gửi ${address},\n\nĐừng bao giờ nghi ngờ khả năng của bản thân nhé. Chặng đường phía trước có thể còn nhiều thử thách, nhưng mình tin bạn sẽ luôn vững bước và tỏa sáng rực rỡ nhất! Cố lên nhé!`,
    sister_elegant: `Gửi ${address},\n\nChúc bạn một ngày 20/10 thanh nhã, ngập tràn cảm hứng và niềm tin yêu cuộc sống. Hãy luôn kiêu hãnh và tự do viết nên câu chuyện của chính mình.`,
    sister_lighthearted: `Alo ${address} thân mến!\n\n20/10 chúc bạn ngày càng xinh đẹp, rạng rỡ, làm việc suôn sẻ và sớm đạt được mọi mục tiêu đề ra nhé! Hôm nay nhớ tự thưởng cho mình một món quà thật ưng ý nha!`,

    // Teacher
    teacher_heartfelt: `Kính gửi ${address},\n\nNhân ngày 20/10, em xin gửi lời tri ân sâu sắc nhất đến cô. Cảm ơn cô đã không chỉ trao cho chúng em tri thức, mà còn dạy chúng em cách sống chân thành, can đảm và bao dung. Kính chúc cô luôn dồi dào sức khỏe và hạnh phúc!`,
    teacher_encouraging: `Kính gửi ${address},\n\nNghề giáo luôn có những nhọc nhằn thầm lặng, nhưng những hạt mầm cô gieo hôm nay sẽ nở hoa trong tương lai. Kính chúc cô luôn giữ mãi ngọn lửa đam mê và niềm vui bên từng thế hệ học trò.`,
    teacher_elegant: `Kính gửi ${address},\n\nKính chúc cô một ngày 20/10 ngập tràn niềm vui thanh tao và ý nghĩa. Cảm ơn sự tận tụy, tri thức và tình cảm ấm áp mà cô đã luôn dành cho chúng em qua từng bài giảng.`,
    teacher_lighthearted: `Em chào ${address}!\n\nNhân ngày 20/10, chúng em chúc cô luôn trẻ trung, tươi vui, công tác tốt và có thật nhiều tiết học ngập tràn tiếng cười cùng học sinh ạ!`,

    // Friend
    friend_heartfelt: `Gửi ${address},\n\nCảm ơn vì đã luôn ở bên, lắng nghe và chia sẻ mọi khoảnh khắc buồn vui cùng mình. Ngày 20/10 này, mong bạn luôn tìm thấy bình yên trong tâm hồn và được bao bọc bởi những điều chân thành nhất.`,
    friend_encouraging: `Gửi ${address},\n\nBạn mạnh mẽ và giỏi giang hơn những gì bạn nghĩ rất nhiều! Dù mục tiêu sắp tới có lớn lao đến đâu, hãy cứ vững tin tiến bước nhé, mình luôn ở đây cổ vũ bạn hết mình!`,
    friend_elegant: `Gửi ${address},\n\nChúc bạn một ngày 20/10 thật đẹp, dịu dàng và đầy chất thơ. Mong bạn luôn giữ được sự an nhiên, sâu sắc và tự do trong từng lựa chọn của cuộc đời.`,
    friend_lighthearted: `Hey ${address}!\n\nChúc mừng ngày 20/10 nhé! Chúc bạn ăn ngon không sợ mập, deadline trôi qua êm ả, shopping không cần nhìn giá và luôn tươi tắn rạng ngời mỗi ngày!`,

    // Colleague
    colleague_heartfelt: `Gửi ${address},\n\nThật may mắn khi được làm việc cùng một người đồng nghiệp tận tâm, chuyên nghiệp và ấm áp như bạn. Chúc bạn ngày 20/10 nhiều niềm vui, công việc thuận lợi và luôn giữ được nhiệt huyết!`,
    colleague_encouraging: `Gửi ${address},\n\nNhững đóng góp và nỗ lực của bạn là nguồn cảm hứng lớn cho cả tập thể. Chúc bạn luôn tự tin đón nhận những dự án mới và gặt hái thật nhiều thành công rực rỡ trên con đường sự nghiệp!`,
    colleague_elegant: `Kính gửi ${address},\n\nNhân ngày Phụ nữ Việt Nam 20/10, chúc bạn một ngày ngập tràn niềm vui, nhiều cơ hội phát triển và sự cân bằng trọn vẹn giữa công việc và đời sống.`,
    colleague_lighthearted: `Chào ${address}!\n\n20/10 chúc bạn công việc hanh thông, KPI vượt chỉ tiêu nhẹ nhàng, đồng nghiệp quý mến và lúc nào cũng tràn đầy năng lượng tích cực nhé!`,

    // Someone Special
    special_heartfelt: `Gửi ${address},\n\nSự hiện diện của em là điều dịu dàng và quý giá nhất đối với anh/tôi. Chúc em ngày 20/10 luôn cảm nhận được tình yêu thương, sự trân trọng và niềm hạnh phúc bình yên từ những điều nhỏ bé nhất.`,
    special_encouraging: `Gửi ${address},\n\nDù ngoài kia có bao nhiêu ồn ào và áp lực, mong em luôn nhớ rằng mình luôn ủng hộ và đồng hành cùng em. Hãy cứ tự tin sống trọn với đam mê của mình nhé!`,
    special_elegant: `Gửi ${address},\n\nChúc người phụ nữ tuyệt vời của anh/tôi một ngày 20/10 ngập tràn ánh sáng và thi vị. Mong nụ cười của em luôn rạng rỡ và đôi mắt luôn ngập tràn niềm tin yêu cuộc đời.`,
    special_lighthearted: `Gửi ${address},\n\nChúc em một ngày 20/10 siêu hạnh phúc, nhận được thật nhiều hoa, quà và nụ cười! Hôm nay em là nữ hoàng, mọi việc cứ để anh lo nhé!`,
  };

  return (
    templatesVi[key] ||
    `Gửi ${address},\n\nNhân ngày Phụ nữ Việt Nam 20/10, xin gửi đến bạn lời chúc an lành, tự do và ngập tràn hạnh phúc. Mong bạn luôn được là chính mình, tỏa sáng theo cách riêng và tận hưởng trọn vẹn từng ngày bình thường của cuộc sống.`
  );
}

function getDefaultAddress(relationshipId: string, lang: Language): string {
  if (lang === "en") {
    switch (relationshipId) {
      case "mother":
        return "Mom";
      case "grandmother":
        return "Grandmother";
      case "sister":
        return "Sister";
      case "teacher":
        return "Teacher";
      case "friend":
        return "My Friend";
      case "colleague":
        return "My Colleague";
      case "special":
        return "My Love";
      default:
        return "You";
    }
  }

  switch (relationshipId) {
    case "mother":
      return "Mẹ kính yêu";
    case "grandmother":
      return "Bà kính yêu";
    case "sister":
      return "Chị / Em gái";
    case "teacher":
      return "Cô giáo kính mến";
    case "friend":
      return "Bạn thân mến";
    case "colleague":
      return "Người bạn đồng hành";
    case "special":
      return "Người thương";
    default:
      return "Người phụ nữ tuyệt vời";
  }
}
