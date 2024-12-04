import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';

export const routes: Routes = [
    //{path:'',component:LoginComponent},
    {path:'',component:HomeComponent},
    {path:'admin',component:AdminComponent,canActivate:[authGuard],data:{roles:['admin']}},
    {path:'login',component:LoginComponent},
    {path:'user',component:UserComponent,canActivate:[authGuard],data:{roles:['User']}},
    {path:'forbidden',component:ForbiddenComponent},
    {path:'addNewProduct',component:AddNewProductComponent,canActivate:[authGuard],data:{roles:['admin']},
    resolve:{
        product: ProductResolverService
    }
    },
    {path:'allProducts',component:ShowAllProductComponent,canActivate:[authGuard],data:{roles:['admin']}},
    {path:'productDetails',component:ProductViewDetailsComponent,
        resolve:{
            product: ProductResolverService
        }
    }
];

