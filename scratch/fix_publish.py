import os

# 包含所有需要注入 publish: true 的路径
target_dirs = [
    'content/wiki/companies',
    'content/wiki/concepts',
    'content/wiki/people',
    'content/insights/Duan_Yongping' # 脚本现在支持递归
]

def fix_folder(folder_path):
    if not os.path.exists(folder_path):
        return
    
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith('.md'):
                file_path = os.path.join(root, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if 'publish: true' not in content:
                        if content.startswith('---'):
                            parts = content.split('---', 2)
                            if len(parts) >= 3:
                                new_content = '---' + '\npublish: true' + parts[1] + '---' + parts[2]
                                with open(file_path, 'w', encoding='utf-8') as f:
                                    f.write(new_content)
                                    print(f"Updated: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

for d in target_dirs:
    fix_folder(d)
