import os
import re

def is_chinese(text):
    if not text.strip(): return False
    return any('\u4e00' <= char <= '\u9fff' for char in text)

def split_mixed_line(line):
    stripped = line.strip()
    if not stripped: return [("none", line)]
    if stripped == "---": return [("special", line)]
    
    if "![" in stripped and "](" in stripped:
        return [("common", line)]
        
    has_zh = is_chinese(stripped)
    has_en = any('a' <= c.lower() <= 'z' for c in stripped)
    
    if not has_zh: return [("en", line)]
    if not has_en: return [("zh", line)]
    
    first_zh = -1
    for i, c in enumerate(line):
        if '\u4e00' <= c <= '\u9fff':
            first_zh = i
            break
            
    split_pos = first_zh
    found_digits = False
    while split_pos > 0:
        prev_char = line[split_pos - 1]
        if prev_char.isdigit():
            found_digits = True
            split_pos -= 1
        elif prev_char in " \t().-—–/<>:":
            if found_digits and prev_char in " \t":
                break
            split_pos -= 1
        else:
            break
            
    en_part = line[:split_pos].strip()
    zh_part = line[split_pos:].strip()
    
    # Cleanup trailing tags in EN part if they were split
    if en_part.endswith('<br') or en_part.endswith('</br'):
        # If it's a broken tag, just move it back to EN
        pass # Already in EN
        
    # Cleanup leading junk in ZH part
    zh_part = re.sub(r'^[:>/\s]+', '', zh_part)
    
    header_match = re.match(r'^(#+\s*)', en_part)
    if header_match:
        prefix = header_match.group(1)
        if not zh_part.startswith('#'):
            zh_part = prefix + zh_part
            
    if en_part.startswith('**') and not en_part.endswith('**'):
        en_part = en_part + "**"
        zh_part = "**" + zh_part
    elif en_part.startswith('**') and en_part.endswith('**') and not zh_part.startswith('**'):
         zh_part = "**" + zh_part + "**"
        
    if not en_part: return [("zh", zh_part)]
    if not zh_part: return [("en", en_part)]
    
    return [("en", en_part), ("zh", zh_part)]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_lines = []
    frontmatter = []
    in_frontmatter = 0
    
    for idx, line in enumerate(lines):
        s = line.strip()
        if idx == 0 and s == "---": 
            in_frontmatter = 1
            frontmatter.append(line)
            continue
        if in_frontmatter == 1 and s == "---": 
            in_frontmatter = 2
            frontmatter.append(line)
            continue
        if in_frontmatter == 1:
            frontmatter.append(line)
            continue
        
        if s.startswith(':::lang') or s == ':::':
            continue
        cleaned_lines.append(line)

    merged_lines = []
    i = 0
    while i < len(cleaned_lines):
        line = cleaned_lines[i]
        stripped = line.strip()
        if not stripped:
            merged_lines.append(line)
            i += 1
            continue
            
        if stripped.startswith('#') or (stripped.startswith('**') and stripped.endswith('**')):
            merged_text = stripped
            j = i + 1
            while j < len(cleaned_lines):
                next_line = cleaned_lines[j].strip()
                if not next_line:
                    j += 1
                    continue
                if next_line.startswith('#') or (next_line.startswith('**') and next_line.endswith('**')) or (is_chinese(next_line) and len(next_line) < 150):
                    clean_next = next_line.lstrip('#').strip('*').strip()
                    merged_text += " " + clean_next
                    j += 1
                else:
                    break
            merged_lines.append(merged_text)
            i = j
        else:
            merged_lines.append(line)
            i += 1

    all_items = []
    for line in merged_lines:
        all_items.extend(split_mixed_line(line))

    final_output = []
    final_output.extend(frontmatter)
    
    current_lang = None
    current_group = []
    
    def flush_group():
        nonlocal current_lang, current_group
        if not current_group: return
        
        group_content = [l.strip() for l in current_group if l.strip()]
        if not group_content: return
        
        if current_lang in ['en', 'zh']:
            final_output.append(f"\n:::lang {current_lang}\n\n")
            for l in group_content:
                final_output.append(l + "\n\n")
            final_output.append(":::\n")
        elif current_lang == "common":
            for l in group_content:
                final_output.append("\n" + l + "\n")
        else:
            for l in current_group:
                final_output.append(l + "\n")
                
        current_group = []
        current_lang = None

    for lang, text in all_items:
        if lang in ["special", "common"]:
            flush_group()
            final_output.append("\n" + text.strip() + "\n")
        elif lang == "none":
            flush_group()
        elif lang == current_lang:
            current_group.append(text)
        else:
            flush_group()
            current_lang = lang
            current_group.append(text)
            
    flush_group()

    result = "".join(final_output)
    result = re.sub(r'\n{3,}', '\n\n', result)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(result.strip() + "\n")

def main():
    root_dir = r'd:\dev\study\quartz\content\Warren_Buffett'
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                process_file(os.path.join(root, file))
    print("All files processed successfully.")

if __name__ == "__main__":
    main()
