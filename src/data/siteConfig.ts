/**
 * SHE IS — Centralized Bilingual Configuration & Story Content (Vietnamese & English)
 * All texts, quotes, themes, and image references can be customized here.
 */

export interface GalleryItem {
  id: string;
  theme: string;
  vietnameseTitle: string;
  englishTitle: string;
  image: string;
  quote: string;
  englishQuote: string;
  reflection: string;
  englishReflection: string;
  extendedStory: string;
  englishExtendedStory: string;
  tag: string;
  englishTag: string;
}

export interface RelationshipOption {
  id: string;
  label: string;
  englishLabel: string;
  placeholderName: string;
  englishPlaceholderName: string;
}

export interface ToneOption {
  id: string;
  label: string;
  englishLabel: string;
  description: string;
  englishDescription: string;
}

export const siteConfig = {
  brand: {
    name: "SHE IS",
    tagline: "Every woman is a universe of her own.",
    vietnameseTagline: "Mỗi người phụ nữ là một thế giới riêng.",
    eventDate: "20.10",
    eventLabel: "VIETNAMESE WOMEN'S DAY · OCTOBER 20",
    eventVietnameseLabel: "NGÀY PHỤ NỮ VIỆT NAM · 20 THÁNG 10",
    footerCredit: "Made with appreciation, for every woman. · 20.10",
    footerCreditVi: "Được tạo nên với tất cả sự trân trọng, dành cho mọi người phụ nữ. · 20.10",
  },

  images: {
    hero: "/src/assets/images/hero_cinematic_light_1792370476844.jpg",
    portraitStages: "/src/assets/images/portrait_quiet_strength_1792370478155.jpg",
    galleryCreator: "/src/assets/images/gallery_woman_creator_1792370478870.jpg",
    botanicalWarm: "/src/assets/images/botanical_warm_ivory_1792370478647.jpg",
  },

  scene01: {
    year: "20.10",
    eyebrow: "TO EVERY WOMAN, EVERYWHERE.",
    eyebrowVi: "GỬI ĐẾN MỌI NGƯỜI PHỤ NỮ, Ở MỌI NƠI.",
    title: "GỬI NHỮNG NGƯỜI PHỤ NỮ TUYỆT VỜI.",
    titleEn: "TO THE EXTRAORDINARY WOMEN OF THIS WORLD.",
    subtitle:
      "Những người đã, đang và sẽ làm thế giới này trở nên tốt đẹp hơn theo cách của riêng mình.",
    subtitleEn:
      "Those who have made, are making, and will continue to make this world brighter in their own unique way.",
    cta: "KHÁM PHÁ CÂU CHUYỆN",
    ctaEn: "EXPLORE THE STORY",
    secondaryCta: "Đọc bức thư 20/10",
    secondaryCtaEn: "Read the 20.10 Letter",
    scrollHint: "Cuộn để tiếp tục hành trình",
    scrollHintEn: "Scroll to begin the journey",
  },

  scene02: {
    label: "CHƯƠNG 01 · TỰ DO LÀ CHÍNH MÌNH",
    labelEn: "CHAPTER 01 · THE FREEDOM TO BE",
    title: "SHE IS MORE THAN ONE STORY",
    vietnameseTitle: "MỘT NGƯỜI PHỤ NỮ, VÔ VÀN CÂU CHUYỆN",
    statements: [
      {
        en: "She is the care that holds a family together.",
        vi: "Cô ấy là sự chăm sóc dịu dàng gìn giữ mái ấm.",
      },
      {
        en: "She is the curiosity that questions the world.",
        vi: "Cô ấy là sự tò mò không ngừng đặt câu hỏi trước thế giới.",
      },
      {
        en: "She is the courage to begin again.",
        vi: "Cô ấy là lòng can đảm để bắt đầu lại sau vấp ngã.",
      },
      {
        en: "She is the freedom to choose her own path.",
        vi: "Cô ấy là quyền tự do lựa chọn con đường của chính mình.",
      },
      {
        en: "She is allowed to be ambitious.",
        vi: "Cô ấy được quyền khát vọng và vươn xa.",
      },
      {
        en: "She is allowed to be tired.",
        vi: "Cô ấy được quyền mệt mỏi và cần nghỉ ngơi.",
      },
      {
        en: "She is allowed to change.",
        vi: "Cô ấy được quyền đổi thay theo thời gian.",
      },
      {
        en: "She is allowed to be herself.",
        vi: "Và trên hết, cô ấy được quyền là chính mình.",
      },
    ],
    closingMessage:
      "Một người phụ nữ có thể mang trong mình nhiều vai trò, nhiều ước mơ và nhiều câu chuyện. Nhưng trước hết, cô ấy luôn là chính mình.",
    closingMessageEn:
      "A woman may carry within her many roles, many dreams, and many stories. Yet above all, she is always herself first.",
    note: "Không ai bắt buộc phải gánh vác mọi kỳ vọng. Mỗi chặng đường đều mang giá trị trọn vẹn.",
    noteEn: "No woman is obligated to carry every expectation. Every path holds its own complete worth.",
  },

  scene03: {
    label: "CHƯƠNG 02 · GÓC NHÌN TĨNH LẶNG",
    labelEn: "CHAPTER 02 · THE UNSEEN HOURS",
    title: "KHÔNG PHẢI MỌI NỖ LỰC ĐỀU ĐƯỢC NHÌN THẤY.",
    titleEn: "NOT EVERY EFFORT IS SEEN BY THE WORLD.",
    supportingMessage:
      "Có những cố gắng chẳng ai biết. Có những ước mơ được giữ kín. Có những ngày chỉ riêng việc bước tiếp cũng đã là một nỗ lực đáng trân trọng.",
    supportingMessageEn:
      "There are struggles no one witnesses. Dreams kept quietly inside. And days when simply taking the next step forward is an act of courage worthy of deep respect.",
    panels: [
      {
        en: "For the women who are starting over.",
        vi: "Dành cho những người đang bắt đầu lại.",
        context: "Dù ở bất kỳ lứa tuổi nào, can đảm khép lại để mở ra cánh cửa mới luôn là vẻ đẹp kiên cường.",
        contextEn: "At any stage of life, the courage to close one chapter and open a new door is a quiet, resilient grace.",
      },
      {
        en: "For the women who are still finding their way.",
        vi: "Dành cho những người vẫn đang tìm kiếm con đường của mình.",
        context: "Sự mơ hồ hôm nay là hạt mầm cho sự thấu suốt mai sau. Đừng vội nản lòng.",
        contextEn: "Today's uncertainty is the seed of tomorrow's clarity. Take your time as your horizon unfolds.",
      },
      {
        en: "For the women who are quietly building something extraordinary.",
        vi: "Dành cho những người âm thầm tạo nên điều phi thường.",
        context: "Không cần ánh đèn sân khấu hay tràng pháo tay rộn rã, sự bền bỉ của bạn tự nó đã tỏa sáng.",
        contextEn: "Without spotlights or loud applause, your quiet perseverance already shines with its own brilliance.",
      },
      {
        en: "For the women who are learning to choose themselves.",
        vi: "Dành cho những người đang học cách trân trọng chính mình.",
        context: "Biết nói lời từ chối điều không phù hợp và ôm lấy cảm xúc của bản thân là một bước trưởng thành dịu dàng.",
        contextEn: "Learning to set boundaries and honor your own wellbeing is a gentle, vital act of self-respect.",
      },
      {
        en: "For every woman whose story is still unfolding.",
        vi: "Dành cho những người phụ nữ vẫn đang viết tiếp câu chuyện của mình.",
        context: "Mỗi trang đời phía trước đều ngập tràn tiềm năng và hy vọng chưa từng khép lại.",
        contextEn: "Every unwritten page ahead remains wide open with possibility, dignity, and hope.",
      },
    ],
    footerQuoteVi: "Những điều vô hình với mắt thường đôi khi lại là thứ nuôi dưỡng tâm hồn sâu sắc nhất.",
    footerQuoteEn: "What remains invisible to the eye is often what nourishes the human spirit most deeply.",
  },

  scene04: {
    label: "CHƯƠNG 03 · PHÒNG TRIỂN LÃM",
    labelEn: "CHAPTER 03 · A GALLERY OF POSSIBILITY",
    title: "KHÔNG CÓ MỘT CÁCH DUY NHẤT ĐỂ LÀ MỘT NGƯỜI PHỤ NỮ.",
    titleEn: "THERE IS NO SINGLE WAY TO BE A WOMAN.",
    subtitle: "Và cũng chẳng có một giấc mơ nào chỉ dành riêng cho một ai.",
    subtitleEn: "And no dream belongs to only one kind of life.",
    items: [
      {
        id: "dreamer",
        theme: "THE DREAMER",
        vietnameseTitle: "NGƯỜI NUÔI DƯỠNG ƯỚC MƠ",
        englishTitle: "THE KEEPER OF DREAMS",
        tag: "Tưởng tượng & Khát vọng",
        englishTag: "Imagination & Vision",
        image: "/src/assets/images/gallery_woman_creator_1792370478870.jpg",
        quote: "Ước mơ của bạn không cần phải giống bất kỳ ai.",
        englishQuote: "Your dreams do not need to look like anyone else's.",
        reflection:
          "Dù là ước muốn bình dị bên hiên nhà hay dự định chinh phục chân trời mới, ước mơ ấy xứng đáng được lắng nghe và vun đắp.",
        englishReflection:
          "Whether it is a quiet life beside a sunlit porch or a bold voyage toward new horizons, your dream deserves to be heard and nurtured.",
        extendedStory:
          "Một thế giới giàu đẹp là nơi mọi ước mơ dù nhỏ bé hay lớn lao đều có chỗ trú ngụ. Đừng bao giờ thu nhỏ giấc mơ của mình để vừa vặn với kỳ vọng của người khác.",
        englishExtendedStory:
          "A rich world is one where every aspiration, grand or intimate, has a place to belong. Never shrink your vision to fit someone else's expectations.",
      },
      {
        id: "creator",
        theme: "THE CREATOR",
        vietnameseTitle: "NGƯỜI SÁNG TẠO",
        englishTitle: "THE ARCHITECT OF BEAUTY",
        tag: "Nghệ thuật & Ý tưởng",
        englishTag: "Art & Originality",
        image: "/src/assets/images/gallery_woman_creator_1792370478870.jpg",
        quote: "Những điều chưa từng tồn tại bắt đầu từ một người dám tưởng tượng.",
        englishQuote: "What has never existed before begins with someone who dares to imagine.",
        reflection:
          "Từ từng nét vẽ, câu chữ, nốt nhạc cho đến một dự án đổi mới — người sáng tạo thêu dệt nên linh hồn cho đời sống.",
        englishReflection:
          "From brushstrokes, words, and melodies to bold new ventures — creators weave meaning and soul into everyday life.",
        extendedStory:
          "Khi bạn tạo ra điều gì đó bằng tất cả tình yêu, bạn đang gửi một phần tâm hồn của mình vào thế giới, nhắc nhở chúng ta về vẻ đẹp của cảm xúc con người.",
        englishExtendedStory:
          "When you bring something new into being with care, you leave a piece of your spirit in the world, reminding us of the depth of human emotion.",
      },
      {
        id: "scientist",
        theme: "THE SCIENTIST",
        vietnameseTitle: "NHÀ KHOA HỌC & TRÍ TUỆ",
        englishTitle: "THE SEEKER OF TRUTH",
        tag: "Tri thức & Khám phá",
        englishTag: "Inquiry & Discovery",
        image: "/src/assets/images/hero_cinematic_light_1792370476844.jpg",
        quote: "Sự tò mò có thể mở ra những thế giới mà hôm nay chúng ta chưa biết đến.",
        englishQuote: "Curiosity can unlock worlds that today we cannot yet imagine.",
        reflection:
          "Những đêm dài trong phòng nghiên cứu, những câu hỏi đi ngược lối mòn mang lại ánh sáng cho tương lai nhân loại.",
        englishReflection:
          "Long hours in laboratories and fearless questions against convention bring light and healing to humanity's future.",
        extendedStory:
          "Tri thức không có ranh giới giới tính. Mỗi phát kiến, dù vi mô trong tế bào hay vĩ mô ngoài vũ trụ, đều minh chứng cho sức mạnh trí tuệ của người phụ nữ.",
        englishExtendedStory:
          "Knowledge knows no boundaries. Every discovery, from microscopic cells to distant stars, stands as a testament to women's intellectual brilliance.",
      },
      {
        id: "leader",
        theme: "THE LEADER",
        vietnameseTitle: "NGƯỜI DẪN ĐƯỜNG",
        englishTitle: "THE VOICE OF CONVICTION",
        tag: "Bản lĩnh & Quyết đoán",
        englishTag: "Courage & Guidance",
        image: "/src/assets/images/portrait_quiet_strength_1792370478155.jpg",
        quote: "Bạn không cần trở thành một bản sao của bất kỳ ai để tạo nên sự khác biệt.",
        englishQuote: "You do not need to become a copy of anyone else to make a lasting difference.",
        reflection:
          "Lãnh đạo bằng sự thấu cảm, tinh thần công bằng và bản lĩnh vững vàng trong từng quyết định mang tính bước ngoặt.",
        englishReflection:
          "Leading with empathy, fairness, and steady conviction through moments that shape communities and futures.",
        extendedStory:
          "Sức mạnh đích thực của người lãnh đạo không nằm ở sự áp đặt, mà ở khả năng khơi dậy niềm tin và thắp sáng tiềm năng nơi người khác.",
        englishExtendedStory:
          "True leadership never rests on domination, but on the ability to inspire trust and awaken potential in others.",
      },
      {
        id: "explorer",
        theme: "THE EXPLORER",
        vietnameseTitle: "NGƯỜI THÁM HIỂM",
        englishTitle: "THE VOYAGER BEYOND",
        tag: "Tự do & Trải nghiệm",
        englishTag: "Freedom & Horizons",
        image: "/src/assets/images/hero_cinematic_light_1792370476844.jpg",
        quote: "Thế giới rộng lớn hơn những giới hạn mà người khác đặt ra cho bạn.",
        englishQuote: "The world is far wider than the boundaries others place around you.",
        reflection:
          "Bước chân ra khỏi vùng an toàn, đón nhận những miền đất mới và tìm thấy bản ngã phong phú qua mỗi dặm đường.",
        englishReflection:
          "Stepping beyond the familiar, embracing unknown landscapes, and discovering a richer self along every mile.",
        extendedStory:
          "Chuyến đi ý nghĩa nhất không chỉ là vượt qua bao nhiêu ngọn núi, mà là sự dũng cảm để bước đi trên con đường chưa ai từng khai phá.",
        englishExtendedStory:
          "The most meaningful journey is not measured merely in distance, but in the courage to walk an uncharted path of your own.",
      },
      {
        id: "caregiver",
        theme: "THE CAREGIVER",
        vietnameseTitle: "NGƯỜI CHĂM SÓC DỊU DÀNG",
        englishTitle: "THE HEART OF COMPASSION",
        tag: "Tình thương & Sự thấu hiểu",
        englishTag: "Kindness & Warmth",
        image: "/src/assets/images/portrait_quiet_strength_1792370478155.jpg",
        quote: "Sự quan tâm là điều đáng quý, nhưng bạn cũng xứng đáng được quan tâm.",
        englishQuote: "Offering care is a precious gift, yet you also deserve to be cared for in return.",
        reflection:
          "Trao đi yêu thương là một sức mạnh diệu kỳ, nhưng đừng quên dành cho chính trái tim mình một góc bình yên để được che chở.",
        englishReflection:
          "Giving love is a quiet superpower, but remember to keep a peaceful sanctuary where your own heart can rest and be held.",
        extendedStory:
          "Bạn không cần phải luôn là điểm tựa vững chãi cho cả thế giới. Hãy cho phép bản thân được tựa vào sự ân cần của những người xung quanh.",
        englishExtendedStory:
          "You do not always have to be the unshakable pillar for everyone else. Allow yourself to lean on the kindness of those who love you.",
      },
      {
        id: "athlete",
        theme: "THE ATHLETE",
        vietnameseTitle: "NGƯỜI BỀN BỈ & Ý CHÍ",
        englishTitle: "THE SPIRIT OF ENDURANCE",
        tag: "Nỗ lực & Sức mạnh",
        englishTag: "Discipline & Strength",
        image: "/src/assets/images/botanical_warm_ivory_1792370478647.jpg",
        quote: "Tiến bộ không phải lúc nào cũng ồn ào. Đôi khi, nó chỉ là việc tiếp tục cố gắng.",
        englishQuote: "Progress is not always loud. Sometimes, it is simply choosing to keep going.",
        reflection:
          "Từng giọt mồ hôi, từng bước chạy kiên trì hướng đến mục tiêu của chính mình, vượt qua những giới hạn cũ.",
        englishReflection:
          "Every drop of sweat and every determined stride toward your own goal, surpassing yesterday's limits.",
        extendedStory:
          "Chiến thắng rạng rỡ nhất là khi bạn nhận ra cơ thể và ý chí của mình có thể bền bỉ hơn bất kỳ nỗi sợ hãi nào từng ngự trị.",
        englishExtendedStory:
          "The brightest victory is realizing that your body and will are more enduring than any doubt that once held you back.",
      },
      {
        id: "hero",
        theme: "THE EVERYDAY HERO",
        vietnameseTitle: "NGƯỜI HÙNG ĐỜI THƯỜNG",
        englishTitle: "THE GRACE OF ORDINARY DAYS",
        tag: "Ý nghĩa trong giản dị",
        englishTag: "Everyday Meaning",
        image: "/src/assets/images/portrait_quiet_strength_1792370478155.jpg",
        quote: "Không phải mọi điều có ý nghĩa đều cần được cả thế giới chứng kiến.",
        englishQuote: "Not everything of deep meaning needs to be witnessed by the entire world.",
        reflection:
          "Mỗi bữa cơm ấm cúng, một lời an ủi lúc bạn bè chới với, hay một ngày sống chân thành đều là kỳ tích của cuộc sống.",
        englishReflection:
          "A warm meal shared, a gentle word when a friend is struggling, or a single day lived with sincerity is already a quiet miracle.",
        extendedStory:
          "Những điều bình dị nhất thường là thứ giữ cho thế giới này tiếp tục ấm áp. Sự hiện diện an lành của bạn chính là một món quà vô giá.",
        englishExtendedStory:
          "The simplest kindnesses are what keep this world warm. Your peaceful, authentic presence is an irreplaceable gift.",
      },
    ] as GalleryItem[],
  },

  scene05: {
    label: "CHƯƠNG 04 · BỨC THƯ TRÂN TRỌNG",
    labelEn: "CHAPTER 04 · A LETTER TO EVERY WOMAN",
    title: "MỘT LỜI NHẮN NHỎ, DÀNH CHO BẠN.",
    titleEn: "A SMALL LETTER, WRITTEN FOR YOU.",
    subtitle: "Dành một khoảnh khắc tĩnh lặng để đọc những dòng viết gửi riêng bạn.",
    subtitleEn: "Take a quiet moment to read these words dedicated to you.",
    envelopeLabel: "MỞ BỨC THƯ ♡",
    envelopeLabelEn: "OPEN THE LETTER ♡",
    closeLabel: "KHÉP LẠI BỨC THƯ",
    closeLabelEn: "FOLD LETTER",
    letter: {
      salutation: "Gửi bạn,",
      paragraphs: [
        "Nhân ngày 20/10, có một điều muốn được gửi đến bạn: mong rằng bạn luôn có đủ tự do để lựa chọn cuộc sống mình mong muốn, đủ can đảm để theo đuổi những điều mình tin tưởng và đủ bình yên để không phải lúc nào cũng chứng minh giá trị của bản thân với thế giới.",
        "Mong bạn được lắng nghe khi muốn nói, được nghỉ ngơi khi mệt mỏi, được tôn trọng khi đưa ra lựa chọn và được yêu thương mà không cần phải trở thành một ai khác.",
        "Nếu hôm nay bạn đang hạnh phúc, mong niềm vui ấy còn ở lại thật lâu.",
        "Nếu bạn đang trên đường tìm kiếm điều gì đó, mong bạn gặp được những cơ hội xứng đáng.",
        "Và nếu bạn đang trải qua một khoảng thời gian không dễ dàng, mong bạn nhớ rằng cuộc sống vẫn còn nhiều điều tốt đẹp có thể chờ đón mình.",
        "Bạn không cần phải hoàn hảo mới xứng đáng được trân trọng.",
        "Bạn không cần phải mạnh mẽ trong mọi khoảnh khắc.",
        "Bạn cũng không cần sống theo câu chuyện mà bất kỳ ai khác đã viết sẵn cho mình.",
        "Chúc bạn có một ngày 20/10 thật đẹp, và nhiều ngày bình thường khác cũng đẹp theo cách riêng.",
      ],
      signoff: "Với tất cả sự trân trọng,",
      signature: "Gửi đến những người phụ nữ trên thế giới.",
    },
    letterEn: {
      salutation: "Dear you,",
      paragraphs: [
        "On this October 20th, there is one wish we want to send to you: may you always have the freedom to choose the life you desire, the courage to pursue what you believe in, and the peace of mind to know you do not always have to prove your worth to the world.",
        "May you be truly heard when you speak, rested when you are weary, respected in the choices you make, and loved without ever needing to become someone else.",
        "If today finds you happy, may that joy linger with you for a long time.",
        "If you are still searching for your path, may you meet opportunities worthy of your heart.",
        "And if you are walking through a difficult season, may you remember that life still holds many gentle, beautiful days ahead for you.",
        "You do not need to be perfect to deserve appreciation.",
        "You do not need to be strong in every single moment.",
        "And you never need to live inside a story that someone else wrote for you.",
        "Wishing you a deeply meaningful October 20th, and many ordinary days ahead that are beautiful in their own quiet way.",
      ],
      signoff: "With all our appreciation,",
      signature: "To women everywhere in the world.",
    },
  },

  scene06: {
    label: "CHƯƠNG 05 · NGUYỆN CẦU AN LÀNH",
    labelEn: "CHAPTER 05 · MORE THAN A GREETING",
    title: "ĐIỀU TUYỆT VỜI NHẤT LÀ ĐƯỢC LÀ CHÍNH MÌNH.",
    titleEn: "THE GREATEST GIFT IS BEING YOURSELF.",
    subtitle: "Những lời chúc chân thành gửi đến từng nhịp thở của cuộc đời bạn.",
    subtitleEn: "Sincere wishes for your freedom, peace, and everyday life.",
    wishes: [
      "Chúc bạn được sống với những lựa chọn của mình.",
      "Chúc những nỗ lực của bạn được ghi nhận.",
      "Chúc những ước mơ của bạn luôn có cơ hội trở thành hiện thực.",
      "Chúc bạn có những mối quan hệ mang lại sự bình yên và tôn trọng.",
      "Chúc bạn luôn tìm thấy những niềm vui, dù lớn lao hay giản dị.",
      "Và chúc thế giới ngày càng trở thành nơi mà mọi người phụ nữ đều có cơ hội được học tập, phát triển, cất tiếng nói và sống an toàn, tự do.",
    ],
    wishesEn: [
      "May you live freely according to your own choices.",
      "May your quiet efforts and dedication be truly recognized.",
      "May your dreams always find the space and opportunity to come alive.",
      "May you be surrounded by relationships that bring peace and mutual respect.",
      "May you always discover moments of joy, whether grand or simple.",
      "And may the world increasingly become a place where every woman has the opportunity to learn, flourish, speak her voice, and live in safety and freedom.",
    ],
  },

  scene07: {
    label: "CHƯƠNG 06 · LAN TỎA YÊU THƯƠNG",
    labelEn: "CHAPTER 06 · PASS THE LIGHT FORWARD",
    title: "MỘT LỜI CHÚC CÓ THỂ BẮT ĐẦU TỪ BẠN.",
    titleEn: "A MEANINGFUL WISH CAN BEGIN WITH YOU.",
    subtitle: "Hãy gửi một lời chúc đến người phụ nữ mà bạn trân trọng.",
    subtitleEn: "Compose and share a personal tribute for a woman you appreciate.",
    relationships: [
      { id: "mother", label: "Mẹ", englishLabel: "Mother", placeholderName: "Mẹ yêu thương", englishPlaceholderName: "Dearest Mom" },
      { id: "grandmother", label: "Bà", englishLabel: "Grandmother", placeholderName: "Bà kính yêu", englishPlaceholderName: "Beloved Grandmother" },
      { id: "sister", label: "Chị / Em gái", englishLabel: "Sister", placeholderName: "Chị gái / Em gái", englishPlaceholderName: "My Dear Sister" },
      { id: "teacher", label: "Cô giáo", englishLabel: "Teacher", placeholderName: "Cô giáo kính mến", englishPlaceholderName: "Respected Teacher" },
      { id: "friend", label: "Bạn bè", englishLabel: "Friend", placeholderName: "Bạn thân mến", englishPlaceholderName: "My Dear Friend" },
      { id: "colleague", label: "Đồng nghiệp", englishLabel: "Colleague", placeholderName: "Người bạn đồng hành", englishPlaceholderName: "Valued Colleague" },
      { id: "special", label: "Người đặc biệt", englishLabel: "Someone Special", placeholderName: "Người thương", englishPlaceholderName: "Someone Special" },
    ] as RelationshipOption[],
    tones: [
      {
        id: "heartfelt",
        label: "Chân thành",
        englishLabel: "Heartfelt",
        description: "Ấm áp, sâu sắc và đầy trân trọng.",
        englishDescription: "Warm, sincere, and deeply appreciative.",
      },
      {
        id: "encouraging",
        label: "Tiếp thêm động lực",
        englishLabel: "Encouraging",
        description: "Mạnh mẽ, truyền cảm hứng và niềm tin.",
        englishDescription: "Uplifting, empowering, and full of belief.",
      },
      {
        id: "elegant",
        label: "Thanh lịch",
        englishLabel: "Elegant",
        description: "Tinh tế, nhã nhặn như một trang thơ cổ điển.",
        englishDescription: "Poetic, refined, and timelessly graceful.",
      },
      {
        id: "lighthearted",
        label: "Ấm áp & Tươi vui",
        englishLabel: "Lighthearted",
        description: "Tự nhiên, rạng rỡ và tràn ngập nụ cười.",
        englishDescription: "Bright, joyful, and full of smiles.",
      },
    ] as ToneOption[],
  },

  scene08: {
    title: "HAPPY VIETNAMESE WOMEN'S DAY",
    titleVi: "CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM",
    date: "20.10",
    primaryMessage:
      "Chúc bạn luôn được nhìn thấy, được lắng nghe, được tôn trọng và được yêu thương.",
    primaryMessageEn:
      "May you always be seen, be heard, be respected, and be loved.",
    secondaryMessage:
      "Không chỉ hôm nay. Mà trong tất cả những ngày bình thường còn lại.",
    secondaryMessageEn:
      "Not only today. But in all the ordinary days that follow.",
    shareAction: "CHIA SẺ TRANG NÀY",
    shareActionEn: "SHARE THIS TRIBUTE",
    restartAction: "QUAY LẠI TỪ ĐẦU",
    restartActionEn: "RETURN TO BEGINNING",
  },
};
