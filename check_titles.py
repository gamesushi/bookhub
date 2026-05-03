import os
import re

path = 'd:/dev/study/quartz/content/Warren_Buffett/Berkshire_Hathaway_Letters/'
files = sorted([f for f in os.listdir(path) if f.endswith('.md')])[:30]

for f in files:
    if f.endswith('.md'):
        file_path = os.path.join(path, f)
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                content = "".join(lines)
                
                # Check title_zh
                match_zh = re.search(r'title_zh: "(.*?)"', content)
                if not match_zh:
                    match_zh = re.search(r'title_zh: (.*?)\n', content)
                
                title_zh = match_zh.group(1).strip() if match_zh else "NO TITLE_ZH"
                
                # Check first H1
                h1 = "NO H1"
                for line in lines:
                    if line.startswith('# '):
                        h1 = line.strip()
                        break
                
                print(f"{f} | ZH: {title_zh} | H1: {h1}")
        except Exception as e:
            print(f"{f}: ERROR {e}")
