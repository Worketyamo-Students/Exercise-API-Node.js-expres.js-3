
# Résumé : [Sujet ou Titre]

## Points clés
- **Point 1** : Description concise du premier point important. [[note-liée-1]]
- **Point 2** : Explication brève d'un autre point. [[note-liée-2]]
- **Point 3** : Résumé d'une idée ou concept. #tag1 #tag2

## Contexte
Un paragraphe ou deux expliquant le contexte du sujet. Cela peut inclure des liens vers d'autres notes, par exemple : [[concept-principal]] ou [[source-origine]].

## Conclusions
- Une synthèse des idées principales.
- Prochaines étapes ou questions ouvertes : [[todo-ou-question]].

## Références
- [[note-de-reference-1]]
- [[note-de-reference-2]]
- Lien externe : [Nom du lien](https://exemple.com)

#résumé #sujet


||||||||||||||||||||
# Résumé : Les Classes en JavaScript

## Points clés
- **Définition** : Les classes en JS sont un modèle (blueprint) pour créer des objets avec des propriétés et des méthodes. [[objet-js]]
- **Syntaxe** : Introduites dans ECMAScript 2015 (ES6), elles offrent une syntaxe plus claire pour la programmation orientée objet (POO). [[ecmascript]]
- **Héritage** : Les classes permettent l’héritage via le mot-clé `extends`. [[héritage-js]]
- **Contexte** : Utilisées pour structurer du code dans des projets complexes (applications web, Node.js, etc.). [[programmation-orientée-objet]]
- **Prototype** : Les classes JS sont basées sur le système de prototypes. [[prototype-js]]

#javascript #classes #poo

---

## Contexte
Les classes en JavaScript sont une abstraction syntaxique pour simplifier la création d’objets et la gestion de l’héritage, tout en s’appuyant sur le système de prototypes sous-jacent. Elles sont largement utilisées dans des projets modernes, notamment dans des frameworks comme [[react]], [[vue-js]], ou des applications backend avec [[node-js]]. Comprendre les classes est essentiel pour structurer du code modulaire et réutilisable.

### Pourquoi utiliser les classes ?
- **Organisation** : Regrouper les données et comportements associés dans une seule entité. [[encapsulation]]
- **Réutilisabilité** : Créer des instances d’objets avec des propriétés/methodes partagées.
- **Héritage** : Réutiliser et étendre le code d’une classe parent. [[héritage-js]]

---

## Concepts clés des classes en JavaScript

### 1. Déclaration d’une classe
Une classe est définie avec le mot-clé `class`. Elle peut inclure un constructeur (`constructor`) et des méthodes.

```javascript
class Person {
  constructor(name, age) {
    this.name = name; // Propriété d’instance
    this.age = age;
  }

  sayHello() {
    return `Bonjour, je m'appelle ${this.name} !`;
  }
}