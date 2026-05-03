import os
import re

def is_chinese(text):
    if not text: return False
    return any('\u4e00' <= char <= '\u9fff' for char in text)

def extract_zh_title(content):
    # Find all zh blocks
    zh_blocks = re.findall(r':::lang zh(.*?):::', content, re.DOTALL)
    
    # 1. Look for H1 titles in any zh block
    for block in zh_blocks:
        h1_matches = re.findall(r'^#\s+(.+)$', block, re.MULTILINE)
        for h1 in h1_matches:
            h1 = h1.strip()
            # Remove HTML tags like </br>
            h1 = re.sub(r'<[^>]+>', '', h1).strip()
            # Remove backslashes used for markdown escapes
            h1 = h1.replace("\\.", ".").replace("\\-", "-").replace("\\#", "#").replace('\\"', '"')
            if is_chinese(h1):
                return h1
                
    # 2. Look for - 标题：... in any zh block
    for block in zh_blocks:
        title_matches = re.findall(r'-\s+标题：\s*(.*?)(?:\n|$)', block)
        for title in title_matches:
            title = title.strip()
            # Clean wikilinks
            title = re.sub(r'\[\[.*?\|(.*?)\]\]', r'\1', title)
            title = re.sub(r'\[\[(.*?)\]\]', r'\1', title)
            # Remove backslashes used for markdown escapes
            title = title.replace("\\.", ".").replace("\\-", "-").replace("\\#", "#").replace('\\"', '"')
            # If it's explicitly labeled as a title in a zh block, we take it even if it's English
            if title:
                return title
                
    return None

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Check if title_zh already exists in frontmatter
    parts = re.split(r'^---\s*$', text, maxsplit=2, flags=re.MULTILINE)
    if len(parts) >= 3:
        fm_text = parts[1]
        if re.search(r'^title_zh:', fm_text, re.MULTILINE):
            return False
            
    zh_title = extract_zh_title(text)
    if not zh_title:
        # Fallback: if filename has a year and name, try to make it nice? 
        # Better to stick to extracted titles for now.
        return False
        
    if len(parts) < 3:
        # No frontmatter, create one
        new_text = f"---\ntitle_zh: \"{zh_title}\"\n---\n\n" + text
    else:
        # Add to existing frontmatter
        fm_lines = parts[1].split('\n')
        # Insert at the end of frontmatter
        new_fm = "\n".join([line for line in fm_lines if line.strip()])
        new_fm += f"\ntitle_zh: \"{zh_title}\"\n"
        new_text = f"---\n{new_fm}---\n{parts[2]}"
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)
    return True

def main():
    target_dir = r'd:\dev\study\quartz\content\Warren_Buffett'
    count = 0
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md'):
                if process_file(os.path.join(root, file)):
                    count += 1
                    
    print(f"Updated {count} files with title_zh.")

if __name__ == "__main__":
    main()
