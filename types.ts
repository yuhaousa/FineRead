
export enum CapabilityType {
  R1 = 'R1', // 获取信息
  R2 = 'R2', // 直接推论
  R3 = 'R3', // 整合与解释
  R4 = 'R4'  // 评价与批判
}

export type TextType = 'Prose' | 'Novel' | 'News' | 'Poetry' | 'Science' | 'History';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface PISACapability {
  id: CapabilityType;
  name: string;
  description: string;
}

export interface TextSegment {
  id: string;
  content: string;
  hint?: string;
}

export interface ReadingText {
  id: string;
  title: string;
  author: string;
  level: string; // 年级如 "初一"
  difficulty: DifficultyLevel;
  type: TextType;
  segments: TextSegment[];
  tags: string[];
  targetCapabilities: CapabilityType[]; // 该文本最适合训练的能力
}

export interface UserAnswer {
  questionId: string;
  content: string;
  feedback?: string;
  score?: number;
}

export interface UserProfile {
  name: string;
  role: 'student' | 'teacher';
  capabilities: Record<CapabilityType, number>;
  streak: number;
  learningGoal?: CapabilityType; // 当前重点攻克的目标
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
