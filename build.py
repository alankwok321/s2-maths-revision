import pathlib
d = pathlib.Path(__file__).parent / 'src'
FILES = ['kx.js', 'core.js', 'charts.js', 'geo.js', 'ch12.js', 'ch12p.js', 'ch1.js', 'ch1p.js', 'ch2.js', 'ch2p.js', 'ch3.js', 'ch4.js', 'ch5.js', 'ch11.js', 'ch11p.js', 'final.js']
shell = (d / 'shell.html').read_text()
shell = shell.replace('/*KATEXCSS*/', (d / 'katex-inline.css').read_text()).replace('/*KATEXJS*/', (d / 'katex.min.js').read_text())
out = shell.replace('/*CSS*/', (d / 'style.css').read_text()).replace('/*JS*/', '\n'.join((d / f).read_text() for f in FILES))
(d.parent / 'index.html').write_text(out)
print(len(out))
