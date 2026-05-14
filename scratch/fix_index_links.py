import re
import os

file_path = 'content/insights/Duan_Yongping/index.md'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 定义子目录映射
mapping = {
    '理念': ['买股票就是买公司', '投资等于经营企业', '未来现金流折现', '内在价值', '价值投资', '投资的信仰', '市场先生', '宏观与市场', '指数基金', '做空', '生意模式', '护城河', '差异化', '企业文化', '利润之上的追求', '好公司的标准', '好产品', '消费者导向', '品牌', '创新', '诚信与信誉', '广告与营销观', '造钟人vs报时人', '定价权', 'ROE', '财报的理解', '毛估估', '市盈率（PE）', '滚雪球', '基业长青', '能力圈', '安全边际', '机会成本', '复利', '收购', '分红与回购', '买入逻辑', '卖出逻辑', '集中投资', '封仓十年', 'Stop Doing List', '多元化（反对）', '错误与纠错', '做对的事', '本分', '平常心', '长期主义', 'Golf与投资'],
    '谈公司': ['步步高', 'OPPO', 'vivo', '苹果', '网易', '茅台', '拼多多', '腾讯', '阿里巴巴', '亚马逊', 'GE', 'UHAL', '万科', '雅虎'],
    '谈人物': ['段永平', '巴菲特', '芒格', '黄峥', '丁磊', '乔布斯', '马云', '韦尔奇', '彼得·林奇', '格雷厄姆'],
    '金句': ['段永平金句集']
}

new_content = content

for folder, files in mapping.items():
    for name in files:
        # 查找 [[名字]] 并替换为 [[文件夹/名字|名字]]
        # 注意要处理已经有别名的情况 [[名字|别名]]
        pattern = r'\[\[(' + re.escape(name) + r')(?:\|([^\]]+))?\]\]'
        replacement = r'[[' + folder + r'/\1|\1]]'
        if folder == '金句':
             replacement = r'[[金句/\1|\1]]'
             
        new_content = re.sub(pattern, replacement, new_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"Fixed links in {file_path}")
