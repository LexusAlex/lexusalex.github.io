---
layout: default
title: Заметки
has_children: true
permalink: notes
nav_order: 2
---
# Заметки

{% assign notes = site.pages | where: "parent", "Заметки" | sort: "nav_order" | reverse %}
<table class="notes-index">
  <colgroup>
    <col class="col-title">
    <col class="col-date">
  </colgroup>
  <thead>
    <tr><th>Заметка</th><th>Дата</th></tr>
  </thead>
  <tbody>
  {% for n in notes %}
    <tr>
      <td><a href="{{ n.url | relative_url }}">{{ n.title }}</a></td>
      <td>{{ n.date | date: "%Y-%m-%d" }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>
