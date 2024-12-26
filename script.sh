ng g c pages/client/menu/components/products --standalone=false;
ng g s pages/client/menu/components/products/products;
ng g c pages/client/menu/components/categories --standalone=false;
ng g s pages/client/menu/components/categories/categories;
ng g c pages/client/menu/components/submenus --standalone=false;
ng g s pages/client/menu/components/submenus/submenus;
git add .;
git commit -m "feat: create children components for the menu module in client";
git push origin master;