---
title: "Navigation"
category: doc
date: 2014-10-22 20:28:14
tags: []
order: 3
---

## Navigation Order

Simply add an `order` attribute to the front-matter of the page and the navigation links will be sorted accordingly 
(within it's section).

```html
---
title: "My New Page"
category: ref
date: 2013-06-05 12:00:00
order: 1
---
```

_Note: currently there is no way to arbitrarily order pages in Jekyll without the use of plugins. However, since 
deploying Jekyll sites to GitHub Pages is a common practice, we cannot rely on third-party 
plugins [since they are disabled][2]. 
This solution relies on JavaScript to sort the navigation after it has been rendered, so if JavaScript is disabled on 
the browser, the client is out of luck._


## Static Links

You can also add static links to your navigation. Just add the information in the configuration yaml file inside 
`section`.

### Example
```yaml
sections: [
    ['doc', 'Documentation'],
    ['tut', 'Tutorial'],
    ['ref', 'Reference', [ 
        ['External Link 1', 'http://some.link.com'],
        ['External Link 2', 'https://some.other.link']
    ]],
    ['dev', 'Developers'],
    ['post', 'Posts']
]
```
A mix of external links and pages is possible - the pages will be displayed first, the external links afterwards.