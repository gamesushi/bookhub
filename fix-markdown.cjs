const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Updated targetDir for the current project
const targetDir = path.join(__dirname, 'content');

console.log(`Scanning directory: ${targetDir}`);

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('.md')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Standardize newlines to \n first just to be safe
    // content = content.replace(/\r\n/g, '\n'); 
    // Actually keep files as is, regex handles \r?\n

    // 1. Ensure :::lang <any> is surrounded by blank lines
    // Matches zero or more newlines, followed by the tag, followed by zero or more newlines
    content = content.replace(/(\r?\n)*:::lang\s+([a-z0-9-]+)(\r?\n)*/g, '\n\n:::lang $2\n\n');
    
    // 3. Ensure ::: (closer) is surrounded by blank lines
    // Look for ::: NOT followed by 'lang'
    content = content.replace(/(\r?\n)*:::(?!lang[ \t])(\r?\n)*/g, '\n\n:::\n\n');

    // 4. Clean up excessive newlines (more than 2 newlines -> 2 newlines)
    // This turns \n\n\n+ into \n\n
    content = content.replace(/(\n\s*\n)+/g, '\n\n');
    
    // 5. Trim start/end to avoid weird gaps
    content = content.trim();

    if (content !== originalContent) {
      console.log('Fixing formatting in:', filePath);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
console.log('Done processing markdown files.');
