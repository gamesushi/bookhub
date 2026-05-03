import os
import re
import yaml

def get_terms(base_dir):
    terms_map = {} # term -> target_filename
    folders = ['concepts', 'companies', 'people']
    
    # Manual extra terms for common names/entities
    extra_terms = {
        "Berkshire Hathaway": "伯克希尔哈撒韦",
        "Berkshire": "伯克希尔哈撒韦",
        "Warren Buffett": "沃伦·巴菲特",
        "Buffett": "沃伦·巴菲特",
        "Charlie Munger": "芒格",
        "Munger": "芒格",
        "Charlie": "芒格",
        "Benjamin Graham": "格雷厄姆",
        "Graham": "格雷厄姆",
        "GEICO": "盖可保险",
        "Coca-Cola": "可口可乐",
        "Coke": "可口可乐",
        "American Express": "美国运通",
        "Amex": "美国运通",
        "Wells Fargo": "富国银行",
        "Washington Post": "华盛顿邮报",
        "BNSF": "BNSF铁路",
        "intrinsic value": "内在价值",
        "margin of safety": "安全边际",
        "book value": "账面价值",
        "float": "保险浮存金",
        "compounding": "复利",
        "shareholders": "股东",
        "dividend": "股息",
        "dividends": "股息",
        "partnership": "合伙基金",
        "Dow": "道琼斯工业指数",
        "S&P 500": "标准普尔500指数"
    }
    
    for folder in folders:
        folder_path = os.path.join(base_dir, folder)
        if not os.path.exists(folder_path):
            continue
            
        for file in os.listdir(folder_path):
            if file.endswith('.md'):
                target = file[:-3]
                terms_map[target] = target
                
                # Try to extract aliases and English names from the file
                try:
                    with open(os.path.join(folder_path, file), 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Extract H1 for potential English name in brackets
                        h1_match = re.search(r'^#\s+(.*?)$', content, re.MULTILINE)
                        if h1_match:
                            h1_text = h1_match.group(1)
                            # Look for (...) or 简称...
                            en_match = re.search(r'[\(（]([a-zA-Z\s\.\&]+)[\)）]', h1_text)
                            if en_match:
                                terms_map[en_match.group(1).strip()] = target
                                
                        fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
                        if fm_match:
                            fm = yaml.safe_load(fm_match.group(1))
                            if fm and 'aliases' in fm:
                                aliases = fm['aliases']
                                if isinstance(aliases, list):
                                    for alias in aliases:
                                        terms_map[alias] = target
                                elif isinstance(aliases, str):
                                    terms_map[aliases] = target
                except Exception as e:
                    print(f"Error reading {file}: {e}")
                    
    # Merge extra terms (only if they don't overwrite a more specific term)
    for k, v in extra_terms.items():
        if k not in terms_map:
            terms_map[k] = v
            
    return terms_map

def add_links_to_text(text, terms_map, sorted_terms):
    # Regex to find existing links to avoid double linking
    # We'll split the text into parts: parts inside [[ ]] and parts outside
    
    pattern = r'(\[\[.*?\]\])'
    parts = re.split(pattern, text)
    
    new_parts = []
    for part in parts:
        if part.startswith('[[') and part.endswith(']]'):
            new_parts.append(part)
        else:
            # Process text outside links
            for term in sorted_terms:
                target = terms_map[term]
                # Use regex for word boundaries if it's English, or just find for Chinese
                if any('\u4e00' <= c <= '\u9fff' for c in term):
                    # For Chinese, we don't have word boundaries, but we want to avoid 
                    # replacing parts of already replaced terms.
                    # This is tricky. A simple way is to replace with a placeholder.
                    placeholder = f"__LINK_{hash(target)}_{term}__"
                    # But wait, we want to replace ALL occurrences? 
                    # Let's just do one per term per file to be safe and clean.
                    if term in part:
                        # Find first occurrence not inside another placeholder
                        # Since we process sorted_terms (longest first), this should be okay.
                        pass
                
            # Actually, a simpler way:
            temp_part = part
            for term in sorted_terms:
                target = terms_map[term]
                
                # We need a way to mark "already linked" in this string
                # Let's use a more robust approach:
                # 1. Identify all possible matches for all terms.
                # 2. Select non-overlapping matches, prioritizing longest.
                pass
            
            # Re-implementing with a better approach:
            temp_part = part
            
            # This is a bit complex to do perfectly with regex in one pass while avoiding 
            # nested links. Let's use a simpler "replace once" strategy for now.
            for term in sorted_terms:
                target = terms_map[term]
                link = f"[[{target}|{term}]]" if target != term else f"[[{target}]]"
                
                # Use a regex that avoids matches inside [[ ]]
                # Since 'part' is already guaranteed to be outside [[ ]], we just need
                # to avoid replacing inside a link we just created.
                
                # We'll use a placeholder to avoid re-matching
                if term in temp_part:
                    # Simple replacement for now, but we should be careful about 
                    # overlapping terms (e.g. "Berkshire" and "Berkshire Hathaway")
                    # Sorting by length handles this.
                    # We also need to avoid matching "Warren" inside "[[Warren Buffett]]"
                    # But "temp_part" doesn't have [[ ]] yet.
                    
                    # Problem: if we replace "Berkshire Hathaway" with "[[...]]",
                    # a subsequent search for "Berkshire" might find the text inside the link.
                    # Solution: replace with a unique ID, then swap back at the end.
                    pass
            new_parts.append(temp_part) # placeholder
            
    return "".join(new_parts)

# Let's write a better version of the linker
def link_terms(text, terms_dict, sorted_terms):
    # 1. Find all matches
    matches = []
    for term in sorted_terms:
        # For Chinese, no word boundaries. For English, use them.
        if re.search(r'[a-zA-Z]', term):
            pattern = r'\b' + re.escape(term) + r'\b'
        else:
            pattern = re.escape(term)
            
        for m in re.finditer(pattern, text):
            matches.append({
                'start': m.start(),
                'end': m.end(),
                'term': term,
                'target': terms_dict[term]
            })
            
    # 2. Sort matches by start position, then by length (descending)
    matches.sort(key=lambda x: (x['start'], -(x['end'] - x['start'])))
    
    # 3. Filter overlapping matches
    filtered_matches = []
    last_end = -1
    for m in matches:
        if m['start'] >= last_end:
            # Check if it's already inside a link
            # We need to check the original text for [[ and ]]
            # But we are processing chunks outside of [[ ]] anyway.
            filtered_matches.append(m)
            last_end = m['end']
            
    # 4. Replace
    new_text = ""
    last_idx = 0
    for m in filtered_matches:
        new_text += text[last_idx:m['start']]
        target = m['target']
        term = m['term']
        if target == term:
            new_text += f"[[{target}]]"
        else:
            new_text += f"[[{target}|{term}]]"
        last_idx = m['end']
    new_text += text[last_idx:]
    
    return new_text

def process_file_links(filepath, terms_dict, sorted_terms):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split by existing links and tags to avoid modification inside them
    # Also avoid code blocks
    # We only want to skip the tags themselves, not the content inside :::lang
    pattern = r'(\[\[.*?\]\]|:::lang\s+\w+|:::|`.*?`|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\))'
    parts = re.split(pattern, content, flags=re.DOTALL)
    
    new_parts = []
    for part in parts:
        if re.match(pattern, part, flags=re.DOTALL):
            new_parts.append(part)
        else:
            # Only link the first occurrence of each term per file to keep it clean
            # Wait, the user might want all occurrences? 
            # Existing files seem to link multiple times but not every single time.
            # Let's try "link all non-overlapping" for now.
            new_parts.append(link_terms(part, terms_dict, sorted_terms))
            
    new_content = "".join(new_parts)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Linked terms in {filepath}")

if __name__ == "__main__":
    base_dir = r'd:\dev\study\quartz\content'
    target_dir = r'd:\dev\study\quartz\content\Warren_Buffett'
    
    print("Gathering terms...")
    terms_dict = get_terms(base_dir)
    sorted_terms = sorted(terms_dict.keys(), key=len, reverse=True)
    print(f"Found {len(sorted_terms)} terms/aliases.")
    # print(sorted_terms[:10]) # Debug
    
    print("Processing files...")
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md'):
                # print(f"Checking {file}") # Debug
                process_file_links(os.path.join(root, file), terms_dict, sorted_terms)
    print("Done!")
