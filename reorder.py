import sys

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        text = f.read()

    sec_hero_end_idx = text.find('    <!-- Purchase Info Bento')
    if sec_hero_end_idx == -1:
        print('Failed to find layout markers')
        sys.exit(1)

    hero_to_end = text[:sec_hero_end_idx]
    rest = text[sec_hero_end_idx:]

    bento_start = rest.find('    <!-- Purchase Info Bento')
    essentials_start = rest.find('    <!-- Featured Essentials')
    combos_start = rest.find('    <!-- Combos Section')
    steps_start = rest.find('    <!-- 3 Easy Steps')

    if -1 in (bento_start, essentials_start, combos_start, steps_start):
        print('Failed to find section markers')
        sys.exit(1)

    bento_html = rest[bento_start:essentials_start]
    essentials_html = rest[essentials_start:combos_start]
    combos_html = rest[combos_start:steps_start]
    footer_and_rest = rest[steps_start:]

    # Modify copy in Essentials
    essentials_html = essentials_html.replace('✅ Inhibidor de apetito ultra-concentrado. ✅ Quema grasa localizada. ✅ Aumenta energía diaria.', 'Quema grasa localizada, inhibe el apetito y aumenta tu energía sin efecto rebote.')
    essentials_html = essentials_html.replace('Té natural que contribuye notablemente con la pérdida de peso y quema de grasa corporal.', 'Détox diario que acelera la quema de grasa, elimina líquidos retenidos y mejora la digestión.')
    essentials_html = essentials_html.replace('Frasco de 30 cápsulas para un mes completo de transformación.', 'Resultados visibles desde la primera semana.')

    # Modify copy in Bento
    bento_html = bento_html.replace('Todo lo que necesitas saber antes de empezar tu transformación.', 'Comprar es fácil, rápido y 100% seguro.')
    bento_html = bento_html.replace('<h3>Envío Seguro</h3>\n                    <p>Entregas en 2 a 5 días hábiles a nivel nacional. El costo de envío se coordina por WhatsApp para darte la mejor tarifa.</p>', '<h3>Envío Nacional Inteligente</h3>\n                    <p>Entregas rápidas y discretas. Costo de envío a coordinar con tu asesor vía WhatsApp.</p>')
    bento_html = bento_html.replace('<h3>Acompañamiento VIP</h3>\n                    <p>Asesoría personalizada por WhatsApp para optimizar tus resultados de forma segura.</p>', '<h3>Atención VIP Constante</h3>\n                    <p>Resolveremos tus dudas 24/7 en WhatsApp, garantizando tu proceso.</p>')
    
    # Reassemble
    new_html = hero_to_end + essentials_html + combos_html + bento_html + footer_and_rest

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

    print('Reordered successfully!')
except Exception as e:
    print('Error:', e)
