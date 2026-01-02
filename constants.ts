
import { CapabilityType, PISACapability, ReadingText } from './types';

export const PISA_CAPABILITIES: Record<CapabilityType, PISACapability> = {
  [CapabilityType.R1]: {
    id: CapabilityType.R1,
    name: '获取信息',
    description: '从文本中找出明确事实，进行文本定位。'
  },
  [CapabilityType.R2]: {
    id: CapabilityType.R2,
    name: '直接推论',
    description: '基于文本进行合理推断，如情绪、因果等。'
  },
  [CapabilityType.R3]: {
    id: CapabilityType.R3,
    name: '整合与解释',
    description: '概括主旨，理解人物动机及深层逻辑。'
  },
  [CapabilityType.R4]: {
    id: CapabilityType.R4,
    name: '评价与批判',
    description: '判断作者观点，形成并表达个人独立的看法。'
  }
};

export const SAMPLE_TEXTS: ReadingText[] = [
  // --- 新增：中国文脉专项任务 ---
  {
    id: 'mission_001',
    title: '中国文脉：唐诗的巅峰与现代的反思',
    author: '余秋雨',
    level: '初中',
    difficulty: 'Advanced',
    type: 'History',
    tags: ['中国文脉', '文学评论', '唐诗'],
    targetCapabilities: [CapabilityType.R3, CapabilityType.R4],
    segments: [
      { 
        id: 's1', 
        content: '唐诗是全人类文学史上的奇迹。从初唐四杰的刚健骨气，到盛唐李杜的豪迈与沉郁，再到晚唐的婉丽，这种喷薄而出的创造力源于大唐帝国的开放气象。然而，当我们回望现代文学，为何那种磅礴的文脉似乎有所断裂？', 
        hint: '关注作者对唐诗风格多样性的总结。' 
      }
    ]
  },
  // --- 科学说明文：初级 (Focus: R1) ---
  {
    id: 'sci_001',
    title: '蜜蜂的语言：圆圈舞与摆尾舞',
    author: '科普中国',
    level: '小学高年级',
    difficulty: 'Beginner',
    type: 'Science',
    tags: ['生物', '昆虫行为'],
    targetCapabilities: [CapabilityType.R1],
    segments: [
      { 
        id: 's1', 
        content: '当蜜蜂发现距离蜂巢不到50米的蜜源时，它会跳“圆圈舞”；而当蜜源超过100米时，则会跳起复杂的“摆尾舞”，通过摆动的频率来告知同伴距离 and 方向。', 
        hint: '请留意不同舞蹈对应的具体距离数值。' 
      }
    ]
  },
  // --- 科学说明文：中级 (Focus: R2) ---
  {
    id: 'sci_002',
    title: '温室效应与全球气候调节',
    author: '地球科学杂志',
    level: '初中',
    difficulty: 'Intermediate',
    type: 'Science',
    tags: ['环境', '物理机制'],
    targetCapabilities: [CapabilityType.R2, CapabilityType.R1],
    segments: [
      { 
        id: 's1', 
        content: '大气中的二氧化碳如同温室的玻璃。它允许短波太阳辐射通过，却阻挡地表发出的长波热辐射流向太空。这种能量收支的不平衡，是地表升温的直接诱因。', 
        hint: '尝试理清能量“进”与“出”的因果逻辑链。' 
      }
    ]
  },
  // --- 科学说明文：高级 (Focus: R3, R4) ---
  {
    id: 'sci_003',
    title: '量子纠缠：爱因斯坦的“幽灵”是否真实？',
    author: '量子前沿',
    level: '初中/高中',
    difficulty: 'Advanced',
    type: 'Science',
    tags: ['量子物理', '科学哲学'],
    targetCapabilities: [CapabilityType.R3, CapabilityType.R4],
    segments: [
      { 
        id: 's1', 
        content: '贝尔不等式的实验验证似乎宣示了局部现实主义的破产。然而，实验中存在的“检测漏洞”和“定域性漏洞”仍让部分怀疑论者认为，我们尚未能彻底排除隐变量的存在。', 
        hint: '思考科学家是如何通过识别“漏洞”来评价一项论证的严谨性的。' 
      }
    ]
  },
  {
    id: 'txt_001',
    title: '荷塘月色',
    author: '朱自清',
    level: '初中',
    difficulty: 'Intermediate',
    type: 'Prose',
    tags: ['文学经典', '写景抒情'],
    targetCapabilities: [CapabilityType.R2, CapabilityType.R3],
    segments: [
      { id: 's1', content: '这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。', hint: '注意作者此时的心境描写。' },
      { id: 's2', content: '月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了；妻在屋里拍着闰儿，朦朦胧胧地哼着眠歌。我悄悄地披上大衫，带上门出去。', hint: '环境的宁静与作者内心的孤独对比。' }
    ]
  },
  {
    id: 'txt_004',
    title: '人工智能的伦理边界',
    author: '深度评论',
    level: '初中',
    difficulty: 'Advanced',
    type: 'News',
    tags: ['科技', '伦理'],
    targetCapabilities: [CapabilityType.R4, CapabilityType.R3],
    segments: [
      { id: 's1', content: '当AI可以生成以假乱真的图像时，真实性的定义是否已经瓦解？我们必须重新审视证据权重的法律价值。', hint: '思考作者对真实性的担忧。' }
    ]
  },
  {
    id: 'txt_005',
    title: '《史记·陈涉世家》节选',
    author: '司马迁',
    level: '初中',
    difficulty: 'Advanced',
    type: 'History',
    tags: ['文言文', '历史'],
    targetCapabilities: [CapabilityType.R3, CapabilityType.R4],
    segments: [
      { id: 's1', content: '陈涉太息曰：“嗟乎！燕雀安知鸿鹄之志哉！”', hint: '理解人物的雄心壮志。' }
    ]
  }
];

export const MOCK_USER_PROFILE = {
  name: '陈同学',
  role: 'student' as const,
  streak: 12,
  learningGoal: CapabilityType.R4,
  capabilities: {
    [CapabilityType.R1]: 85,
    [CapabilityType.R2]: 72,
    [CapabilityType.R3]: 65,
    [CapabilityType.R4]: 40
  }
};
