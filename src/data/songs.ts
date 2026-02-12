import type { Song, Note, Artist } from '@/types';

// 已学会的歌曲
export const learnedSongs: Song[] = [
  {
    id: '1',
    title: '一次就好',
    artist: '杨宗纬',
    duration: '3:45',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
    description: '电影《夏洛特烦恼》插曲，深情款款的演绎风格',
    learnedDate: '2023-06-15',
    status: 'learned',
  },
  {
    id: '2',
    title: '空白格',
    artist: '杨宗纬',
    duration: '4:12',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    description: '简单吉他伴奏，考验情感表达的歌曲',
    learnedDate: '2023-08-20',
    status: 'learned',
  },
  {
    id: '3',
    title: '其实都没有',
    artist: '杨宗纬',
    duration: '3:58',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    description: '平淡中带着深刻情感的经典之作',
    learnedDate: '2023-10-05',
    status: 'learned',
  },
  {
    id: '4',
    title: '洋葱',
    artist: '杨宗纬',
    duration: '4:30',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    description: '层层递进的情感，需要极强的控制力',
    learnedDate: '2023-12-10',
    status: 'learned',
  },
  {
    id: '5',
    title: '凉凉',
    artist: '杨宗纬 & 张碧晨',
    duration: '3:52',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop',
    description: '电视剧《三生三世十里桃花》片尾曲',
    learnedDate: '2024-01-18',
    status: 'learned',
  },
  {
    id: '6',
    title: '体面',
    artist: '于文文',
    duration: '4:05',
    cover: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop',
    description: '电影《前任3》插曲，关于分手的体面',
    learnedDate: '2024-03-22',
    status: 'learned',
  },
];

// 正在学习的歌曲
export const learningSongs: Song[] = [
  {
    id: '7',
    title: '需要人陪',
    artist: '王力宏',
    duration: '4:20',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    description: '力宏经典情歌，R&B风格的代表作',
    progress: 75,
    status: 'learning',
  },
  {
    id: '8',
    title: '他不爱我',
    artist: '张杰',
    duration: '3:55',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    description: '张杰翻唱版本，高音挑战',
    progress: 60,
    status: 'learning',
  },
  {
    id: '9',
    title: '多想在平庸的生活拥抱你',
    artist: '隔壁老樊',
    duration: '4:15',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
    description: '民谣风格，烟嗓唱法练习',
    progress: 45,
    status: 'learning',
  },
  {
    id: '10',
    title: '你的答案',
    artist: '阿冗',
    duration: '3:48',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    description: '励志歌曲，需要爆发力的演绎',
    progress: 30,
    status: 'learning',
  },
];

// 计划学习的歌曲
export const plannedSongs: Song[] = [
  {
    id: '11',
    title: '唯一',
    artist: '王力宏',
    duration: '4:08',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    description: '经典情歌，准备挑战',
    status: 'planned',
  },
  {
    id: '12',
    title: '这，就是爱',
    artist: '张杰',
    duration: '4:25',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    description: '高音歌曲，需要持续练习',
    status: 'planned',
  },
  {
    id: '13',
    title: '四块五',
    artist: '隔壁老樊',
    duration: '3:52',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop',
    description: '民谣风格，情感表达',
    status: 'planned',
  },
];

// 喜欢的歌手
export const favoriteArtists: Artist[] = [
  {
    id: '1',
    name: '杨宗纬',
    avatar: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    description: '深情演绎，情感细腻，是我最主要的模仿对象',
  },
  {
    id: '2',
    name: '王力宏',
    avatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    description: '音乐才子，R&B和流行完美融合',
  },
  {
    id: '3',
    name: '张杰',
    avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop',
    description: '高音王子，现场实力超强',
  },
  {
    id: '4',
    name: '隔壁老樊',
    avatar: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=200&h=200&fit=crop',
    description: '民谣歌手，烟嗓独特，唱出生活感悟',
  },
];

// 杂谈笔记
export const notes: Note[] = [
  {
    id: '1',
    title: '关于唱歌呼吸的一些心得',
    content: '唱歌时的呼吸和平时说话完全不同。腹式呼吸是基础，但更重要的是要学会控制气息的流动。我在练习《一次就好》时发现，副歌部分需要更稳定的气息支撑，否则很容易破音。建议每天做10分钟的呼吸练习：吸气4秒，屏息4秒，呼气6秒。这样可以有效提升肺活量和气息控制能力。',
    date: '2024-01-15',
    tags: ['技巧', '呼吸', '练习'],
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: '为什么我喜欢杨宗纬的歌',
    content: '第一次听杨宗纬的歌是《洋葱》，那时候就被他独特的嗓音和情感表达打动了。他的歌不炫技，但每一个音符都充满了故事。后来陆续听了《一次就好》《空白格》《其实都没有》，发现他的歌都有一个共同点：简单却深刻。这也是我学唱歌的目标——不是唱得有多难，而是唱得有多真。',
    date: '2024-02-08',
    tags: ['感悟', '杨宗纬', '音乐'],
  },
  {
    id: '3',
    title: '学唱歌一年多的变化',
    content: '从去年6月开始认真学唱歌，到现在已经一年多了。最开始连《小星星》都唱不好，到现在能完整演绎《洋葱》这样的高难度歌曲。最大的变化不是技巧上的提升，而是对音乐的理解更深了。以前只是听旋律，现在会注意编曲、和声、情感递进。唱歌已经成为我生活中不可或缺的一部分。',
    date: '2024-03-20',
    tags: ['成长', '记录', '心得'],
  },
  {
    id: '4',
    title: '录音设备的选择心得',
    content: '很多初学者会问用什么设备录音。我的建议是：先不要追求昂贵的设备。手机+耳机就可以开始。我最初就是用iPhone自带的语音备忘录录的，虽然音质一般，但足够发现自己的问题。等技术有一定基础后，可以考虑入一个USB电容麦，比如舒尔MV7或者铁三角AT2020USB+。',
    date: '2024-04-05',
    tags: ['设备', '录音', '建议'],
  },
  {
    id: '5',
    title: '如何在KTV脱颖而出',
    content: '作为一个程序员，公司聚会难免要去KTV。我的秘诀是：选适合自己的歌，不盲目追求高音。杨宗纬的歌在KTV很受欢迎，而且不需要太高的音域。关键是情感投入，把歌词的故事讲出来。另外，不要一直拿着麦克风，适当让给别人，这样大家都能玩得开心。',
    date: '2024-05-12',
    tags: ['KTV', '社交', '技巧'],
  },
  {
    id: '6',
    title: '唱歌和编程的共通之处',
    content: '很多人觉得唱歌和编程是完全不同的两件事，但我发现它们有很多共通之处。都需要大量的练习，都需要注意细节，都需要不断优化。写代码要debug，唱歌也要"debug"——找出问题所在，然后针对性练习。而且两者都能给我带来巨大的成就感，一个是创造出好用的产品，一个是演绎出动人的歌曲。',
    date: '2024-06-01',
    tags: ['思考', '编程', '音乐'],
  },
];
