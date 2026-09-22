# JM Visuals

Portfólio institucional da JM Visuals, feito com HTML5, CSS3 e JavaScript puro. Não há dependências de build ou framework.

## Executar localmente

Abra `index.html` diretamente no navegador ou use a extensão **Live Server** no VS Code. Para uma experiência mais próxima de produção, sirva a pasta com qualquer servidor estático local.

## Substituir placeholders

Coloque as imagens reais em `assets/images/` usando estes nomes já preparados:

- `hero.jpg` (versão para celular)
- `hero2.jpg` (versão para desktop)
- `project-01.jpg` até `project-05.jpg`
- `team-joao.jpg` e `team-miguel.jpg`
- `bastidores-01.jpg` até `bastidores-05.jpg`

Os blocos atuais são placeholders visuais identificados. Para usar uma imagem real, altere o CSS do bloco correspondente em `css/style.css` para `background-image: url('../assets/images/nome-do-arquivo.jpg')`, mantendo o fundo atual como fallback.

O hero troca automaticamente entre `hero.jpg` em telas de até 800px e `hero2.jpg` em telas maiores.

### Mapa dos placeholders

- `01`: hero mobile `hero.jpg` / desktop `hero2.jpg`
- `02`: `imagem1.jpg`; `03`: `imagem2.jpg`; `04`: `imagem3.jpg`; `05`: `imagem4.jpg`; `06`: `project-05.jpg`
- `07`: imagem de fundo do showreel; vídeo em `assets/videos/video1.mp4`
- `08` e `09`: fotos da equipe `team-joao.jpg` e `team-miguel.jpg`
- `10` a `12` e `14`: bastidores `bastidores-01.jpg`, `bastidores-02.jpg`, `bastidores-03.jpg` e `bastidores-05.jpg`
- `15` a `18`: posts do Instagram

## Vídeo

O showreel está em `assets/videos/video1.mp4`. O botão do Showreel já abre o player HTML5 e mostra o placeholder enquanto o arquivo não existe.

## Links de contato

Edite os links no `index.html`. Os valores aparecem na navegação, seção Instagram, contato e rodapé:

- Instagram: `https://www.instagram.com/jmvisuals.air?stkn=MTF0ajE1YmlzdjF0OQ%3D%3D&utm_source=qr`
- WhatsApp: `https://wa.me/5527999960198?text=Ol%C3%A1%21+Gostaria+de+conhecer+os+servi%C3%A7os+da+JM+Visuals`
- E-mail: `mailto:contato@jmvisuals.com.br`

## Adicionar projetos

Duplique um `article.project-card` na seção `#portfolio`, atualize título, categoria, descrição e caminho do placeholder. Depois ajuste o grid caso queira uma composição diferente. Para um projeto em vídeo, substitua o conteúdo de `.project-media` por um elemento `<video>` com `controls` e seu arquivo em `assets/videos/`.

## Publicar

O projeto é estático: publique a pasta em GitHub Pages, Netlify, Vercel, Cloudflare Pages ou qualquer hospedagem que sirva HTML. Basta enviar `index.html`, `css/`, `js/` e `assets/` mantendo a estrutura de pastas.
