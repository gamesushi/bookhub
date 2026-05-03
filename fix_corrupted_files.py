import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Detect corruption: starts with --- and has :::lang in the first 10 lines
    if not text.startswith('---'):
        return False
        
    parts = re.split(r'^---\s*$', text, maxsplit=2, flags=re.MULTILINE)
    if len(parts) < 3:
        return False
        
    fm_content = parts[1]
    rest_content = parts[2]
    
    # If :::lang is in the frontmatter, it's corrupted
    if ':::lang' not in fm_content:
        return False
        
    # Extract title_zh from the fake frontmatter
    title_zh_match = re.search(r'^title_zh:\s*"(.*?)"\s*$', fm_content, re.MULTILINE)
    if not title_zh_match:
        # Maybe it's without quotes
        title_zh_match = re.search(r'^title_zh:\s*(.*?)\s*$', fm_content, re.MULTILINE)
        
    if not title_zh_match:
        return False
        
    title_zh = title_zh_match.group(1).strip()
    
    # Remove title_zh line from fm_content to get original content back
    original_part1 = re.sub(r'^title_zh:.*$', '', fm_content, flags=re.MULTILINE).strip()
    
    # Reconstruct
    # We lost parts[0], so we try to guess it or just start with the recovered part
    # Most files lost the "原文信息" block.
    header = ""
    if "Letter" in filepath or "Partners" in filepath:
        header = ":::lang zh\n\n原文信息：\n\n:::\n\n"
        
    new_text = f"---\ntitle_zh: \"{title_zh}\"\ndg-publish: true\n---\n\n{header}{original_part1}\n\n{rest_content}"
    
    # Clean up double newlines
    new_text = re.sub(r'\n{3,}', '\n\n', new_text)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)
    return True

def main():
    target_dir = r'd:\dev\study\quartz\content\Warren_Buffett'
    count = 0
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md'):
                if fix_file(os.path.join(root, file)):
                    count += 1
                    
    print(f"Fixed {count} corrupted files.")

if __name__ == "__main__":
    main()
