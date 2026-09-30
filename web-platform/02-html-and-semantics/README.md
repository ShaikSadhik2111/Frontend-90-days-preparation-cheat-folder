# 02 — HTML and Semantic Documents

**Connection:** HTML is parsed into the DOM and contributes semantics to the accessibility tree.

**Learn:** document structure, headings, links, buttons, forms, labels, inputs, tables, media, metadata, native validation and loading behavior.

**Example**
```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email">
  <button type="submit">Continue</button>
</form>
```

**Production:** prefer native elements before custom widgets. A real button supplies keyboard and focus semantics.

**Pitfalls:** clickable divs, missing labels, incorrect heading hierarchy, links used as buttons, button type omitted inside forms.

**Interview:** Why button over div role=button? href vs click handler? How does HTML affect accessibility? What happens during parsing?

**Challenge:** convert a div-heavy UI to semantic HTML without changing appearance.

**Next:** CSS presentation and layout.