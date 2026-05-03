import subprocess
import os
import re

git_dir = r"d:\dev\study\quartz"
target_dir = os.path.join(git_dir, "content", "Warren_Buffett", "Berkshire_Hathaway_Letters")

def get_all_shas():
    output = subprocess.check_output(['git', 'rev-list', '--objects', '--all'], cwd=git_dir).decode('utf-8', errors='ignore')
    return [line.split()[0] for line in output.splitlines() if line.strip()]

def recover_and_fix_title(sha, filename, title_zh):
    target_path = os.path.join(target_dir, filename)
    
    # Get raw content from git
    content_bytes = subprocess.check_output(['git', 'cat-file', '-p', sha], cwd=git_dir)
    content = content_bytes.decode('utf-8', errors='replace')
    
    # Strip existing frontmatter if it exists to replace it cleanly
    if content.startswith("---"):
        # Find end of frontmatter
        end_idx = content.find("---", 3)
        if end_idx != -1:
            body = content[end_idx+3:]
        else:
            body = content
    else:
        body = content
        
    # Create new frontmatter
    new_content = f"---\ntitle_zh: \"{title_zh}\"\ndg-publish: true\n---\n\n" + body.lstrip()
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Recovered and titled {filename} from {sha}")

if __name__ == "__main__":
    # 2014 History
    recover_and_fix_title('073ae002e9d92dca3b34ce1fff05a2970902d684', '2014_Berkshire_Past_Present_and_Future.md', '2014 年伯克希尔的过去、现在和未来')
    
    # 1999 Letter
    recover_and_fix_title('aa297594998464650989c2379b0bb956db84ba72', '1999_Letter_to_Berkshire_Shareholders.md', '1999 年致股东的信')
    
    # Search for Vice Chairman
    shas = get_all_shas()
    for sha in shas:
        try:
            # Only check blobs around the expected size (57KB uncompressed)
            # Git cat-file -s gives size
            size = int(subprocess.check_output(['git', 'cat-file', '-s', sha], cwd=git_dir).strip())
            if size > 10000 and size < 200000:
                content_bytes = subprocess.check_output(['git', 'cat-file', '-p', sha], cwd=git_dir, stderr=subprocess.DEVNULL)
                if b"Vice Chairman" in content_bytes and b"2014" in content_bytes:
                    if sha != '073ae002e9d92dca3b34ce1fff05a2970902d684':
                        recover_and_fix_title(sha, '2014_Vice_Chairman’s_Thoughts.md', '2014 年副主席的思考')
        except:
            pass
