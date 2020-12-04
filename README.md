# te18-speltut

## Phaser exempel, nu med parcel

Kolla här för hur du anv. en sprite atlas
https://github.com/jensnti/te18-speltut/commit/a42ab1bb0adaaff490358898613ff4caf2c7fdb9

Kolla här för exempel med en tom textur som du kan byta färg på
https://github.com/jensnti/te18-speltut/commit/a9ef31c8b9e019aea3d58c1b1137886e7d560e56

Denna commit flyttar till parcel
https://github.com/jensnti/te18-speltut/commit/5ce50f75ac90dfb578cdf13870a03648c8c9e815

En pause scene
https://github.com/jensnti/te18-speltut/commit/b50d3f6fb850de9c591e67ef94d600e70506a449

Med en multiatlas går det inte för parcel att ladda filerna, anv. static assets.
https://github.com/jensnti/te18-speltut/commit/40e59a949ed8f1d628908bdbd6ad883839fac600

För att skapa en stor värld med kamera som följer spelaren
https://github.com/jensnti/te18-speltut/commit/bf0ec62dc1059b6f4750ea87c07966570e4ebf2a

Säg åt parcel att använda docs mapp istället för dist så att det funkar bra med github pages
https://github.com/jensnti/te18-speltut/commit/d537644d7cacabf919dcd81a6046558edc8aeb7a

Docs mappen innehöll lite annan problematik.
Parcel behöver bygga för --public-url REPONAMNET för att det ska fungera med git pages

https://jensnti.github.io/te18-speltut/ så /PAGESMAPPENHOST blir /te18-speltut

"build": "parcel build src/index.html -d docs/ --public-url /PAGESMAPPENHOST --experimental-scope-hoisting",