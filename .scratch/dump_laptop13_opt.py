import re, json

with open(r'C:\Users\12009\.gemini\antigravity\brain\85082706-0988-417b-9f8e-2c577ba9ab1f\.system_generated\steps\3348\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# search for optionConfig
pos = text.find('"optionConfig":')
if pos != -1:
    end = text.find('</script>', pos)
    chunk = text[pos:end].strip()
    # write chunk
    with open('.scratch/laptop13_options.json', 'w', encoding='utf-8') as out:
        out.write('{' + chunk.rstrip(';').rstrip() + '}')
    print('Wrote optionConfig')
else:
    print('Not found')
