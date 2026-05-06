import os
import re

def add_publish_flag(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for existing frontmatter
                frontmatter_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
                
                if frontmatter_match:
                    frontmatter = frontmatter_match.group(1)
                    # Check if publish flag already exists
                    if not re.search(r"^publish:\s*", frontmatter, re.MULTILINE):
                        # Add publish: true
                        new_frontmatter = frontmatter.strip() + "\npublish: true"
                        new_content = f"---\n{new_frontmatter}\n---" + content[frontmatter_match.end():]
                        
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Added publish: true to {file_path}")
                else:
                    # No frontmatter, create it
                    new_content = f"---\npublish: true\n---\n" + content
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Created frontmatter with publish: true for {file_path}")

if __name__ == "__main__":
    content_dir = os.path.join(os.getcwd(), "content")
    add_publish_flag(content_dir)
