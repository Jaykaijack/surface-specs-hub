import json

with open('.scratch/laptop13_options.json', 'r', encoding='utf-8') as f:
    text = f.read()

# try to parse
try:
    data = json.loads(text)
    opt_config = data.get('optionConfig', {})
    lines = []
    for opt_id, opt in opt_config.get('options', {}).items():
        title = opt.get('title', '')
        lines.append(f'Option {opt_id}: title={title}')
        for sel_id, sel in opt.get('selections', {}).items():
            name = sel.get('name', '')
            price = sel.get('prices', {}).get('finalPrice', {}).get('amount')
            lines.append(f'   Sel {sel_id}: name={name}, price={price}')
    with open('.scratch/parsed_options.txt', 'w', encoding='utf-8') as out:
        out.write('\n'.join(lines))
    print('Wrote .scratch/parsed_options.txt')
except Exception as e:
    print('Error parsing json:', e)
