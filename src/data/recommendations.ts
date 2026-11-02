import { StructuredPreferences } from '../components/DietaryPreferenceDrawer';

export interface DishRecommendation {
  id: string;
  dishName: string;
  shopName: string;
  price: number;
  originalPrice: number;
  rating: string;
  deliveryTime: string;
  imageBadge: string;
  grayTag: string;
  greenTag: string;
  visualType:
    | 'mushroom-chicken'
    | 'steamed-fish'
    | 'tomato-beef'
    | 'spicy-beef'
    | 'boiled-pork'
    | 'teriyaki-chicken'
    | 'steam-pot-chicken'
    | 'bento-box'
    | 'roast-duck';
}

export interface AssistantResponseData {
  reply: string;
  recommendations: DishRecommendation[];
}

export const DEFAULT_PREFERENCES = ['不吃香菜', '偏好清淡', '喜欢米饭'];

export const QUICK_CHOICES = [
  {
    id: 'light',
    title: '清淡一点',
    subtitle: '少油少盐养胃',
    prompt: '今天想吃清淡一点',
  },
  {
    id: 'spicy',
    title: '想吃辣的',
    subtitle: '川湘下饭解压',
    prompt: '今天想吃辣的',
  },
  {
    id: 'novel',
    title: '换换口味',
    subtitle: '尝试新店料理',
    prompt: '今天想换换口味',
  },
  {
    id: 'budget',
    title: '经济实惠',
    subtitle: '25元超值便当',
    prompt: '想要经济实惠的25元便当',
  },
];

const LIGHT_BATCHES: DishRecommendation[][] = [
  // Batch 1 (Exact 3 dishes from prototype image_2b30280f.png)
  [
    {
      id: 'light-1',
      dishName: '香菇滑鸡饭套餐',
      shopName: '真蒸好味·粤式蒸品',
      price: 26,
      originalPrice: 32,
      rating: '4.8',
      deliveryTime: '约30分钟',
      imageBadge: '尝鲜',
      grayTag: '少油',
      greenTag: '无香菜',
      visualType: 'mushroom-chicken',
    },
    {
      id: 'light-2',
      dishName: '清蒸粤式鲈鱼定食',
      shopName: '潮粤小馆·轻食水产',
      price: 32,
      originalPrice: 38,
      rating: '4.9',
      deliveryTime: '约35分钟',
      imageBadge: '高蛋白',
      grayTag: '极清淡',
      greenTag: '原汁原味',
      visualType: 'steamed-fish',
    },
    {
      id: 'light-3',
      dishName: '浓香番茄慢炖牛腩定食',
      shopName: '本味和食·营养小馆',
      price: 29.9,
      originalPrice: 36,
      rating: '4.7',
      deliveryTime: '约28分钟',
      imageBadge: '慢火鲜炖',
      grayTag: '少油炖煮',
      greenTag: '自然开胃',
      visualType: 'tomato-beef',
    },
  ],
  // Batch 2
  [
    {
      id: 'light-4',
      dishName: '虫草花排骨炖汤配时蔬饭',
      shopName: '陈记广式原盅炖品',
      price: 25.8,
      originalPrice: 34,
      rating: '4.9',
      deliveryTime: '约25分钟',
      imageBadge: '原盅慢炖',
      grayTag: '少盐养胃',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'light-5',
      dishName: '山药红枣土鸡汤钵钵饭',
      shopName: '老娘舅·江南健康快餐',
      price: 24.5,
      originalPrice: 31,
      rating: '4.8',
      deliveryTime: '约22分钟',
      imageBadge: '温润养胃',
      grayTag: '清淡少油',
      greenTag: '软糯五常米',
      visualType: 'mushroom-chicken',
    },
    {
      id: 'light-6',
      dishName: '鲜虾仁滑蛋五谷营养定食',
      shopName: '蒸小皖·徽式现蒸营养餐',
      price: 23.8,
      originalPrice: 30,
      rating: '4.9',
      deliveryTime: '约26分钟',
      imageBadge: '高蛋白',
      grayTag: '全蒸少油',
      greenTag: '鲜甜嫩滑',
      visualType: 'steamed-fish',
    },
  ],
  // Batch 3
  [
    {
      id: 'light-7',
      dishName: '竹荪松茸炖老母鸡汤饭',
      shopName: '江南一碗汤·养生食肆',
      price: 27.5,
      originalPrice: 35,
      rating: '4.9',
      deliveryTime: '约27分钟',
      imageBadge: '滋补暖胃',
      grayTag: '低脂清汤',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'light-8',
      dishName: '清蒸深海鳕鱼配西兰花饭',
      shopName: '轻食派·高蛋白能量厨房',
      price: 31.8,
      originalPrice: 39,
      rating: '4.8',
      deliveryTime: '约29分钟',
      imageBadge: '深海鲜鱼',
      grayTag: '少油少盐',
      greenTag: '高蛋白低脂',
      visualType: 'steamed-fish',
    },
    {
      id: 'light-9',
      dishName: '白灼广东菜心拼豉油鸡腿饭',
      shopName: '深井裕记·广式烧味茶餐厅',
      price: 25.0,
      originalPrice: 32,
      rating: '4.8',
      deliveryTime: '约24分钟',
      imageBadge: '去皮少油',
      grayTag: '清甜适口',
      greenTag: '配杂粮米饭',
      visualType: 'roast-duck',
    },
  ],
];

const SPICY_BATCHES: DishRecommendation[][] = [
  // Batch 1
  [
    {
      id: 'spicy-1',
      dishName: '鲜椒小炒黄牛肉定食',
      shopName: '湘间小灶·鲜炒湘菜',
      price: 26.8,
      originalPrice: 35,
      rating: '4.9',
      deliveryTime: '约26分钟',
      imageBadge: '招牌必点',
      grayTag: '猛火现炒',
      greenTag: '无香菜',
      visualType: 'spicy-beef',
    },
    {
      id: 'spicy-2',
      dishName: '招牌沸腾水煮肉片套餐',
      shopName: '川魂川味小馆·现炒下饭',
      price: 24.9,
      originalPrice: 32,
      rating: '4.8',
      deliveryTime: '约28分钟',
      imageBadge: '热辣下饭',
      grayTag: '川湘风味',
      greenTag: '已免香菜',
      visualType: 'boiled-pork',
    },
    {
      id: 'spicy-3',
      dishName: '农家小炒肉配外婆菜双拼',
      shopName: '老乡鸡·品质快餐',
      price: 25.5,
      originalPrice: 33,
      rating: '4.9',
      deliveryTime: '约24分钟',
      imageBadge: '人气爆款',
      grayTag: '香辣开胃',
      greenTag: '五常大米饭',
      visualType: 'tomato-beef',
    },
  ],
  // Batch 2
  [
    {
      id: 'spicy-4',
      dishName: '樟树港辣椒炒黑猪肉饭',
      shopName: '费大厨·辣椒炒肉便当',
      price: 29.8,
      originalPrice: 38,
      rating: '4.9',
      deliveryTime: '约27分钟',
      imageBadge: '下饭王',
      grayTag: '鲜辣少油',
      greenTag: '无香菜',
      visualType: 'spicy-beef',
    },
    {
      id: 'spicy-5',
      dishName: '川味麻婆豆腐拼回锅肉定食',
      shopName: '蜀乡人·正宗川菜小馆',
      price: 23.8,
      originalPrice: 31,
      rating: '4.8',
      deliveryTime: '约25分钟',
      imageBadge: '麻辣鲜香',
      grayTag: '微辣适口',
      greenTag: '汤汁拌饭',
      visualType: 'boiled-pork',
    },
    {
      id: 'spicy-6',
      dishName: '泡椒酸汤肥牛金针菇套餐',
      shopName: '苗家酸汤馆·下饭料理',
      price: 27.9,
      originalPrice: 36,
      rating: '4.9',
      deliveryTime: '约29分钟',
      imageBadge: '酸辣开胃',
      grayTag: '高蛋白肥牛',
      greenTag: '已免香菜',
      visualType: 'tomato-beef',
    },
  ],
  // Batch 3
  [
    {
      id: 'spicy-7',
      dishName: '仔姜爆炒嫩鸭丝盖浇饭',
      shopName: '自贡盐帮菜·现炒单人餐',
      price: 25.9,
      originalPrice: 34,
      rating: '4.8',
      deliveryTime: '约26分钟',
      imageBadge: '鲜嫩微辣',
      grayTag: '仔姜去腥',
      greenTag: '无香菜',
      visualType: 'spicy-beef',
    },
    {
      id: 'spicy-8',
      dishName: '剁椒蒸龙利鱼柳配时蔬饭',
      shopName: '湘味蒸菜馆·轻油湘菜',
      price: 26.5,
      originalPrice: 33,
      rating: '4.9',
      deliveryTime: '约24分钟',
      imageBadge: '蒸制少油',
      grayTag: '鲜辣高蛋白',
      greenTag: '无刺鱼柳',
      visualType: 'steamed-fish',
    },
    {
      id: 'spicy-9',
      dishName: '香辣干锅花菜拼红烧肉便当',
      shopName: '米村拌饭·石锅现做',
      price: 24.5,
      originalPrice: 32,
      rating: '4.8',
      deliveryTime: '约23分钟',
      imageBadge: '热乎石锅',
      grayTag: '香脆下饭',
      greenTag: '五常糙米饭',
      visualType: 'mushroom-chicken',
    },
  ],
];

const NOVEL_BATCHES: DishRecommendation[][] = [
  // Batch 1
  [
    {
      id: 'novel-1',
      dishName: '炙烤照烧鸡腿滑蛋釜饭',
      shopName: '山野家·日式釜饭专门店',
      price: 27.8,
      originalPrice: 36,
      rating: '4.9',
      deliveryTime: '约29分钟',
      imageBadge: '新店尝鲜',
      grayTag: '去皮少油',
      greenTag: '无香菜',
      visualType: 'teriyaki-chicken',
    },
    {
      id: 'novel-2',
      dishName: '云南野生菌菇汽锅鸡套餐',
      shopName: '云海肴·汽锅鸡便当',
      price: 29.9,
      originalPrice: 39,
      rating: '4.8',
      deliveryTime: '约32分钟',
      imageBadge: '特色料理',
      grayTag: '蒸汽凝汤',
      greenTag: '原汁鲜甜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'novel-3',
      dishName: '广式蜜汁叉烧拼豉油鸡饭',
      shopName: '陈香贵·港式烧味茶餐厅',
      price: 28.5,
      originalPrice: 36,
      rating: '4.8',
      deliveryTime: '约27分钟',
      imageBadge: '口碑新店',
      grayTag: '广式微甜',
      greenTag: '赠清润例汤',
      visualType: 'roast-duck',
    },
  ],
  // Batch 2
  [
    {
      id: 'novel-4',
      dishName: '香茅炭烤猪颈肉泰式波奇饭',
      shopName: '暹罗小馆·东南亚轻料理',
      price: 28.9,
      originalPrice: 37,
      rating: '4.9',
      deliveryTime: '约28分钟',
      imageBadge: '异域风味',
      grayTag: '酸甜开胃',
      greenTag: '无香菜',
      visualType: 'tomato-beef',
    },
    {
      id: 'novel-5',
      dishName: '炙烤三文鱼牛油果杂粮能量碗',
      shopName: 'PokeLab·夏威夷波奇饭',
      price: 32.5,
      originalPrice: 42,
      rating: '4.9',
      deliveryTime: '约25分钟',
      imageBadge: '高蛋白',
      grayTag: '少油少盐',
      greenTag: '杂粮粗粮底',
      visualType: 'steamed-fish',
    },
    {
      id: 'novel-6',
      dishName: '寿喜烧肥牛温泉蛋定食',
      shopName: '浅草屋·日式手作便当',
      price: 29.0,
      originalPrice: 38,
      rating: '4.8',
      deliveryTime: '约26分钟',
      imageBadge: '主厨推荐',
      grayTag: '昆布清汤',
      greenTag: '原切谷饲牛',
      visualType: 'mushroom-chicken',
    },
  ],
  // Batch 3
  [
    {
      id: 'novel-7',
      dishName: '潮汕鲜切吊龙牛肉清汤饭',
      shopName: '牛小灶·潮汕鲜牛肉汤馆',
      price: 30.8,
      originalPrice: 39,
      rating: '4.9',
      deliveryTime: '约24分钟',
      imageBadge: '现切鲜牛',
      grayTag: '牛骨清汤',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'novel-8',
      dishName: '地中海香草烤鸡胸配藜麦饭',
      shopName: '谷物集·新派健康料理',
      price: 26.8,
      originalPrice: 34,
      rating: '4.8',
      deliveryTime: '约27分钟',
      imageBadge: '低脂高蛋白',
      grayTag: '橄榄油低温烤',
      greenTag: '杂粮粗粮',
      visualType: 'teriyaki-chicken',
    },
    {
      id: 'novel-9',
      dishName: '松露奶油菌菇焖鸡腿肉套餐',
      shopName: '山丘bistro·创意简餐',
      price: 31.5,
      originalPrice: 40,
      rating: '4.9',
      deliveryTime: '约30分钟',
      imageBadge: '新晋网红',
      grayTag: '奶香醇厚',
      greenTag: '去骨鸡腿肉',
      visualType: 'mushroom-chicken',
    },
  ],
];

const BUDGET_BATCHES: DishRecommendation[][] = [
  // Batch 1
  [
    {
      id: 'budget-1',
      dishName: '香菇滑鸡时蔬超值便当',
      shopName: '谷田稻香·瓦罐米饭',
      price: 18.9,
      originalPrice: 28,
      rating: '4.8',
      deliveryTime: '约22分钟',
      imageBadge: '超值特惠',
      grayTag: '少油少盐',
      greenTag: '无香菜',
      visualType: 'mushroom-chicken',
    },
    {
      id: 'budget-2',
      dishName: '番茄土豆炖牛腩便当',
      shopName: '大米先生·现炒快餐',
      price: 21.5,
      originalPrice: 29,
      rating: '4.9',
      deliveryTime: '约25分钟',
      imageBadge: '神券立减',
      grayTag: '少油炖煮',
      greenTag: '自然开胃',
      visualType: 'tomato-beef',
    },
    {
      id: 'budget-3',
      dishName: '清蒸龙利鱼柳配蒸蛋套餐',
      shopName: '蒸小皖·徽式现蒸营养餐',
      price: 22.8,
      originalPrice: 30,
      rating: '4.9',
      deliveryTime: '约26分钟',
      imageBadge: '高性价比',
      grayTag: '极清淡',
      greenTag: '无刺高蛋白',
      visualType: 'steamed-fish',
    },
  ],
  // Batch 2
  [
    {
      id: 'budget-4',
      dishName: '土豆烧鸡块配青菜双拼饭',
      shopName: '老乡鸡·品质快餐(剑川路店)',
      price: 19.9,
      originalPrice: 27,
      rating: '4.9',
      deliveryTime: '约21分钟',
      imageBadge: '学生特惠',
      grayTag: '家常少油',
      greenTag: '无香菜',
      visualType: 'mushroom-chicken',
    },
    {
      id: 'budget-5',
      dishName: '酸甜咕咾肉拼荷包蛋便当',
      shopName: '港味小厨·超值烧腊便当',
      price: 20.8,
      originalPrice: 28,
      rating: '4.8',
      deliveryTime: '约24分钟',
      imageBadge: '酸甜开胃',
      grayTag: '外酥里嫩',
      greenTag: '含例汤米饭',
      visualType: 'tomato-beef',
    },
    {
      id: 'budget-6',
      dishName: '清炒虾仁西芹配杂粮饭套餐',
      shopName: '留夫鸭·江南便当小馆',
      price: 23.5,
      originalPrice: 31,
      rating: '4.8',
      deliveryTime: '约23分钟',
      imageBadge: '高蛋白',
      grayTag: '少盐清炒',
      greenTag: '鲜甜虾仁',
      visualType: 'steamed-fish',
    },
  ],
  // Batch 3
  [
    {
      id: 'budget-7',
      dishName: '虫草花蒸滑鸡配蒸水蛋套餐',
      shopName: '真功夫·原盅蒸饭专门店',
      price: 21.9,
      originalPrice: 29,
      rating: '4.8',
      deliveryTime: '约22分钟',
      imageBadge: '营养蒸品',
      grayTag: '少油少盐',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'budget-8',
      dishName: '照烧鸡排拼黄金玉米粒便当',
      shopName: '池奈·日式咖喱蛋包饭',
      price: 19.5,
      originalPrice: 26,
      rating: '4.9',
      deliveryTime: '约25分钟',
      imageBadge: '拼好饭爆款',
      grayTag: '微甜少油',
      greenTag: '高蛋白鸡排',
      visualType: 'teriyaki-chicken',
    },
    {
      id: 'budget-9',
      dishName: '农家番茄炒蛋拼红烧豆腐饭',
      shopName: '吉祥混沌·现炒盖浇饭',
      price: 16.8,
      originalPrice: 24,
      rating: '4.8',
      deliveryTime: '约20分钟',
      imageBadge: '极速达',
      grayTag: '酸甜清淡',
      greenTag: '现炒家常味',
      visualType: 'tomato-beef',
    },
  ],
];

const NOODLE_BATCHES: DishRecommendation[][] = [
  [
    {
      id: 'noodle-1',
      dishName: '招牌慢熬牛骨清汤牛肉面',
      shopName: '陈香贵·兰州牛肉面(闵行店)',
      price: 25.8,
      originalPrice: 33,
      rating: '4.9',
      deliveryTime: '约24分钟',
      imageBadge: '现拉鲜面',
      grayTag: '少油清汤',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'noodle-2',
      dishName: '云南菌菇土鸡汤过桥米线',
      shopName: '云味馆·原汤过桥米线',
      price: 24.5,
      originalPrice: 31,
      rating: '4.8',
      deliveryTime: '约26分钟',
      imageBadge: '高汤现煮',
      grayTag: '温润养胃',
      greenTag: '原汁原味',
      visualType: 'mushroom-chicken',
    },
    {
      id: 'noodle-3',
      dishName: '浓香番茄牛腩手工粗面套餐',
      shopName: '和府捞面·草本浓汤面',
      price: 28.9,
      originalPrice: 36,
      rating: '4.9',
      deliveryTime: '约27分钟',
      imageBadge: '品牌大店',
      grayTag: '酸甜开胃',
      greenTag: '软烂牛腩',
      visualType: 'tomato-beef',
    },
  ],
  [
    {
      id: 'noodle-4',
      dishName: '鲜虾蟹籽云吞竹升汤面',
      shopName: '蔡澜港式点心·手工云吞面',
      price: 29.0,
      originalPrice: 37,
      rating: '4.9',
      deliveryTime: '约28分钟',
      imageBadge: '大地鱼汤',
      grayTag: '极清淡',
      greenTag: '无香菜',
      visualType: 'steamed-fish',
    },
    {
      id: 'noodle-5',
      dishName: '老母鸡汤鲜肉小馄饨拼拌面',
      shopName: '吉祥馄饨·江南汤面馆',
      price: 21.8,
      originalPrice: 28,
      rating: '4.8',
      deliveryTime: '约22分钟',
      imageBadge: '暖胃首选',
      grayTag: '少盐清汤',
      greenTag: '皮薄馅大',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'noodle-6',
      dishName: '花胶鸡丝养生米粉套餐',
      shopName: '阿香米线·砂锅现煮',
      price: 26.5,
      originalPrice: 34,
      rating: '4.8',
      deliveryTime: '约25分钟',
      imageBadge: '胶原金汤',
      grayTag: '高蛋白',
      greenTag: '汤面分离',
      visualType: 'mushroom-chicken',
    },
  ],
  [
    {
      id: 'noodle-7',
      dishName: '清炖羊肉萝卜手工汤面',
      shopName: '西贝莜面村·草原牛羊汤面',
      price: 31.5,
      originalPrice: 39,
      rating: '4.9',
      deliveryTime: '约29分钟',
      imageBadge: '零添加清汤',
      grayTag: '少油暖身',
      greenTag: '无香菜',
      visualType: 'steam-pot-chicken',
    },
    {
      id: 'noodle-8',
      dishName: '苏式爆鱼焖肉双浇头细面',
      shopName: '松鹤楼面馆·苏式汤面',
      price: 28.0,
      originalPrice: 35,
      rating: '4.9',
      deliveryTime: '约26分钟',
      imageBadge: '百年老字号',
      grayTag: '清汤鲜甜',
      greenTag: '浇头现制',
      visualType: 'steamed-fish',
    },
    {
      id: 'noodle-9',
      dishName: '酸汤肥牛金针菇红薯粉',
      shopName: '苗家酸汤馆·手工米粉',
      price: 24.9,
      originalPrice: 32,
      rating: '4.8',
      deliveryTime: '约24分钟',
      imageBadge: '酸爽开胃',
      grayTag: '高蛋白肥牛',
      greenTag: '已免香菜',
      visualType: 'tomato-beef',
    },
  ],
];

/**
 * Pure frontend simulated recommendation engine.
 * Dynamically selects and adapts a batch of 3 restaurants based on:
 * 1. The user's conversation demand (query)
 * 2. The user's historical & customized dietary preferences (structuredPrefs)
 */
export function getLocalRecommendation(
  query: string,
  preferences: string[],
  batchIndex = 0,
  structuredPrefs?: StructuredPreferences
): AssistantResponseData {
  // 1. Determine category pool from conversation query or taste history
  let replyPrefix = '好的！为您推荐3道清淡低油的精选套餐：';
  let batches = LIGHT_BATCHES;

  const isNoodleQuery =
    query.includes('面') ||
    query.includes('粉') ||
    query.includes('米线') ||
    query.includes('馄饨');
  const isSpicyQuery =
    query.includes('辣') ||
    query.includes('川') ||
    query.includes('湘') ||
    (structuredPrefs?.tastes.some((t) => t.includes('辣')) && !query.includes('清淡'));
  const isFitnessQuery =
    query.includes('高蛋白') ||
    query.includes('减脂') ||
    query.includes('轻食') ||
    query.includes('低卡') ||
    query.includes('生酮');
  const isBrandQuery =
    query.includes('品牌') ||
    query.includes('大店') ||
    query.includes('连锁');
  const isNovelQuery =
    query.includes('换换口味') ||
    query.includes('新店') ||
    query.includes('尝鲜') ||
    isFitnessQuery ||
    isBrandQuery;
  const isBudgetQuery =
    query.includes('实惠') ||
    query.includes('25') ||
    query.includes('20') ||
    query.includes('便当') ||
    query.includes('便宜') ||
    query.includes('预算') ||
    structuredPrefs?.budget === '20元内';

  if (isNoodleQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！为您推荐3家热乎暖胃的精选汤面与米粉套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家口碑粉面馆：`;
    batches = NOODLE_BATCHES;
  } else if (isSpicyQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！为您推荐3道热辣下饭的精选川湘套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家川湘好店：`;
    batches = SPICY_BATCHES;
  } else if (isFitnessQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！为您推荐3道高蛋白低脂的健康营养套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家高蛋白轻食餐厅：`;
    batches = NOVEL_BATCHES;
  } else if (isBrandQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！已为您筛选附近3家品质稳定的品牌连锁大店套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家品牌大店：`;
    batches = LIGHT_BATCHES;
  } else if (isNovelQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！为您推荐3道附近高分新店的特色套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家口碑新店：`;
    batches = NOVEL_BATCHES;
  } else if (isBudgetQuery) {
    replyPrefix =
      batchIndex === 0
        ? '好的！为您推荐3道25元以内的超值精选套餐：'
        : `已为您换一批符合【${preferences.slice(0, 2).join('·')}】的3家高性价比餐厅：`;
    batches = BUDGET_BATCHES;
  } else if (batchIndex > 0) {
    replyPrefix = `已为您换一批符合【${preferences.slice(0, 3).join('·')}】的3家精选餐厅：`;
  } else if (
    query &&
    !query.includes('清淡') &&
    query !== '换一换'
  ) {
    replyPrefix = `好的！已结合您的需求「${query}」与口味偏好，为您精选3家餐厅套餐：`;
  }

  // 2. Pick the distinct batch of 3 restaurants
  const rawBatch = batches[batchIndex % batches.length];

  // 3. Tailor tags, staple names, delivery time, and budget to user's historical preferences
  const primaryAvoidance =
    structuredPrefs?.avoidances?.[0] ||
    (preferences.includes('不吃香菜') ? '不吃香菜' : '');
  const avoidanceShortTag = primaryAvoidance
    ? primaryAvoidance.replace(/^不吃/, '无')
    : '';
  const primaryHabit = structuredPrefs?.habits?.[0] || '';
  const wantsNoodles =
    !isNoodleQuery &&
    structuredPrefs?.staples?.some((s) => s.includes('面') || s.includes('粉')) &&
    !structuredPrefs?.staples?.includes('米饭');
  const wants30Min = structuredPrefs?.deliveryTime === '30分钟内';
  const wantsUnder20 =
    structuredPrefs?.budget === '20元内' || query.includes('20元');

  const adaptedBatch = rawBatch.map((item, idx) => {
    let dishName = item.dishName;
    if (wantsNoodles && dishName.includes('饭')) {
      dishName = dishName.replace('饭', '汤面');
    }

    let deliveryTime = item.deliveryTime;
    if (wants30Min) {
      const minutes = 22 + ((idx + batchIndex) % 7);
      deliveryTime = `约${minutes}分钟`;
    }

    let price = item.price;
    if (wantsUnder20 && price > 20) {
      price = Number((17.8 + idx * 1.1).toFixed(1));
    }

    // Reflect user's avoidance & health habit on tags
    const greenTag =
      idx === 0 && avoidanceShortTag
        ? avoidanceShortTag
        : idx === 1 && structuredPrefs?.avoidances?.[1]
        ? structuredPrefs.avoidances[1].replace(/^不吃/, '无')
        : item.greenTag;

    const grayTag =
      idx === 0 && primaryHabit && batchIndex > 0 ? primaryHabit : item.grayTag;

    return {
      ...item,
      id: `${item.id}-b${batchIndex}`,
      dishName,
      price,
      deliveryTime,
      grayTag,
      greenTag,
    };
  });

  return {
    reply: replyPrefix,
    recommendations: adaptedBatch,
  };
}

