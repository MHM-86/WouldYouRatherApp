import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs";
import { Store } from "@ngrx/store";
import {selectIsAuthenticated} from "../store/app.states";

export const authGuard = (
  route: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) return true;
      else {
        router.navigate(["log-in"], {
          queryParams: { returnUrl: routerState.url },
        });
        return false;
      }
    })
  );
};

