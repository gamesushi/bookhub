import os

def check_corruption(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = [f.readline() for _ in range(5)]
            if len(lines) >= 2:
                if lines[0].strip() == '---' and lines[1].startswith(':::lang'):
                    return True
    except:
        pass
    return False

def main():
    target_dir = r'd:\dev\study\quartz\content\Warren_Buffett'
    corrupted = []
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                if check_corruption(path):
                    corrupted.append(path)
    
    print(f"Found {len(corrupted)} corrupted files:")
    for c in corrupted:
        print(c)

if __name__ == "__main__":
    main()
