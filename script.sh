ng g m pages/client/promotions --routing;
ng g m pages/client/staff --routing;
ng g c pages/client/promotions --standalone=false;
ng g c pages/client/staff --standalone=false;
ng g s pages/client/promotions/promotions;
ng g s pages/client/staff/staff;