export interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  benefit: string;
  benefitHi?: string;
  eligibility: string[];
  eligibilityHi?: string[];
  category: "farmer" | "student" | "employment" | "general";
  tags: string[];
  image: string;
  howToApply: string[];
  howToApplyHi?: string[];
  applicationUrl: string;
}

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    description: "Direct income support of ₹6,000/year to small and marginal farmer families.",
    descriptionHi: "छोटे और सीमांत किसान परिवारों को ₹6,000/वर्ष की प्रत्यक्ष आय सहायता।",
    benefit: "₹6,000/year",
    benefitHi: "₹6,000/वर्ष",
    eligibility: ["Farmer", "Land owner", "Annual income < ₹2 lakh"],
    eligibilityHi: ["किसान", "भूमि स्वामी", "वार्षिक आय < ₹2 लाख"],
    category: "farmer",
    tags: ["Direct Benefit", "Agriculture"],
    image: "https://d35xcwcl37xo08.cloudfront.net/current-affairs-wp-uploads/2025/07/PM-1.webp",
    howToApply: [
      "Visit the official PM-Kisan portal",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar and mobile number",
      "Fill the application form and upload documents"
    ],
    howToApplyHi: [
      "आधिकारिक पीएम-किसान पोर्टल पर जाएं",
      "'नया किसान पंजीकरण' पर क्लिक करें",
      "आधार और मोबाइल नंबर दर्ज करें",
      "आवेदन पत्र भरें और दस्तावेज अपलोड करें"
    ],
    applicationUrl: "https://pmkisan.gov.in/"
  },
  {
    id: "2",
    name: "PM Fasal Bima Yojana",
    nameHi: "पीएम फसल बीमा योजना",
    description: "Crop insurance scheme protecting farmers against crop loss due to natural calamities.",
    descriptionHi: "प्राकृतिक आपदाओं के कारण फसल के नुकसान के खिलाफ किसानों की रक्षा करने वाली फसल बीमा योजना।",
    benefit: "Crop Insurance Cover",
    benefitHi: "फसल बीमा कवर",
    eligibility: ["Farmer", "All crop growers"],
    eligibilityHi: ["किसान", "सभी फसल उत्पादक"],
    category: "farmer",
    tags: ["Insurance", "Agriculture"],
    image: "https://akm-img-a-in.tosshub.com/lingo/ktak/images/story/202505/6836befdc1260-pmfby-284456593-16x9.jpg?size=1200:675",
    howToApply: [
      "Login to PMFBY portal or visit nearest bank",
      "Select 'Farmer Corner' and register",
      "Select crop and land details",
      "Pay the premium amount"
    ],
    howToApplyHi: [
      "PMFBY पोर्टल पर लॉग इन करें या नजदीकी बैंक में जाएं",
      "'किसान कॉर्नर' चुनें और पंजीकरण करें",
      "फसल और भूमि विवरण चुनें",
      "प्रीमियम राशि का भुगतान करें"
    ],
    applicationUrl: "https://pmfby.gov.in/"
  },
  {
    id: "3",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    description: "Unified portal for various scholarships for students from Class 1 to PhD level.",
    descriptionHi: "कक्षा 1 से पीएचडी स्तर तक के छात्रों के लिए विभिन्न छात्रवृत्ति के लिए एकीकृत पोर्टल।",
    benefit: "Up to ₹50,000/year",
    benefitHi: "₹50,000/वर्ष तक",
    eligibility: ["Student", "Income < ₹2.5 lakh", "Merit-based"],
    eligibilityHi: ["छात्र", "आय < ₹2.5 लाख", "योग्यता आधारित"],
    category: "student",
    tags: ["Scholarship", "Education"],
    image: "https://d2w7l1p59qkl0r.cloudfront.net/article/wp-content/uploads/2025/08/27184856/National-Scholarship-Portal-NSP.jpg",
    howToApply: [
      "Register on NSP portal",
      "Login with temporary ID and password",
      "Fill the application form correctly",
      "Upload required documents and submit"
    ],
    howToApplyHi: [
      "NSP पोर्टल पर पंजीकरण करें",
      "अस्थायी आईडी और पासवर्ड के साथ लॉग इन करें",
      "आवेदन पत्र सही ढंग से भरें",
      "आवश्यक दस्तावेज अपलोड करें और जमा करें"
    ],
    applicationUrl: "https://scholarships.gov.in/"
  },
  {
    id: "4",
    name: "PM Vidya Lakshmi Yojana",
    nameHi: "पीएम विद्या लक्ष्मी योजना",
    description: "Education loan portal connecting students with banks for higher education financing.",
    descriptionHi: "उच्च शिक्षा वित्तपोषण के लिए छात्रों को बैंकों से जोड़ने वाला शिक्षा ऋण पोर्टल।",
    benefit: "Education Loan Access",
    benefitHi: "शिक्षा ऋण पहुंच",
    eligibility: ["Student", "Higher education aspirant"],
    eligibilityHi: ["छात्र", "उच्च शिक्षा के इच्छुक"],
    category: "student",
    tags: ["Education Loan", "Higher Education"],
    image: "https://galgotiastimes.com/wp-content/uploads/2025/05/PM-Vidyalakshmi-yojana-2025-3.jpg",
    howToApply: [
      "Register on Vidya Lakshmi portal",
      "Fill the Common Education Loan Application Form (CELAF)",
      "Search and apply for loans from multiple banks",
      "Track application status online"
    ],
    howToApplyHi: [
      "विद्या लक्ष्मी पोर्टल पर पंजीकरण करें",
      "कॉमन एजुकेशन लोन एप्लीकेशन फॉर्म (CELAF) भरें",
      "विभिन्न बैंकों से ऋण के लिए खोजें और आवेदन करें",
      "ऑनलाइन आवेदन स्थिति को ट्रैक करें"
    ],
    applicationUrl: "https://www.vidyalakshmi.co.in/"
  },
  {
    id: "5",
    name: "PM Kaushal Vikas Yojana",
    nameHi: "पीएम कौशल विकास योजना",
    description: "Skill development and training program for unemployed youth with certification.",
    descriptionHi: "प्रमाणन के साथ बेरोजगार युवाओं के लिए कौशल विकास और प्रशिक्षण कार्यक्रम।",
    benefit: "Free Skill Training + Certificate",
    benefitHi: "मुफ्त कौशल प्रशिक्षण + प्रमाण पत्र",
    eligibility: ["Age 15-45", "Unemployed youth"],
    eligibilityHi: ["आयु 15-45", "बेरोजगार युवा"],
    category: "employment",
    tags: ["Skill Development", "Employment"],
    image: "https://lms24x7.s3.amazonaws.com/gsktestimonials/uploads/2022/06/16180901/Pradhan-Mantri-Kaushal-Vikas-Yojana.jpg",
    howToApply: [
      "Find a PMKVY training center near you",
      "Register at the training center",
      "Attend the training and assessment",
      "Receive certification and reward"
    ],
    howToApplyHi: [
      "अपने पास एक पीएमकेवीवाई प्रशिक्षण केंद्र खोजें",
      "प्रशिक्षण केंद्र में पंजीकरण करें",
      "प्रशिक्षण और मूल्यांकन में भाग लें",
      "प्रमाण पत्र और पुरस्कार प्राप्त करें"
    ],
    applicationUrl: "https://www.pmkvyofficial.org/"
  },
  {
    id: "6",
    name: "Mudra Loan Yojana",
    nameHi: "मुद्रा लोन योजना",
    description: "Micro loans up to ₹10 lakh for small businesses and entrepreneurs without collateral.",
    descriptionHi: "बिना किसी गारंटी के छोटे व्यवसायों और उद्यमियों के लिए ₹10 लाख तक के सूक्ष्म ऋण।",
    benefit: "Loan up to ₹10 lakh",
    benefitHi: "₹10 लाख तक का ऋण",
    eligibility: ["Small business owner", "Entrepreneur", "No collateral needed"],
    eligibilityHi: ["छोटे व्यवसाय के मालिक", "उद्यमी", "किसी गारंटी की आवश्यकता नहीं"],
    category: "employment",
    tags: ["Loan", "Entrepreneurship"],
    image: "https://afleo.com/wp-content/uploads/2018/08/Feature-Image-Mudra-Loan-1.jpg",
    howToApply: [
      "Approach any commercial or rural bank",
      "Fill the MUDRA application form",
      "Submit business plan and documents",
      "Loan gets sanctioned after verification"
    ],
    howToApplyHi: [
      "किसी भी वाणिज्यिक या ग्रामीण बैंक से संपर्क करें",
      "मुद्रा आवेदन पत्र भरें",
      "व्यवसाय योजना और दस्तावेज जमा करें",
      "सत्यापन के बाद ऋण स्वीकृत हो जाता है"
    ],
    applicationUrl: "https://www.mudra.org.in/"
  },
  {
    id: "7",
    name: "Ayushman Bharat Yojana",
    nameHi: "आयुष्मान भारत योजना",
    description: "Health insurance cover of ₹5 lakh per family for secondary and tertiary hospitalization.",
    descriptionHi: "द्वितीयक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार ₹5 लाख का स्वास्थ्य बीमा कवर।",
    benefit: "₹5 lakh health cover",
    benefitHi: "₹5 लाख स्वास्थ्य कवर",
    eligibility: ["BPL families", "Annual income < ₹1 lakh"],
    eligibilityHi: ["बीपीएल परिवार", "वार्षिक आय < ₹1 lakh"],
    category: "general",
    tags: ["Health Insurance", "Medical"],
    image: "https://www.jagranimages.com/images/newimg/14102022/14_10_2022-ayushman_bharat_yojna_23139680.webp",
    howToApply: [
      "Check eligibility on AB-PMJAY portal",
      "Visit any empaneled hospital with Aadhaar",
      "Meet 'Ayushman Mitra' for verification",
      "Get treated cashless up to ₹5 lakh"
    ],
    howToApplyHi: [
      "AB-PMJAY पोर्टल पर पात्रता की जांच करें",
      "आधार के साथ किसी भी सूचीबद्ध अस्पताल में जाएं",
      "सत्यापन के लिए 'आयुष्मान मित्र' से मिलें",
      "₹5 लाख तक कैशलेस इलाज कराएं"
    ],
    applicationUrl: "https://pmjay.gov.in/"
  },
  {
    id: "8",
    name: "Kisan Credit Card",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Credit facility for farmers to meet their agricultural and ancillary needs.",
    descriptionHi: "किसानों की कृषि और सहायक जरूरतों को पूरा करने के लिए ऋण सुविधा।",
    benefit: "Low-interest credit access",
    benefitHi: "कम ब्याज वाली ऋण पहुंच",
    eligibility: ["Farmer", "Land owner/tenant"],
    eligibilityHi: ["किसान", "भूमि स्वामी/किराएदार"],
    category: "farmer",
    tags: ["Credit", "Agriculture"],
    image: "https://thenewsmill.com/wp-content/uploads/2023/02/PM-Kisan-Credit-Card-Scheme.jpg",
    howToApply: [
      "Visit your nearest bank branch",
      "Fill the KCC application form",
      "Submit land ownership documents",
      "Card is issued after verification"
    ],
    howToApplyHi: [
      "अपनी नजदीकी बैंक शाखा में जाएं",
      "KCC आवेदन पत्र भरें",
      "भूमि स्वामित्व दस्तावेज जमा करें",
      "सत्यापन के बाद कार्ड जारी किया जाता है"
    ],
    applicationUrl: "https://www.sbi.co.in/web/agriculture-banking/kisan-credit-card"
  },
  {
    id: "9",
    name: "Pradhan Mantri Awas Yojana",
    nameHi: "प्रधानमंत्री आवास योजना",
    description: "Government scheme providing affordable housing for low-income families.",
    descriptionHi: "कम आय वाले परिवारों के लिए किफायती आवास प्रदान करने वाली सरकारी योजना।",
    benefit: "Subsidy on home construction",
    benefitHi: "घर निर्माण पर सब्सिडी",
    eligibility: ["Low income family", "No permanent house", "Indian citizen"],
    eligibilityHi: ["कम आय वाला परिवार", "स्थायी घर नहीं", "भारतीय नागरिक"],
    category: "general",
    tags: ["Housing", "Subsidy"],
    image: "https://cdnbbsr.s3waas.gov.in/s39bb6dee73b8b0ca97466ccb24fff3139/uploads/2023/02/2023020321.jpg",
    howToApply: [
      "Visit PMAY official website",
      "Click on citizen assessment",
      "Fill personal details and income",
      "Submit application form"
    ],
    howToApplyHi: [
      "PMAY की आधिकारिक वेबसाइट पर जाएं",
      "सिटीजन असेसमेंट पर क्लिक करें",
      "व्यक्तिगत और आय विवरण भरें",
      "आवेदन जमा करें"
    ],
    applicationUrl: "https://pmaymis.gov.in/"
  },

  {
    id: "10",
    name: "Pradhan Mantri Jan Dhan Yojana",
    nameHi: "प्रधानमंत्री जन धन योजना",
    description: "Financial inclusion program providing zero balance bank accounts.",
    descriptionHi: "शून्य बैलेंस बैंक खाते प्रदान करने वाला वित्तीय समावेशन कार्यक्रम।",
    benefit: "Free bank account + insurance",
    benefitHi: "मुफ्त बैंक खाता + बीमा",
    eligibility: ["Indian citizen", "Age above 10"],
    eligibilityHi: ["भारतीय नागरिक", "आयु 10 वर्ष से अधिक"],
    category: "general",
    tags: ["Banking", "Finance"],
    image: "https://www.jagranimages.com/images/newimg/23102023/23_10_2023-jan_dhan_2_23562602.webp",
    howToApply: [
      "Visit nearest bank branch",
      "Fill Jan Dhan account form",
      "Submit Aadhaar and mobile number",
      "Account will be opened"
    ],
    howToApplyHi: [
      "नजदीकी बैंक शाखा में जाएं",
      "जन धन खाता फॉर्म भरें",
      "आधार और मोबाइल नंबर दें",
      "खाता खुल जाएगा"
    ],
    applicationUrl: "https://pmjdy.gov.in/"
  },

  {
    id: "11",
    name: "Atal Pension Yojana",
    nameHi: "अटल पेंशन योजना",
    description: "Pension scheme for unorganized sector workers.",
    descriptionHi: "असंगठित क्षेत्र के श्रमिकों के लिए पेंशन योजना।",
    benefit: "₹1000–₹5000 monthly pension",
    benefitHi: "₹1000–₹5000 मासिक पेंशन",
    eligibility: ["Age 18–40", "Bank account holder"],
    eligibilityHi: ["आयु 18–40", "बैंक खाता धारक"],
    category: "general",
    tags: ["Pension", "Social Security"],
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Visit bank branch",
      "Fill APY registration form",
      "Choose pension amount",
      "Auto debit activated"
    ],
    howToApplyHi: [
      "बैंक शाखा में जाएं",
      "APY फॉर्म भरें",
      "पेंशन राशि चुनें",
      "ऑटो डेबिट सक्रिय करें"
    ],
    applicationUrl: "https://npscra.nsdl.co.in/"
  },

  {
    id: "12",
    name: "PM Ujjwala Yojana",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना",
    description: "Free LPG connections to women from poor households.",
    descriptionHi: "गरीब परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन।",
    benefit: "Free LPG connection",
    benefitHi: "मुफ्त गैस कनेक्शन",
    eligibility: ["BPL family", "Woman applicant"],
    eligibilityHi: ["बीपीएल परिवार", "महिला आवेदक"],
    category: "general",
    tags: ["LPG", "Women Welfare"],
    image: "https://media.assettype.com/newslaundry%2Fimport%2F2016%2F06%2FArticle_pic_Pradhan-Mantri-Ujjwala-Yojana.jpg?auto=format&fit=fill&bg=000000&q=35&w=1200",
    howToApply: [
      "Visit nearest LPG distributor",
      "Submit Ujjwala application form",
      "Provide Aadhaar and ration card",
      "Connection issued after verification"
    ],
    howToApplyHi: [
      "नजदीकी गैस एजेंसी में जाएं",
      "उज्ज्वला फॉर्म जमा करें",
      "आधार और राशन कार्ड दें",
      "सत्यापन के बाद कनेक्शन मिलेगा"
    ],
    applicationUrl: "https://pmuy.gov.in/"
  },

  {
    id: "13",
    name: "PM SVANidhi Scheme",
    nameHi: "पीएम स्वनिधि योजना",
    description: "Micro-credit scheme for street vendors.",
    descriptionHi: "स्ट्रीट वेंडर्स के लिए सूक्ष्म ऋण योजना।",
    benefit: "Loan up to ₹50,000",
    benefitHi: "₹50,000 तक ऋण",
    eligibility: ["Street vendor", "Urban local body registration"],
    eligibilityHi: ["स्ट्रीट वेंडर", "नगर निगम पंजीकरण"],
    category: "employment",
    tags: ["Loan", "Street Vendors"],
    image: "https://www.oliveboard.in/blog/wp-content/uploads/2025/09/PM-svanidhi-scheme.webp",
    howToApply: [
      "Visit PM SVANidhi portal",
      "Register as street vendor",
      "Fill loan application",
      "Submit documents"
    ],
    howToApplyHi: [
      "PM SVANidhi पोर्टल पर जाएं",
      "स्ट्रीट वेंडर के रूप में पंजीकरण करें",
      "ऋण आवेदन भरें",
      "दस्तावेज जमा करें"
    ],
    applicationUrl: "https://pmsvanidhi.mohua.gov.in/"
  },

  {
    id: "14",
    name: "Startup India Scheme",
    nameHi: "स्टार्टअप इंडिया योजना",
    description: "Government initiative supporting startups with funding and tax benefits.",
    descriptionHi: "स्टार्टअप को फंडिंग और टैक्स लाभ देने वाली सरकारी पहल।",
    benefit: "Tax benefits and funding support",
    benefitHi: "टैक्स लाभ और फंडिंग सहायता",
    eligibility: ["Startup founder", "Innovative business idea"],
    eligibilityHi: ["स्टार्टअप संस्थापक", "नवाचार व्यवसाय"],
    category: "employment",
    tags: ["Startup", "Entrepreneurship"],
    image: "https://www.ceovine.com/wp-content/uploads/2023/10/Startup-India-3.png",
    howToApply: [
      "Visit Startup India portal",
      "Register startup profile",
      "Upload company documents",
      "Apply for recognition"
    ],
    howToApplyHi: [
      "Startup India पोर्टल पर जाएं",
      "स्टार्टअप प्रोफाइल बनाएं",
      "कंपनी दस्तावेज अपलोड करें",
      "मान्यता के लिए आवेदन करें"
    ],
    applicationUrl: "https://www.startupindia.gov.in/"
  },

  {
    id: "15",
    name: "Stand Up India Scheme",
    nameHi: "स्टैंड अप इंडिया योजना",
    description: "Loan scheme for SC/ST and women entrepreneurs.",
    descriptionHi: "एससी/एसटी और महिला उद्यमियों के लिए ऋण योजना।",
    benefit: "Loan ₹10 lakh – ₹1 crore",
    benefitHi: "₹10 लाख – ₹1 करोड़ ऋण",
    eligibility: ["SC/ST or woman entrepreneur", "Business startup"],
    eligibilityHi: ["एससी/एसटी या महिला उद्यमी", "नया व्यवसाय"],
    category: "employment",
    tags: ["Loan", "Entrepreneurship"],
    image: "https://media.assettype.com/startupcity/import/2019/06/Stand-Up-India-scheme.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
    howToApply: [
      "Visit Stand Up India portal",
      "Fill application form",
      "Submit business plan",
      "Bank verifies application"
    ],
    howToApplyHi: [
      "Stand Up India पोर्टल पर जाएं",
      "आवेदन फॉर्म भरें",
      "व्यवसाय योजना जमा करें",
      "बैंक सत्यापन करेगा"
    ],
    applicationUrl: "https://www.standupmitra.in/"
  },
  {
    id: "16",
    name: "INSPIRE Scholarship Scheme",
    nameHi: "इंस्पायर छात्रवृत्ति योजना",
    description: "Scholarship program by the Government of India to encourage students to pursue careers in science.",
    descriptionHi: "भारत सरकार की छात्रवृत्ति योजना जो छात्रों को विज्ञान के क्षेत्र में करियर बनाने के लिए प्रोत्साहित करती है।",
    benefit: "₹80,000 per year scholarship",
    benefitHi: "₹80,000 प्रति वर्ष छात्रवृत्ति",
    eligibility: ["Student in science stream", "Top 1% in Class 12 board exam"],
    eligibilityHi: ["विज्ञान वर्ग का छात्र", "कक्षा 12 बोर्ड परीक्षा में शीर्ष 1%"],
    category: "student",
    tags: ["Scholarship", "Science Education"],
    image: "https://d2w7l1p59qkl0r.cloudfront.net/article/wp-content/uploads/2023/06/19174927/INSPIRE-Scholarship-2025-%E2%80%93-Eligibility-Application-Selection.jpg",
    howToApply: [
      "Visit the INSPIRE scholarship portal",
      "Register using academic details",
      "Upload mark sheets and documents",
      "Submit the scholarship application"
    ],
    howToApplyHi: [
      "INSPIRE छात्रवृत्ति पोर्टल पर जाएं",
      "शैक्षणिक विवरण के साथ पंजीकरण करें",
      "मार्कशीट और दस्तावेज अपलोड करें",
      "छात्रवृत्ति आवेदन जमा करें"
    ],
    applicationUrl: "https://online-inspire.gov.in/"
  },
  {
    id: "17",
    name: "PM Vishwakarma Scheme",
    nameHi: "पीएम विश्वकर्मा योजना",
    description: "Scheme supporting traditional artisans and craftsmen with training and financial assistance.",
    descriptionHi: "पारंपरिक कारीगरों और शिल्पकारों को प्रशिक्षण और वित्तीय सहायता देने वाली योजना।",
    benefit: "Skill training + financial support",
    benefitHi: "कौशल प्रशिक्षण + वित्तीय सहायता",
    eligibility: ["Traditional artisan", "Age above 18"],
    eligibilityHi: ["पारंपरिक कारीगर", "आयु 18 वर्ष से अधिक"],
    category: "employment",
    tags: ["Skill Development", "Artisans"],
    image: "https://img.manoramayearbook.in/content/dam/yearbook/learn/world/images/2023/sep/crafts-2.jpg",
    howToApply: [
      "Visit PM Vishwakarma portal",
      "Register using Aadhaar",
      "Complete artisan verification",
      "Apply for training and benefits"
    ],
    howToApplyHi: [
      "PM Vishwakarma पोर्टल पर जाएं",
      "आधार से पंजीकरण करें",
      "कारीगर सत्यापन पूरा करें",
      "प्रशिक्षण और लाभ के लिए आवेदन करें"
    ],
    applicationUrl: "https://pmvishwakarma.gov.in/"
  },

  {
    id: "18",
    name: "National Rural Livelihood Mission",
    nameHi: "राष्ट्रीय ग्रामीण आजीविका मिशन",
    description: "Program promoting self-employment and organization of rural poor into Self Help Groups.",
    descriptionHi: "ग्रामीण गरीबों को स्वयं सहायता समूहों में संगठित कर स्वरोजगार बढ़ाने वाला कार्यक्रम।",
    benefit: "Financial assistance and training",
    benefitHi: "वित्तीय सहायता और प्रशिक्षण",
    eligibility: ["Rural household", "Low income families"],
    eligibilityHi: ["ग्रामीण परिवार", "कम आय वाले परिवार"],
    category: "employment",
    tags: ["Self Help Groups", "Rural Development"],
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Contact local rural development office",
      "Join or form a Self Help Group",
      "Register under NRLM",
      "Access financial and training support"
    ],
    howToApplyHi: [
      "स्थानीय ग्रामीण विकास कार्यालय से संपर्क करें",
      "स्वयं सहायता समूह में शामिल हों या बनाएं",
      "NRLM के तहत पंजीकरण करें",
      "वित्तीय और प्रशिक्षण सहायता प्राप्त करें"
    ],
    applicationUrl: "https://aajeevika.gov.in/"
  },

  {
    id: "19",
    name: "Mukhyamantri Chiranjeevi Swasthya Bima Yojana",
    nameHi: "मुख्यमंत्री चिरंजीवी स्वास्थ्य बीमा योजना",
    description: "Rajasthan government health insurance scheme providing free treatment in empaneled hospitals.",
    descriptionHi: "राजस्थान सरकार की स्वास्थ्य बीमा योजना जो सूचीबद्ध अस्पतालों में मुफ्त इलाज प्रदान करती है।",
    benefit: "Free treatment up to ₹25 lakh",
    benefitHi: "₹25 लाख तक मुफ्त इलाज",
    eligibility: ["Resident of Rajasthan", "Registered family"],
    eligibilityHi: ["राजस्थान निवासी", "पंजीकृत परिवार"],
    category: "general",
    tags: ["Health Insurance", "Rajasthan"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Visit Rajasthan SSO portal",
      "Register family details",
      "Complete verification",
      "Use card at empaneled hospitals"
    ],
    howToApplyHi: [
      "राजस्थान SSO पोर्टल पर जाएं",
      "परिवार विवरण पंजीकृत करें",
      "सत्यापन पूरा करें",
      "सूचीबद्ध अस्पतालों में कार्ड का उपयोग करें"
    ],
    applicationUrl: "https://chiranjeevi.rajasthan.gov.in/"
  },

  {
    id: "20",
    name: "Mukhyamantri Rajshree Yojana",
    nameHi: "मुख्यमंत्री राजश्री योजना",
    description: "Financial assistance scheme in Rajasthan for the birth and education of girl child.",
    descriptionHi: "राजस्थान में बालिका के जन्म और शिक्षा के लिए वित्तीय सहायता योजना।",
    benefit: "Financial support up to ₹50,000",
    benefitHi: "₹50,000 तक वित्तीय सहायता",
    eligibility: ["Girl child born in Rajasthan", "Resident family"],
    eligibilityHi: ["राजस्थान में जन्मी बालिका", "राजस्थान निवासी परिवार"],
    category: "general",
    tags: ["Girl Child", "Rajasthan"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Register birth at hospital",
      "Apply through Rajasthan SSO portal",
      "Submit required documents",
      "Receive benefits in stages"
    ],
    howToApplyHi: [
      "अस्पताल में जन्म पंजीकरण करें",
      "राजस्थान SSO पोर्टल के माध्यम से आवेदन करें",
      "आवश्यक दस्तावेज जमा करें",
      "किस्तों में लाभ प्राप्त करें"
    ],
    applicationUrl: "https://sso.rajasthan.gov.in/"
  }
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const stateDistricts: Record<string, string[]> = {
  Rajasthan: [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara",
    "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
    "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
    "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
    "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  "Uttar Pradesh": ["Agra", "Aligarh", "Lucknow", "Kanpur", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  Haryana: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Kashipur"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Nahan"],
  Goa: ["North Goa", "South Goa"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  Manipur: ["Imphal", "Thoubal", "Bishnupur"],
  Meghalaya: ["Shillong", "Tura", "Jowai"],
  Mizoram: ["Aizawl", "Lunglei", "Saiha"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
  Sikkim: ["Gangtok", "Namchi", "Geyzing"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
};

export const mockChatResponses: Record<string, string> = {
  farmer: "Based on your profile, here are the top schemes for farmers:\n\n🌾 **PM Kisan Samman Nidhi** - Get ₹6,000/year directly in your bank account.\n\n🛡️ **PM Fasal Bima Yojana** - Protect your crops with affordable insurance.\n\n💳 **Kisan Credit Card** - Access low-interest credit for farming needs.\n\nWould you like details on how to apply for any of these?",
  student: "Great news for students! Here are schemes you may be eligible for:\n\n📚 **National Scholarship Portal** - Apply for scholarships up to ₹50,000/year.\n\n🎓 **PM Vidya Lakshmi Yojana** - Get education loans from multiple banks.\n\nShall I help you understand the eligibility criteria?",
  employment: "Here are the best schemes for skill development and employment:\n\n💼 **PM Kaushal Vikas Yojana** - Free skill training with government certification.\n\n🏪 **Mudra Loan Yojana** - Start your own business with loans up to ₹10 lakh.\n\nWant to know more about the application process?",
  default: "I can help you find the right government schemes! Please tell me:\n\n• Are you a **farmer**, **student**, or looking for **employment**?\n• Which **state** are you from?\n• What is your **age** and **income range**?\n\nThis will help me suggest the most relevant schemes for you. 🙏",
};
