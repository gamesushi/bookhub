import os
import re

backup_dir = r'd:\dev\study\Yestoday\Warren_Buffett\Berkshire_Hathaway_Letters'
content_dir = r'd:\dev\study\quartz\content\Warren_Buffett\Berkshire_Hathaway_Letters'

for file in os.listdir(backup_dir):
    if file.endswith('.md'):
        backup_path = os.path.join(backup_dir, file)
        content_path = os.path.join(content_dir, file)
        
        # Read backup (bilingual body)
        with open(backup_path, 'r', encoding='utf-8') as f:
            backup_content = f.read()
        
        # Read current (frontmatter)
        if os.path.exists(content_path):
            with open(content_path, 'r', encoding='utf-8') as f:
                content_text = f.read()
            
            # Extract frontmatter
            parts = re.split(r'^---\s*$', content_text, flags=re.MULTILINE)
            if len(parts) >= 3:
                frontmatter = parts[1].strip()
                # Use backup body
                new_content = f"---\n{frontmatter}\n---\n\n{backup_content}"
                
                with open(content_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Restored bilingual content for {file}")
