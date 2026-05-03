import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter
    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        return
    
    frontmatter = parts[1].strip()
    body_text = "---".join(parts[2:]).strip()

    lines = body_text.split('\n')
    new_body = []
    
    current_block = []
    
    def flush_block():
        nonlocal current_block, new_body
        if not current_block:
            return
        
        block_text = '\n'.join(current_block).strip()
        if not block_text:
            new_body.append('\n'.join(current_block))
            current_block = []
            return

        first_line = block_text.split('\n')[0].strip()
        
        # Skip wrapping for headings, horizontal rules, images, tables, or already tagged blocks
        if (first_line.startswith('#') or 
            first_line.startswith('---') or 
            first_line.startswith('![]') or 
            first_line.startswith('|') or
            first_line.startswith(':::')):
            new_body.append(block_text)
        elif re.search(r'[\u4e00-\u9fff]', block_text):
            new_body.append(f":::lang chs\n\n{block_text}\n\n:::")
        elif re.search(r'[a-zA-Z]', block_text):
            new_body.append(f":::lang eng\n\n{block_text}\n\n:::")
        else:
            new_body.append(block_text)
        
        current_block = []

    for line in lines:
        stripped = line.strip()
        # If line is a "separator" or "heading", flush current and handle separately
        if stripped.startswith('#') or stripped.startswith('---') or stripped.startswith('|') or stripped.startswith(':::') or stripped.startswith('!['):
            flush_block()
            new_body.append(line)
        elif not stripped:
            flush_block()
            new_body.append("")
        else:
            current_block.append(line)
    
    flush_block()

    result = f"---\n{frontmatter}\n---\n\n" + "\n".join(new_body)
    
    # Clean up multiple empty lines
    result = re.sub(r'\n{3,}', '\n\n', result)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(result)

dir_path = r'd:\dev\study\quartz\content\Warren_Buffett\Berkshire_Hathaway_Letters'
for file in os.listdir(dir_path):
    if file.endswith('.md') and file != 'index.md':
        print(f"Processing {file}")
        process_file(os.path.join(dir_path, file))
