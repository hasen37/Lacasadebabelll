export interface TelegramLinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'main' | 'study' | 'bot' | 'achievements' | 'sixth';
  iconName: 'Send' | 'BookOpen' | 'Bot' | 'Trophy' | 'GraduationCap' | 'MessageSquare' | 'Radio';
  badge?: string;
  isBot?: boolean;
}

export interface RuleItem {
  id: string;
  number: number;
  title: string;
  description: string;
  category: 'private' | 'behavior' | 'chat' | 'content';
  severity: 'extreme' | 'strict' | 'warning';
  punishment: string;
  iconName?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  stage: 'متوسطة' | 'إعدادية (سادس)' | 'جامعي';
  completed: boolean;
  minutes: number;
}

export interface QuestionSubmission {
  id: string;
  studentStage: 'متوسطة' | 'سادس إعدادي' | 'جامعي';
  subject: string;
  questionText: string;
  createdAt: string;
  code: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'rules' | 'study' | 'bot' | 'groups';
}

export interface ChannelInfo {
  title: string;
  subtitle: string;
  slogan: string;
  coverImageUrl: string;
  avatarUrl: string;
  botUsername: string;
  adminsHandle: string;
  announcement: string;
}
