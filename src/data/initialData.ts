import { TelegramLinkItem, RuleItem, FAQItem, ChannelInfo, StudyTask } from '../types';

import heroImg from '../assets/images/la_casa_hero_1785497230120.jpg';
import daliAvatar from '../assets/images/dali_mask_avatar_1785497244195.jpg';

export const INITIAL_CHANNEL_INFO: ChannelInfo = {
  title: 'مقر لاكاسا للدراسة - La Casa Study',
  subtitle: 'التجمع الأقوى للطلاب والتحديات الدراسية في العراق والوطن العربي',
  slogan: 'هدفنا تحفيز للدراسة علمود كلنا ندرس سوة 💥',
  coverImageUrl: heroImg,
  avatarUrl: daliAvatar,
  botUsername: '@lacasa_askbot',
  adminsHandle: '@lacasa_askbot',
  announcement: '🚨 تنبيه مهم: يرجى قراءة القوانين بتمهل قبل الانضمام لكروبات التحدي. الالتزام بالدراسة هو هدفنا الأول!',
};

export const INITIAL_TELEGRAM_LINKS: TelegramLinkItem[] = [
  {
    id: 'link-1',
    title: 'قناة خدمات الاتصالات والمعلومات',
    description: 'تغطية مستمرة للأخبار والدعم التقني والاتصالات الخاصة بالقناة.',
    url: 'https://t.me/lacasa66',
    category: 'main',
    iconName: 'Radio',
    badge: 'القناة الرسمية',
  },
  {
    id: 'link-2',
    title: 'قناة خدمات الدراسة الرئيسية',
    description: 'ملخصات، تحديات دراسية، جداول، وملفات المذاكرة لجميع المراحل.',
    url: 'https://t.me/study_lacasa',
    category: 'study',
    iconName: 'BookOpen',
    badge: 'تجمع الدراسة',
  },
  {
    id: 'link-3',
    title: 'بوت لاكاسا للاستفسارات والأسئلة',
    description: 'أرسل سؤالك الدراسي أو استفسارك المباشر للبروفيسور والأدمنية.',
    url: 'https://t.me/lacasa_askbot',
    category: 'bot',
    iconName: 'Bot',
    badge: 'بوت التواصل @lacasa_askbot',
    isBot: true,
  },
  {
    id: 'link-4',
    title: 'قناة الإنجازات والسرقات الدراسية (Robbery)',
    description: 'توثيق ساعات الدراسة والتحديات اليومية وإنجازات الطلاب اليدوية.',
    url: 'https://t.me/Robbery_lacasa',
    category: 'achievements',
    iconName: 'Trophy',
    badge: 'سجل الإنجازات',
  },
  {
    id: 'link-5',
    title: 'قناة كل شيء تحتاجه بالسادس الإعدادي',
    description: 'المصدر الشامل لطلاب السادس: ملازم، وزاريات، نصائح، وخطط معدل 100%.',
    url: 'https://t.me/swwrw',
    category: 'sixth',
    iconName: 'GraduationCap',
    badge: 'مقر السادس',
  },
];

export const INITIAL_RULES: RuleItem[] = [
  {
    id: 'rule-1',
    number: 1,
    title: 'الاحترام المتبادل وعدم الإساءة',
    description: 'ممنوع إطلاقاً أي إساءة لأي طالب أو عضو. كلكم طلاب وكبار وواعين والهدف دعم بعضنا البعض.',
    category: 'behavior',
    severity: 'strict',
    punishment: 'طرد مباشر بدون إنذار',
  },
  {
    id: 'rule-2',
    number: 2,
    title: 'حظر التراسل الخاص (ممنوع الخاص نهائياً)',
    description: 'أنت جاي تدرس لو تتعرف؟ ممنوع أي ولد أو بنية يدخل خاص لأحد. إذا دخل طرف وجاوبه الطرف الثاني، يتم طرد الطرفين مباشرة! حتى لو نيتكم دراسة وتحديات، اتفقوا بالكروب العام. الخاص يسبب علاقات وتعلّق وبالتالي يدمر مستقبلك الدراسي، خصوصاً بالسادس.',
    category: 'private',
    severity: 'extreme',
    punishment: 'طرد النهائي للطرفين فوراً 🚫',
  },
  {
    id: 'rule-3',
    number: 3,
    title: 'حظر السكرينات وتداول صور الكروب',
    description: 'أي سكرين للمحادثات يوصل للبروفيسور أو الأدمنية، سيتم طرد جميع الأعضاء المشاركين في السكرين فوراً حماية للخصوصية.',
    category: 'chat',
    severity: 'extreme',
    punishment: 'طرد كلي لجميع أطراف السكرين',
  },
  {
    id: 'rule-4',
    number: 4,
    title: 'منع الحديث الجانبي والخارج عن الدراسة',
    description: 'الكروب مخصص للتحديات والأسئلة الدراسية فقط. أي كلام جانبي خارج إطار المذاكرة ممنوع منعاً باتاً.',
    category: 'behavior',
    severity: 'warning',
    punishment: 'كتم يوم كامل (24 ساعة)',
  },
  {
    id: 'rule-5',
    number: 5,
    title: 'حظر الهمسات والرسائل المخفية',
    description: 'الهمسات والرسائل السرية بالكروب غير مسموح بها إطلاقاً لضمان شفافية وبيئة دراسية ناصعة.',
    category: 'chat',
    severity: 'strict',
    punishment: 'حظر وحذف الرسالة',
  },
  {
    id: 'rule-6',
    number: 6,
    title: 'منع المواضيع الطائفية والسياسية',
    description: 'الكلام في الطائفية أو السياسة أو العنصرية ممنوع تماماً. تجمعنا علمي وأخوي محض.',
    category: 'content',
    severity: 'extreme',
    punishment: 'طرد مباشر ودائم 🛑',
  },
];

export const INITIAL_TASKS: StudyTask[] = [
  { id: 't1', title: 'مراجعة وزاريات الرياضيات (الفصل الأول)', subject: 'رياضيات', stage: 'إعدادية (سادس)', completed: false, minutes: 45 },
  { id: 't2', title: 'حل 20 سؤال قواعد اللغة العربية', subject: 'عربي', stage: 'إعدادية (سادس)', completed: true, minutes: 30 },
  { id: 't3', title: 'حفظ تعاريف وتعاميل الأحياء', subject: 'أحياء', stage: 'إعدادية (سادس)', completed: false, minutes: 60 },
  { id: 't4', title: 'تحدي المذاكرة لمدة ساعتين متواصلة', subject: 'تحدي عام', stage: 'متوسطة', completed: false, minutes: 120 },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'كيف أنضم إلى كروبات التحدي والمذاكرة اليومية؟',
    answer: 'يمكنك الانضمام مباشرة من خلال رابط قناة الدراسة @study_lacasa، حيث يتم نشر روابط وتحديات المذاكرة بانتظام.',
    category: 'groups',
  },
  {
    id: 'faq-2',
    question: 'ماذا أفعل إذا واجهت مشكلة أو تعرضت لطلب خاص بالكروب؟',
    answer: 'راسل فوراً بوت الاستفسارات الرسمي @lacasa_askbot أو تواصل مع أحد أدمنية القناة مرفقاً إثباتاً ليتم اتخاذ إجراء الطرد الفوري.',
    category: 'bot',
  },
  {
    id: 'faq-3',
    question: 'هل القناة تقبل جميع المراحل الدراسية؟',
    answer: 'نعم! نستقبل جميع المراحل (المتوسطة، الإعدادية وبشكل خاص السادس، والجامعية).',
    category: 'study',
  },
  {
    id: 'faq-4',
    question: 'لماذا يمنع التراسل الخاص بين الطلاب بهذه الشدة؟',
    answer: 'لأننا نعرف تماماً تأثير العلاقات الجانبية والتشتت الذهني خصوصاً في المرحلة المصيرية (السادس). هدفنا حماية مستقبلك وطموحك للوصول إلى المجموعات الطبية والهندسية والتخصصات العالية.',
    category: 'rules',
  },
];
