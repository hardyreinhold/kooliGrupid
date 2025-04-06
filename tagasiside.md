# Tagasiside
## Asjad mis olid hästi

### Kommentaarid ja error handling
Tore, et koodis oli ka kommentaare!

Lisaks sellele on hea, et error handling on olemas ja mõnikord on need nähtavad ka kasutajale. 

### Struktuur
Hea, et kasutad komponente ja nende sorteerimine on suhteliselt loogiline!

### State management jms js/ts
Tundub, et Reactiga sul probleeme pole, state oskad kasutada ja async/promised on ka korras. Samuti dynamically rendered content jne.

### Responsiivsus
Leht on küll minimaalne, aga vähemalt ei lähe asjad katki kitsamatel ekraanidel.

## Asjad mida saaks parandada

### Reroutemine pärast logini ja lehe reload
Failis `GoogleLogin.tsx` real 31 on sul tehtud:
```js
window.location.href = data.redirectUrl;
```
Kuid parem oleks kasutada:
```js
router.push(data.redirectUrl);
```
See window.locatin.href väärtuse määramine on õige lahendus kui tegemist on puhta JavaScriptiga kuid kuna kasutusel on Next.js, siis tuleks kasutada Nexti sisseehitatud routerit ja selle funktsioone. See väldib tahtmatut _behaviour_'it ka.

Sama asi on ka `GroupDashBoard.tsx` failis real 42. Sama lugu ka `GroupDashboardOpetaja.tsx` ridadel 75 ja 93.
```js
window.location.reload();
```

### Pisidetailid
#### Console logid
Produktsioonis proovi console logimist vältida :)

#### Google ikoon
Väliselt URLilt pilti fetchimine pole just kõige parem lahendus, produktsioonis võiks kindlasti mingi oma source olla.

#### Headeri kõrgus
Ma ise küll väga tailwindi ei tunne, seega correct me if I'm wrong, aga selle kõrgus on 2 korda määratud: 
```html
<header className="fixed w-full h-[10px] grid grid-cols-[1fr_auto_100px] gap-10 h-15 p-4">
```
Lisaks ei ole hea tava anda elementidele staatilist kõrgust.

#### Root kaustas page.tsx
Kui komponendil/lehel on vaid 1 child, siis ei pea tühjasid sulge lisama (<></>).
