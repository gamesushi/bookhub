import os

search_str = "3523dd3bc21981e88bc9cef7c3c7c60c"
root_dir = r"d:\dev\study\quartz"

for root, dirs, files in os.walk(root_dir):
    if "node_modules" in dirs:
        dirs.remove("node_modules")
    if ".git" in dirs:
        dirs.remove(".git")
    for file in files:
        file_path = os.path.join(root, file)
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                if search_str in f.read():
                    print(f"Found in: {file_path}")
        except:
            pass
